import Globe from "globe.gl";
import { createClient } from "@supabase/supabase-js";

// Supabase configuration
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "https://uttarkvvcusvhawpgvvrc.supabase.co";
const SUPABASE_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV0dGFya3Z2Y3V2aGF3cGd2dnJjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk3NDg0NTgsImV4cCI6MjA2NTMyNDQ1OH0.K-9TAZ4vsmzxS_hq9dNxM_NPOfffNY34cLus18I_edM";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Generate a unique user fingerprint
function generateUserFingerprint() {
  // Combine various browser characteristics to create a unique fingerprint
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  ctx.textBaseline = "top";
  ctx.font = "14px Arial";
  ctx.fillText("Fingerprint", 2, 2);

  const fingerprint = [
    navigator.userAgent,
    navigator.language,
    screen.width + "x" + screen.height,
    new Date().getTimezoneOffset(),
    canvas.toDataURL(),
  ].join("|");

  // Simple hash function
  let hash = 0;
  for (let i = 0; i < fingerprint.length; i++) {
    const char = fingerprint.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }

  return Math.abs(hash).toString(36);
}

// Get or create user ID
function getUserId() {
  let userId = localStorage.getItem("globe_user_id");
  if (!userId) {
    userId = generateUserFingerprint();
    localStorage.setItem("globe_user_id", userId);
  }
  return userId;
}

// Check if user has already pinned
function hasPinned() {
  return localStorage.getItem("has_pinned") === "true";
}

// Set pinned status
function setPinned() {
  localStorage.setItem("has_pinned", "true");
}

// Set a global 'globe' variable
let globe;
const userId = getUserId();

// Land detection function using multiple methods
async function isOnLand(lat, lng) {
  try {
    // Method 1: Use a reverse geocoding service to check if coordinates are on land
    const response = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
    );

    if (response.ok) {
      const data = await response.json();

      // Check if we have country/locality information (indicates land)
      if (data.countryCode && data.countryCode !== "") {
        return true;
      }

      // Check if the location type indicates water
      if (
        data.locality &&
        (data.locality.toLowerCase().includes("ocean") ||
          data.locality.toLowerCase().includes("sea") ||
          data.locality.toLowerCase().includes("lake") ||
          data.locality.toLowerCase().includes("water"))
      ) {
        return false;
      }

      // If we have a country code, it's likely land
      return data.countryCode && data.countryCode.length > 0;
    }
  } catch (error) {
    console.warn("Reverse geocoding failed, using fallback method:", error);
  }

  // Method 2: Fallback - Basic geographic rules for major water bodies
  return isOnLandFallback(lat, lng);
}

// Fallback method using basic geographic boundaries
function isOnLandFallback(lat, lng) {
  // Major ocean boundaries (simplified)
  const majorWaterBodies = [
    // Pacific Ocean (large areas)
    { minLat: -60, maxLat: 60, minLng: -180, maxLng: -80 },
    { minLat: -60, maxLat: 60, minLng: 120, maxLng: 180 },

    // Atlantic Ocean (simplified)
    { minLat: -60, maxLat: 70, minLng: -70, maxLng: 20 },

    // Indian Ocean
    { minLat: -60, maxLat: 30, minLng: 20, maxLng: 120 },

    // Arctic Ocean
    { minLat: 70, maxLat: 90, minLng: -180, maxLng: 180 },

    // Antarctic Ocean
    { minLat: -90, maxLat: -60, minLng: -180, maxLng: 180 },

    // Major lakes (Great Lakes, Caspian Sea, etc.)
    { minLat: 41, maxLat: 49, minLng: -92, maxLng: -76 }, // Great Lakes
    { minLat: 36, maxLat: 47, minLng: 46, maxLng: 55 }, // Caspian Sea
    { minLat: 51, maxLat: 56, minLng: 103, maxLng: 109 }, // Lake Baikal
  ];

  // Check if coordinates fall within major water bodies
  for (const water of majorWaterBodies) {
    if (lat >= water.minLat && lat <= water.maxLat && lng >= water.minLng && lng <= water.maxLng) {
      // Additional checks for areas that might have land within these bounds
      if (isKnownLandException(lat, lng)) {
        continue;
      }

      return false;
    }
  }

  return true;
}

