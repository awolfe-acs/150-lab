import ScrollTrigger from "gsap/ScrollTrigger";

export function initDebug() {
  document.querySelectorAll("section").forEach(function (section) {
    // Initially set border to red
    section.style.border = "1px solid red";
    // Ensure section has relative positioning for absolute child positioning
    if (window.getComputedStyle(section).position === "static") {
      section.style.position = "relative";
    }
    // Create or update the debug dimension element using :scope to only check direct children
    let debugEl = section.querySelector(":scope > .debug-dimensions");
    if (!debugEl) {
      debugEl = document.createElement("span");
      debugEl.className = "debug-dimensions";
      debugEl.style.position = "absolute";
      debugEl.style.bottom = "0";
      debugEl.style.right = "0";
      debugEl.style.backgroundColor = "rgba(0,0,0,0.5)";
      debugEl.style.color = "white";
      debugEl.style.fontSize = "12px";
      debugEl.style.padding = "2px 4px";
      debugEl.style.zIndex = "9999";
      section.appendChild(debugEl);
    }
  });

  function updateDebugDimensions() {
    const triggers = ScrollTrigger.getAll();
    document.querySelectorAll("section").forEach(function (section) {
      const rect = section.getBoundingClientRect();
      const debugEl = section.querySelector(":scope > .debug-dimensions");
      // Check if this section is pinned by any ScrollTrigger
      const isPinned = triggers.some((trigger) => trigger.pin === section);
      // Update border color based on pinned state
      section.style.border = isPinned ? "1px solid green" : "1px solid red";
      if (debugEl) {
        debugEl.textContent =
          `${section.id || "no-id"}: ${Math.round(rect.width)}x${Math.round(rect.height)}` +
          (isPinned ? " pinned" : "");
      }
    });
  }
  updateDebugDimensions();
  window.addEventListener("resize", updateDebugDimensions);
}