// Known land areas within major water body bounds
function isKnownLandException(lat, lng) {
  // Major landmasses that might fall within ocean bounds
  const landExceptions = [
    // Japan
    { minLat: 30, maxLat: 46, minLng: 129, maxLng: 146 },
    // Philippines
    { minLat: 5, maxLat: 19, minLng: 116, maxLng: 127 },
    // Indonesia
    { minLat: -11, maxLat: 6, minLng: 95, maxLng: 141 },
    // New Zealand
    { minLat: -47, maxLat: -34, minLng: 166, maxLng: 179 },
    // Hawaii
    { minLat: 18, maxLat: 22, minLng: -161, maxLng: -154 },
    // Caribbean islands
    { minLat: 10, maxLat: 27, minLng: -85, maxLng: -59 },
    // Mediterranean countries
    { minLat: 30, maxLat: 47, minLng: -10, maxLng: 37 },
    // British Isles
    { minLat: 49, maxLat: 61, minLng: -11, maxLng: 2 },
    // Scandinavia
    { minLat: 55, maxLat: 72, minLng: 4, maxLng: 32 },
  ];

  for (const land of landExceptions) {
    if (lat >= land.minLat && lat <= land.maxLat && lng >= land.minLng && lng <= land.maxLng) {
      return true;
    }
  }

  return false;
}

// Enhanced pin animation with blue-purple-teal color cycling
function animatePins() {
  if (!globe) return;

  const currentTime = Date.now() * 0.001; // Convert to seconds

  // Create pulsing ring effect through color and size animation
  globe.pointColor((point) => {
    const phaseOffset = (point.lat + point.lng) * 0.01;
    const timePhase = currentTime + phaseOffset;

    // Create pulsing ring effect through color intensity
    const ringPhase = (timePhase * 3.0) % (Math.PI * 2);
    const ringIntensity = Math.sin(ringPhase) * 0.5 + 0.5;

    // Color cycling between blue, purple, and teal
    const colorPhase = (timePhase * 0.5) % (Math.PI * 2);
    const blueWeight = (Math.sin(colorPhase) + 1) / 2;
    const purpleWeight = (Math.sin(colorPhase + (Math.PI * 2) / 3) + 1) / 2;
    const tealWeight = (Math.sin(colorPhase + (Math.PI * 4) / 3) + 1) / 2;

    // Normalize weights
    const totalWeight = blueWeight + purpleWeight + tealWeight;
    const normalizedBlue = blueWeight / totalWeight;
    const normalizedPurple = purpleWeight / totalWeight;
    const normalizedTeal = tealWeight / totalWeight;

    // Apply ring intensity to color brightness - keep colors brighter
    const intensity = 0.6 + ringIntensity * 0.4; // Higher base intensity (0.6) + pulsing

    // Brighter base colors for better visibility
    const r = Math.round((64 * normalizedBlue + 153 * normalizedPurple + 32 * normalizedTeal) * intensity);
    const g = Math.round((204 * normalizedBlue + 51 * normalizedPurple + 255 * normalizedTeal) * intensity);
    const b = Math.round((255 * normalizedBlue + 255 * normalizedPurple + 204 * normalizedTeal) * intensity);

    return `rgb(${r}, ${g}, ${b})`;
  });

  // Create consistent size with subtle pulsing effect
  globe.pointRadius((point) => {
    const phaseOffset = (point.lat + point.lng) * 0.01;
    const timePhase = currentTime + phaseOffset;

    // Much more subtle pulsing to maintain consistent appearance
    const subtlePulse = Math.sin(timePhase * 2.0) * 0.08 + 1.0; // ±8% variation for consistency

    // Ensure consistent base size regardless of globe position/angle
    const baseSize = 0.4;

    return baseSize * subtlePulse;
  });

  // Static altitude - no floating animation to maintain consistent height
  globe.pointAltitude(0.06);

  requestAnimationFrame(animatePins);
}

// Add CSS glow effects to enhance pin visuals
function addGlowEffects() {
  // Create a style element for custom CSS
  const style = document.createElement("style");
  style.textContent = `
    /* Enhanced globe container with bright border-like glow effects */
    #interactive-globe canvas {
      filter: drop-shadow(0 0 8px rgba(0, 153, 255, 1.0))
              drop-shadow(0 0 16px rgba(102, 0, 204, 0.9))
              drop-shadow(0 0 6px rgba(0, 204, 170, 1.0))
              drop-shadow(0 0 24px rgba(0, 153, 255, 0.8))
              drop-shadow(0 0 40px rgba(102, 0, 204, 0.6))
              drop-shadow(0 0 60px rgba(0, 204, 170, 0.5))
              drop-shadow(0 0 80px rgba(0, 153, 255, 0.4))
              drop-shadow(0 0 100px rgba(102, 0, 204, 0.3));
      animation: canvasPulse 3s ease-in-out infinite;
    }
    
    @keyframes canvasPulse {
      0%, 100% {
        filter: drop-shadow(0 0 8px rgba(0, 153, 255, 1.0))
                drop-shadow(0 0 16px rgba(102, 0, 204, 0.9))
                drop-shadow(0 0 6px rgba(0, 204, 170, 1.0))
                drop-shadow(0 0 24px rgba(0, 153, 255, 0.8))
                drop-shadow(0 0 40px rgba(102, 0, 204, 0.6))
                drop-shadow(0 0 60px rgba(0, 204, 170, 0.5))
                drop-shadow(0 0 80px rgba(0, 153, 255, 0.4))
                drop-shadow(0 0 100px rgba(102, 0, 204, 0.3));
      }
      50% {
        filter: drop-shadow(0 0 12px rgba(0, 153, 255, 1.0))
                drop-shadow(0 0 24px rgba(102, 0, 204, 1.0))
                drop-shadow(0 0 10px rgba(0, 204, 170, 1.0))
                drop-shadow(0 0 36px rgba(0, 153, 255, 0.9))
                drop-shadow(0 0 60px rgba(102, 0, 204, 0.8))
                drop-shadow(0 0 80px rgba(0, 204, 170, 0.7))
                drop-shadow(0 0 120px rgba(0, 153, 255, 0.6))
                drop-shadow(0 0 150px rgba(102, 0, 204, 0.5));
      }
    }
    
    /* Pulsing ring background layers */
    #interactive-globe::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 160%;
      height: 160%;
      background: radial-gradient(
        circle,
        rgba(0, 153, 255, 0.2) 0%,
        rgba(102, 0, 204, 0.15) 25%,
        rgba(0, 204, 170, 0.12) 50%,
        rgba(0, 153, 255, 0.08) 75%,
        transparent 100%
      );
      transform: translate(-50%, -50%);
      animation: ringPulse 2.5s ease-in-out infinite;
      pointer-events: none;
      z-index: -1;
    }
    
    /* Secondary pulsing ring layer */
    #interactive-globe::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 120%;
      height: 120%;
      background: radial-gradient(
        circle,
        rgba(0, 153, 255, 0.3) 0%,
        rgba(102, 0, 204, 0.25) 30%,
        rgba(0, 204, 170, 0.2) 60%,
        transparent 100%
      );
      transform: translate(-50%, -50%);
      animation: ringPulse 4s ease-in-out infinite reverse;
      pointer-events: none;
      z-index: -1;
    }
    
    @keyframes ringPulse {
      0%, 100% {
        opacity: 0.3;
        transform: translate(-50%, -50%) scale(0.8);
      }
      50% {
        opacity: 0.9;
        transform: translate(-50%, -50%) scale(1.2);
      }
    }
    
    /* Enhanced atmosphere with ring-like gradients */
    #interactive-globe {
      background: radial-gradient(
        ellipse at center,
        rgba(0, 30, 60, 0.9) 0%,
        rgba(0, 20, 40, 0.95) 40%,
        rgba(0, 10, 20, 0.98) 70%,
        rgba(0, 0, 0, 1) 100%
      );
      position: relative;
      overflow: hidden;
    }
  `;

  document.head.appendChild(style);
}

function initGlobe() {
  const container = document.getElementById("interactive-globe");

  if (!container) {
    console.error("Fatal: Globe container #interactive-globe not found in the DOM.");
    return;
  }

  // Force a default style to ensure visibility and size
  container.style.display = "block";
  container.style.position = "relative";
  container.style.width = "100vw";
  container.style.height = "100svh";

  // Check for container dimensions
  if (container.clientWidth === 0 || container.clientHeight === 0) {
    console.error("Globe container has no dimensions. Aborting.");
    return;
  }

  console.log("Container dimensions:", container.clientWidth, "x", container.clientHeight);

  try {
    // Check if Globe constructor is available
    if (typeof Globe !== "function") {
      throw new Error(`Globe is not a function. Type: ${typeof Globe}, Value: ${Globe}`);
    }

    // Initialize Globe with container using the correct syntax
    globe = new Globe(container)
      .globeImageUrl("//unpkg.com/three-globe/example/img/earth-blue-marble.jpg")
      .bumpImageUrl("//unpkg.com/three-globe/example/img/earth-topology.png")
      .backgroundImageUrl("//unpkg.com/three-globe/example/img/night-sky.png")
      .width(container.clientWidth)
      .height(container.clientHeight)
      .pointColor((point) => {
        // Dynamic color that will be animated
        return "#0099ff";
      })
      .pointRadius(0.4)
      .pointResolution(64)
      .pointsMerge(false)
      .pointAltitude(0.06)
      .atmosphereColor("#4a90e2")
      .atmosphereAltitude(0.15)
      .enablePointerInteraction(true)
      // Enhanced pin visuals with glow effect
      .pointsTransitionDuration(2000)
      .onPointHover((point, prevPoint) => {
        // Change cursor on hover
        container.style.cursor = point ? "pointer" : "grab";
      });

    console.log("Globe initialized successfully.");

    // --- Setup was successful, add interactions and data ---

    globe.onGlobeClick(async (coords) => {
      if (hasPinned()) {
        createSnackbar("You have already placed a pin on the world!", "warning");
        return;
      }

      const { lat, lng } = coords;

      // Show loading message while checking land
      createSnackbar("Checking location...", "info", 2000);

      // Check if the clicked location is on land
      const onLand = await isOnLand(lat, lng);

      if (!onLand) {
        createSnackbar("Your pin can only be placed on land!", "warning", 5000);
        return;
      }

      submitPin(userId, lat, lng);
    });

    window.addEventListener("resize", () => {
      if (globe) {
        globe.width(container.clientWidth);
        globe.height(container.clientHeight);
      }
    });

    fetchPins();
    setupRealTime();
    addClearButton();
    addInstructions();

    // Add CSS glow effects to the globe container
    addGlowEffects();

    // Start pin animations
    animatePins();
  } catch (e) {
    console.error("A critical error occurred during Globe GL initialization:", e);
  }
}

// Submit Pin to Backend (Supabase)
async function submitPin(userId, lat, lng) {
  try {
    // Ensure user hasn't pinned already (double-check on server)
    const { data: existing, error: checkError } = await supabase
      .from("pins")
      .select("*")
      .eq("user_fingerprint", userId);

    if (checkError) {
      console.error("Error checking existing pins:", checkError);
      if (checkError.code === "42P01") {
        createSnackbar("Database not set up. Please contact the administrator.", "error");
        return;
      }
      createSnackbar("Failed to check existing pins. Please try again.", "error");
      return;
    }

    if (existing && existing.length > 0) {
      createSnackbar("You have already placed a pin!", "warning");
      setPinned(); // Update local storage
      return;
    }

    // Insert new pin
    const { error } = await supabase.from("pins").insert({
      user_fingerprint: userId,
      lat: parseFloat(lat.toFixed(6)),
      lng: parseFloat(lng.toFixed(6)),
      created_at: new Date().toISOString(),
    });

    if (error) {
      console.error("Error submitting pin:", error);
      if (error.code === "42P01") {
        createSnackbar("Database not set up. Please contact the administrator.", "error");
        return;
      }
      createSnackbar("Failed to place pin. Please try again.", "error");
      return;
    }

    // Mark user as having pinned
    setPinned();

    // Update UI
    updateClearButton();

    // Remove instructions if showing
    const instructions = document.getElementById("globe-instructions");
    if (instructions) {
      instructions.remove();
    }

    // Remove setup message if showing
    const setupMessage = document.getElementById("setup-message");
    if (setupMessage) {
      setupMessage.remove();
    }

    // Add the pin immediately to the globe for instant feedback
    const newPin = {
      lat: parseFloat(lat.toFixed(6)),
      lng: parseFloat(lng.toFixed(6)),
      id: Date.now(), // Temporary ID until real-time update provides the actual ID
      created_at: new Date().toISOString(),
    };

    // Get current pins and add the new one
    const currentPins = globe.pointsData() || [];
    const updatedPins = [...currentPins, newPin];
    globe.pointsData(updatedPins);

    // Update pin count immediately
    updatePinCount(updatedPins.length);

    // Show success message
    createSnackbar("Pin placed successfully!", "success");

    // Refresh pins will happen automatically via real-time subscription to get the actual database ID
  } catch (error) {
    console.error("Error submitting pin:", error);
    createSnackbar("Failed to place pin. Please try again.", "error");
  }
}

// Load & Render Pins
async function fetchPins() {
  try {
    const { data, error } = await supabase.from("pins").select("*");

    if (error) {
      console.error("Error fetching pins:", error);

      // If table doesn't exist, show a helpful message
      if (error.code === "42P01") {
        console.warn("Database table 'pins' doesn't exist. Please run the setup SQL first.");
        showDatabaseSetupMessage();
        return;
      }
      return;
    }

    if (data && globe) {
      // Transform data for globe.gl format
      const pointsData = data.map((pin) => ({
        lat: pin.lat,
        lng: pin.lng,
        id: pin.id,
        created_at: pin.created_at,
      }));

      globe.pointsData(pointsData);

      // Update UI with pin count
      updatePinCount(data.length);
    }
  } catch (error) {
    console.error("Error fetching pins:", error);
  }
}

// Update pin count display
function updatePinCount(count) {
  let countElement = document.getElementById("pin-count");
  if (!countElement) {
    countElement = document.createElement("div");
    countElement.id = "pin-count";
    countElement.style.cssText = `
      position: absolute;
      top: 20px;
      left: 20px;
      background: rgba(0, 0, 0, 0.7);
      color: white;
      padding: 10px 15px;
      border-radius: 5px;
      font-family: 'Poppins', sans-serif;
      font-size: 14px;
      z-index: 1000;
    `;
    document.getElementById("interactive-globe").appendChild(countElement);
  }

  countElement.textContent = `${count} pins placed in our world of chemistry`;
}

// Show database setup message
function showDatabaseSetupMessage() {
  let setupMessage = document.getElementById("setup-message");
  if (!setupMessage) {
    setupMessage = document.createElement("div");
    setupMessage.id = "setup-message";
    setupMessage.style.cssText = `
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(255, 107, 107, 0.9);
      color: white;
      padding: 20px;
      border-radius: 10px;
      font-family: 'Poppins', sans-serif;
      font-size: 16px;
      text-align: center;
      z-index: 1000;
      max-width: 400px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    `;
    setupMessage.innerHTML = `
      <h3 style="margin: 0 0 10px 0;">Database Setup Required</h3>
      <p style="margin: 0 0 15px 0;">The pins table doesn't exist in your Supabase database.</p>
      <p style="margin: 0; font-size: 14px;">Please run the SQL commands in <code>supabase-setup.sql</code> in your Supabase dashboard.</p>
    `;
    document.getElementById("interactive-globe").appendChild(setupMessage);
  }
}

// Clear user's pin
async function clearPin() {
  try {
    // First, get the user's pin data so we can remove it from the display immediately
    const { data: userPin } = await supabase.from("pins").select("*").eq("user_fingerprint", userId).single();

    const { error } = await supabase.from("pins").delete().eq("user_fingerprint", userId);

    if (error) {
      console.error("Error clearing pin:", error);
      createSnackbar("Failed to clear pin. Please try again.", "error");
      return;
    }

    // Clear local storage
    localStorage.removeItem("has_pinned");

    // Remove the user's pin immediately from the globe if we found it
    if (userPin && globe) {
      const currentPins = globe.pointsData() || [];
      const updatedPins = currentPins.filter((pin) => {
        // Remove the pin that matches the user's coordinates
        return !(Math.abs(pin.lat - userPin.lat) < 0.000001 && Math.abs(pin.lng - userPin.lng) < 0.000001);
      });

      globe.pointsData(updatedPins);
      updatePinCount(updatedPins.length);
    }

    // Show success message
    createSnackbar("Pin cleared successfully! You can now place a new pin.", "success");

    // Update UI
    updateClearButton();
    addInstructions();

    // Real-time subscription will sync any remaining state differences
  } catch (error) {
    console.error("Error clearing pin:", error);
    createSnackbar("Failed to clear pin. Please try again.", "error");
  }
}

// Add clear pin button
function addClearButton() {
  let clearButton = document.getElementById("clear-pin-button");
  if (!clearButton) {
    clearButton = document.createElement("button");
    clearButton.id = "clear-pin-button";
    clearButton.textContent = "Clear Pin";
    clearButton.style.cssText = `
      position: absolute;
      top: 20px;
      right: 20px;
      background: #ff6b6b;
      color: white;
      border: none;
      padding: 10px 15px;
      border-radius: 5px;
      font-family: 'Poppins', sans-serif;
      font-size: 14px;
      cursor: pointer;
      z-index: 1000;
      transition: background-color 0.3s ease;
    `;

    clearButton.addEventListener("click", clearPin);
    clearButton.addEventListener("mouseenter", () => {
      clearButton.style.backgroundColor = "#ff5252";
    });
    clearButton.addEventListener("mouseleave", () => {
      clearButton.style.backgroundColor = "#ff6b6b";
    });

    document.getElementById("interactive-globe").appendChild(clearButton);
  }

  updateClearButton();
}

// Update clear button visibility
function updateClearButton() {
  const clearButton = document.getElementById("clear-pin-button");
  if (clearButton) {
    clearButton.style.display = hasPinned() ? "block" : "none";
  }
}

// Add instructions overlay
function addInstructions() {
  if (hasPinned()) return;

  // Remove existing instructions if any
  const existingInstructions = document.getElementById("globe-instructions");
  if (existingInstructions) {
    existingInstructions.remove();
  }

  const instructions = document.createElement("div");
  instructions.id = "globe-instructions";
  instructions.style.cssText = `
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 15px 20px;
    border-radius: 10px;
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
    text-align: center;
    z-index: 1000;
    max-width: 90%;
    box-sizing: border-box;
  `;
  instructions.innerHTML = `
    <div>Where are you in the world of chemistry?</div>
  `;

  document.getElementById("interactive-globe").appendChild(instructions);

  // Remove instructions after 10 seconds
  setTimeout(() => {
    if (instructions.parentNode) {
      instructions.remove();
    }
  }, 10000);
}

// Track real-time subscription to prevent duplicates
let realtimeChannel = null;

// Snackbar notification system
function createSnackbar(message, type = "info", duration = 4000) {
  // Remove existing snackbar if any
  const existingSnackbar = document.getElementById("snackbar");
  if (existingSnackbar) {
    existingSnackbar.remove();
  }

  // Create snackbar element
  const snackbar = document.createElement("div");
  snackbar.id = "snackbar";
  snackbar.textContent = message;

  // Set styles based on type
  const baseStyles = `
    position: fixed;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    padding: 16px 24px;
    border-radius: 8px;
    font-family: 'Poppins', sans-serif;
    font-size: 14px;
    font-weight: 500;
    color: white;
    z-index: 10000;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    opacity: 0;
    transition: opacity 0.3s ease, transform 0.3s ease;
    max-width: 90%;
    text-align: center;
    backdrop-filter: blur(10px);
  `;

  const typeStyles = {
    success: "background: rgba(76, 175, 80, 0.9);",
    error: "background: rgba(244, 67, 54, 0.9);",
    warning: "background: rgba(255, 152, 0, 0.9);",
    info: "background: rgba(33, 150, 243, 0.9);",
  };

  snackbar.style.cssText = baseStyles + (typeStyles[type] || typeStyles.info);

  // Add to DOM
  document.body.appendChild(snackbar);

  // Animate in
  setTimeout(() => {
    snackbar.style.opacity = "1";
    snackbar.style.transform = "translateX(-50%) translateY(0)";
  }, 100);

  // Auto remove after duration
  setTimeout(() => {
    snackbar.style.opacity = "0";
    snackbar.style.transform = "translateX(-50%) translateY(20px)";
    setTimeout(() => {
      if (snackbar.parentNode) {
        snackbar.remove();
      }
    }, 300);
  }, duration);

  return snackbar;
}

// Enable Real-Time updates
function setupRealTime() {
  // Don't create multiple subscriptions
  if (realtimeChannel) {
    console.log("Real-time already setup, skipping...");
    return;
  }

  realtimeChannel = supabase
    .channel("public:pins")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "pins",
      },
      (payload) => {
        console.log("Real-time update:", payload);
        fetchPins(); // Refresh pins when changes occur
      }
    )
    .subscribe();
}

// Track if globe has been initialized to prevent double initialization
let globeInitialized = false;

// Initialize when the window has fully loaded and is ready to paint
window.addEventListener("load", () => {
  console.log("Window loaded, checking for globe container...");
  const globeContainer = document.getElementById("interactive-globe");
  if (globeContainer && !globeInitialized) {
    console.log("Globe container found, initializing globe...");
    globeInitialized = true;
    // Use a short timeout to ensure other scripts have finished manipulating the DOM
    setTimeout(initGlobe, 100);
  } else if (globeInitialized) {
    console.log("Globe already initialized, skipping...");
  } else {
    console.error("Globe container not found on window load");
  }
});

// Export functions for potential external use
window.globeApp = {
  fetchPins,
  hasPinned,
  getUserId,
  clearPin,
};
