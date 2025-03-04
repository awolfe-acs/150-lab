import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import SplitType from "split-type";

// Register the plugins
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(MorphSVGPlugin);

export function animateCountdownChange(id, value) {
  const el = document.querySelector(`#${id} .number`);
  const formatted = id === "days" ? (value >= 100 ? String(value) : ("0" + value).slice(-2)) : ("0" + value).slice(-2);

  if (el.dataset.value === formatted) return;
  el.dataset.value = formatted;

  const currentChars = el.querySelectorAll(".char");
  gsap.to(currentChars, {
    y: -12,
    opacity: 0,
    duration: 0.4,
    stagger: 0.05,
    onComplete: () => {
      el.innerHTML = formatted
        .split("")
        .map((char) => `<span class="char">${char}</span>`)
        .join("");
      const newChars = el.querySelectorAll(".char");
      gsap.from(newChars, {
        y: 20,
        z: -500,
        opacity: 0,
        duration: 0.42,
        stagger: 0.05,
        ease: "power1.out",
      });
    },
  });
}

export function initHeroAnimation() {
  // Split the hero heading text into characters
  const heroHeading = document.querySelector('#hero-area h1');
  const heroNumber = document.querySelector('#hero-number');
  const videoElement = document.querySelector("#video video");
  
  if (!heroHeading || !heroNumber) return;
  
  // Stop Lenis scrolling until animations complete
  if (window.lenis) {
    window.lenis.stop();
  }
  
  // Reset any existing animations and scroll triggers
  ScrollTrigger.getAll().forEach(trigger => {
    if (trigger.vars.trigger === "#hero-area" || 
        trigger.vars.trigger === "#hero-travel-area") {
      trigger.kill();
    }
  });
  
  // Split the hero number into characters for individual digit handling
  const initialNumber = heroNumber.innerText || '2026';
  heroNumber.innerHTML = ''; // Clear the content
  
  // Create individual spans for each digit - simplified
  initialNumber.split('').forEach(digit => {
    const digitSpan = document.createElement('span');
    digitSpan.className = 'digit';
    digitSpan.textContent = digit;
    digitSpan.setAttribute('data-digit', digit);
    heroNumber.appendChild(digitSpan);
  });
  
  // Hide the number initially
  gsap.set(heroNumber, { 
    opacity: 0,
    autoAlpha: 0 // Uses visibility and opacity together
  });
  
  // Split the text into words first, then characters to prevent mid-word breaks
  const splitText = new SplitType(heroHeading, { 
    types: 'words,chars',
    absolute: false
  });
  
  // Hide all characters initially and add blur effect
  gsap.set(splitText.chars, { 
    opacity: 0,
    z: 150, // Start with a positive z value to appear larger (coming toward viewer)
    scale: 1.2, // Slightly larger scale to enhance the effect
    transformPerspective: 1000, // Increase perspective for more dramatic 3D effect
    transformOrigin: "center center",
    filter: 'blur(16px)' // Add initial blur effect
  });
  
  // Create a timeline for the animation
  const tl = gsap.timeline({ delay: 0.5 });
  
  // Randomize the characters for reveal
  const shuffledChars = [...splitText.chars];
  for (let i = shuffledChars.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledChars[i], shuffledChars[j]] = [shuffledChars[j], shuffledChars[i]];
  }
  
  // Animate each character with a random fade-in and unblur effect
  tl.to(shuffledChars, {
    opacity: 1,
    z: 0, // Move to final position on Z axis (regular size)
    scale: 1, // Return to normal scale
    filter: 'blur(0px)', // Clear the blur effect
    duration: 1.25, // Slightly longer duration for more visible effect
    stagger: 0.03,
    ease: "power2.out", // Smoother easing
    onComplete: () => {
      // Trigger particle fade-in earlier - after text animation completes
      const earlyFadeEvent = new CustomEvent('particleFadeStart');
      document.dispatchEvent(earlyFadeEvent);
    }
  });
  
  // After all characters are revealed, show the number
  tl.to(heroNumber, {
    opacity: 1,
    autoAlpha: 1, // Uses visibility and opacity together
    duration: 0.5,
    ease: "power1.inOut"
  });
  
  // Modified digit reveal animation - slower fade-in with z-axis movement
  const digits = heroNumber.querySelectorAll('.digit');
  tl.fromTo(digits, 
    { 
      opacity: 0,
      y: 10,
      z: -120, // Start further back in z-space
      transformPerspective: 1000, // Add perspective for 3D effect
      transformOrigin: "center center"
    },
    {
      opacity: 1,
      y: 0,
      z: 0,
      duration: 2.5, // Much longer duration for slower fade-in
      stagger: 0.1, // Slightly longer stagger
      ease: "power3.out",
      onComplete: () => {
        // Re-enable Lenis scrolling after animation completes
        if (window.lenis) {
          window.lenis.start();
        }
        
        // Dispatch custom event to signal hero animation completion
        const heroAnimationCompleteEvent = new CustomEvent('heroAnimationComplete');
        document.dispatchEvent(heroAnimationCompleteEvent);
      }
    }, 
    "-=0.6" // Slight overlap
  );
  
  // Initialize the hero animation
  
  // Create the hero number animation
  if (heroNumber) {
    // Add fade-in animation for the hero number
    gsap.fromTo(heroNumber, 
      { opacity: 0, scale: 0.8 },
      { 
        opacity: 1, 
        scale: 1,
        duration: 1.2,
        ease: "power2.out",
        delay: 0.5
      }
    );
    
    // Add transform animation for the hero number (size and position)
    // Simplified for better performance - only essential properties
    gsap.to(heroNumber, {
      scale: 0.7, // Reduce size to 70% of original
      y: () => window.innerWidth * -0.10, // Move up by 8% of viewport width (equivalent to 8vw at 50% scale)
      ease: "none",
      scrollTrigger: {
        trigger: "#hero-travel-area",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5, // Add a small amount of smoothing
        markers: false
      }
    });
    
    // Add color transition animation for the digits - from yellow to teal
    gsap.to(digits, {
      color: "rgba(205, 252, 255, 0.9)", // Teal color with full opacity
      ease: "none",
      scrollTrigger: {
        trigger: "#hero-travel-area",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        markers: false
      }
    });
  }
  
  // Animate video scale from small to full size while scrolling
  if (videoElement) {
    // Set initial scale
    gsap.set(videoElement, {
      scale: 0.4,
      opacity: 0,
      transformOrigin: "center center"
    });
    
    // Animate scale and opacity as user scrolls
    gsap.to(videoElement, {
      scale: 1.0,
      opacity: 1,
      ease: "power1.out",
      scrollTrigger: {
        trigger: "#hero-travel-area",
        start: "top top", // Start at the top of hero-travel-area
        end: "bottom bottom", // End when bottom of hero-travel-area reaches bottom of viewport
        scrub: true,
        markers: false,
        onUpdate: (self) => {
          // Add/remove class based on progress
          if (self.progress > 0.8) {
            videoElement.classList.add('scale-active');
          } else {
            videoElement.classList.remove('scale-active');
          }
        }
      }
    });
  }
}

export function initAnimations() {
  // Initialize the hero animation
  initHeroAnimation();
  
  // Initialize video scale animation
  animateVideoScale();
  
  // Add menu button click handler
  const menuButton = document.querySelector('button.menu');
  if (menuButton) {
    menuButton.addEventListener('click', () => {
      const nav = document.querySelector('nav');
      const header = document.querySelector('header');
      
      if (nav) nav.classList.toggle('active');
      if (header) header.classList.toggle('nav-active');
    });
  }
  
  // Add close menu button click handler
  const closeMenuButton = document.querySelector('button.close-menu');
  if (closeMenuButton) {
    closeMenuButton.addEventListener('click', () => {
      const nav = document.querySelector('nav');
      const header = document.querySelector('header');
      
      if (nav) nav.classList.remove('active');
      if (header) header.classList.remove('nav-active');
    });
  }
  
  var fast = 0.18;
  var mediumFast = 0.24;
  var medium = 0.44;
  var mediumSlow = 0.68;
  var slow = 0.84;

  // Add scroll-triggered fade-out for hero heading characters
  const heroHeading = document.querySelector('#hero-area h1');
  if (heroHeading) {
    // Make sure we have the SplitType characters to animate
    let splitTextChars = heroHeading.querySelectorAll('.char');
    
    // If characters don't exist yet (SplitType not initialized), create them
    if (!splitTextChars.length) {
      const splitText = new SplitType(heroHeading, { 
        types: 'words,chars',
        absolute: false
      });
      splitTextChars = splitText.chars;
    }
    
    // Create a timeline for the scroll-triggered fade-out
    const fadeOutTl = gsap.timeline({
      scrollTrigger: {
        trigger: "#hero-travel-area",
        start: "top center", // Start when the top of hero-travel-area reaches the center of viewport
        end: "top top", // End when the top of hero-travel-area reaches the top of viewport
        scrub: true, // Makes the animation scrubbable with scroll
        markers: false // Set to true for debugging
      }
    });
    
    // Randomize the characters for fade-out (different order than fade-in)
    const shuffledChars = [...splitTextChars];
    for (let i = shuffledChars.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledChars[i], shuffledChars[j]] = [shuffledChars[j], shuffledChars[i]];
    }
    
    // Animate each character to fade out and move back in Z space
    fadeOutTl.to(shuffledChars, {
      opacity: 0,
      z: -50,
      stagger: 0.02,
      ease: "power1.in"
    }, 0);
    
    // We're no longer fading out the hero number - it stays visible
  }

  // Add scroll-triggered countdown for hero number
  const heroNumber = document.querySelector('#hero-number');
  if (heroNumber) {
    // Create an object to hold the year value
    const heroYearObj = { year: 2026 };
    
    // Animation for the hero year counter
    gsap.to(heroYearObj, {
      year: 1876,
      ease: "none",
      scrollTrigger: {
        trigger: "#hero-travel-area",
        start: "top top", // Start when the top of hero-travel-area reaches the top of viewport (after heading fade-out completes)
        end: "bottom bottom", // End when the bottom of hero-travel-area reaches the bottom of viewport
        scrub: true,
        markers: false // Set to true for debugging
      },
      onUpdate: function () {
        const yearValue = Math.round(heroYearObj.year).toString();
        
        // Update each digit
        const currentDigits = heroNumber.querySelectorAll('.digit');
        const newDigits = yearValue.split('');
        
        // If the number of digits has changed, recreate all digits
        if (currentDigits.length !== newDigits.length) {
          heroNumber.innerHTML = '';
          newDigits.forEach(digit => {
            const digitSpan = document.createElement('span');
            digitSpan.className = 'digit';
            digitSpan.textContent = digit;
            digitSpan.setAttribute('data-digit', digit);
            heroNumber.appendChild(digitSpan);
          });
        } else {
          // Update existing digits - ultra simplified approach for better performance
          currentDigits.forEach((digitSpan, index) => {
            if (digitSpan.textContent !== newDigits[index]) {
              // Direct update without animation for maximum performance
              digitSpan.textContent = newDigits[index];
              digitSpan.setAttribute('data-digit', newDigits[index]);
              
              // Optional: Add a very minimal opacity change for visual feedback
              // No scale, no z-axis, just a simple opacity change
              gsap.fromTo(digitSpan, 
                { opacity: 0.7 },
                { opacity: 1, duration: 0.2, ease: "power1.out" }
              );
            }
          });
        }
      }
    });
    
    // Add transform animation for the hero number (size and position)
    // Simplified for better performance - only essential properties
    gsap.to(heroNumber, {
      scale: 0.5, // Reduce size to 70% of original
      y: () => window.innerWidth * -0.20, // Move up by 8% of viewport width (equivalent to 8vw at 50% scale)
      ease: "none",
      scrollTrigger: {
        trigger: "#hero-travel-area",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5, // Add a small amount of smoothing
        markers: false
      }
    });
    
    // Add color transition animation for the digits - from yellow to teal
    const digits = heroNumber.querySelectorAll('.digit');
    gsap.to(digits, {
      color: "rgba(205, 252, 255, 0.9)", // Teal color with full opacity
      ease: "none",
      scrollTrigger: {
        trigger: "#hero-travel-area",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        markers: false
      }
    });
  }

  // Modify the pin-top-top animation for the hero area to unpin at the end of the hero number animation
  document.querySelectorAll(".pin-top-top").forEach(function (el) {
    let wrapper = el.parentElement;
    
    // Special handling for the hero area
    if (el.id === "hero-area") {
      ScrollTrigger.create({
        trigger: wrapper,
        start: "top top",
        end: "bottom bottom", // End when the bottom of the wrapper reaches the bottom of viewport
        pin: el,
        pinSpacing: false,
        endTrigger: "#hero-travel-area", // Use hero-travel-area as the end trigger
        onLeaveBack: self => {
          // Reset when scrolling back up
          self.pin.style.transform = "translate3d(0px, 0px, 0px)";
        }
      });
    } else {
      // Default behavior for other elements
      ScrollTrigger.create({
        trigger: wrapper,
        start: "top top",
        end: "bottom bottom",
        pin: el,
        pinSpacing: false,
      });
    }
  });

  // Reveal animations
  document.querySelectorAll(".reveal-top-center").forEach(function (el) {
    gsap.set(el, { opacity: 0 });
    gsap.to(el, {
      opacity: 1,
      ease: "power1.out",
      scrollTrigger: {
        trigger: el,
        start: "top center",
        toggleActions: "restart none none reverse",
      },
    });
  });

  document.querySelectorAll(".reveal-center-center").forEach(function (el) {
    gsap.set(el, { opacity: 0 });
    gsap.to(el, {
      opacity: 1,
      ease: "power1.out",
      scrollTrigger: {
        trigger: el,
        start: "center center",
        toggleActions: "restart none none reverse",
      },
    });
  });

  // Pinning animations
  document.querySelectorAll(".pin-top-center").forEach(function (el) {
    let wrapper = el.parentElement;
    ScrollTrigger.create({
      trigger: wrapper,
      start: "top center",
      end: "bottom bottom",
      pin: el,
      pinSpacing: false,
    });
  });

  document.querySelectorAll(".pin-center-center").forEach(function (el) {
    let wrapper = el.parentElement;
    ScrollTrigger.create({
      trigger: wrapper,
      start: "center center",
      end: "bottom bottom",
      pin: el,
      pinSpacing: false,
    });
  });

  document.querySelectorAll(".pin-bottom-bottom").forEach(function (el) {
    let wrapper = el.parentElement;
    ScrollTrigger.create({
      trigger: wrapper,
      start: "bottom bottom",
      end: "",
      pin: el,
      pinSpacing: false,
    });
  });

  // Years counter scroll animation
  const yearsElem = document.querySelector(".years");
  const fontWeightObj = { weight: 100 };

  if (yearsElem) {
    // Create an object to hold the year value
    const yearsObj = { year: 2026 };
    // Set initial text
    yearsElem.innerText = yearsObj.year.toString();
    // Animation for the year counter
    gsap.to(yearsObj, {
      year: 1876,
      ease: "none",
      scrollTrigger: {
        trigger: "#years-travel-area",
        start: "top -80%",
        end: "bottom 180%",
        scrub: true,
      },
      onUpdate: function () {
        yearsElem.innerText = Math.round(yearsObj.year).toString();
      },
    });
    // Animation for the font weight
    gsap.to(fontWeightObj, {
      weight: 900,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: "#years-travel-area",
        start: "top -80%",
        end: "bottom 180%",
        scrub: true,
      },
      onUpdate: function () {
        yearsElem.style.fontWeight = Math.round(fontWeightObj.weight).toString();
      },
    });
    // Add a scale tween: start smaller (scale 0.5) and grow larger (scale 1.5) as you scroll
    gsap.fromTo(
      yearsElem,
      { scale: 0.5 },
      {
        scale: 1.5,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: "#years-travel-area",
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      }
    );
  }

  // Add seamless infinite marquee inside #anniversary-area
  const anniversaryArea = document.getElementById("anniversary-area");
  if (anniversaryArea) {
    let marquee = anniversaryArea.querySelector("#marquee");
    if (!marquee) {
      marquee = document.createElement("div");
      marquee.id = "marquee";
      marquee.style.position = "absolute";
      marquee.style.bottom = "0";
      marquee.style.left = "0";
      // Create two copies for seamless looping with no space
      const textContent = "150 YEARS OF AMERICAN CHEMICAL SOCIETY ";
      marquee.innerHTML = `<span>${textContent}</span><span>${textContent}</span>`;
      anniversaryArea.appendChild(marquee);
      // Animate the marquee: translateX using xPercent for smoother movement
      gsap.to(marquee, {
        xPercent: -50,
        ease: "linear",
        duration: 20,
        repeat: -1,
      });
    }
  }

  const waveGroup = document.getElementById("waveGroup");
  if (!waveGroup) return;
  // Animate the waveGroup shifting 100 units to the left continuously for seamless looping
  gsap.to(waveGroup, {
    x: "-=100",
    ease: "linear",
    duration: 2,
    repeat: -1,
  });

  // Add page navigation hover and click functionality
  const pageNav = document.querySelector('.section-timeline .page-nav');
  const navLinks = pageNav.querySelectorAll('a');
  const activeTitle = document.querySelector('.section-timeline .indicator .active-title');
  const indicatorWrapper = document.querySelector('.section-timeline .indicator-wrapper');
  
  // Track navigation state
  let isNavActive = false;
  let hideActiveTitleTimeout;
  
  // Initially hide the page nav - change from y to x translation
  gsap.set(navLinks, { opacity: 0, x: -20 });
  
  // Function to show the navigation
  const showNavigation = () => {
    // Clear any pending timeouts
    if (hideActiveTitleTimeout) {
      clearTimeout(hideActiveTitleTimeout);
      hideActiveTitleTimeout = null;
    }
    
    isNavActive = true;
    
    // Hide active title
    gsap.to(activeTitle, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.out"
    });
    
    // Show nav links with stagger - change from y to x translation
    gsap.to(navLinks, {
      opacity: 1,
      x: 0,
      duration: 0.4,
      stagger: 0.05,
      ease: "power2.out"
    });
  };
  
  // Function to hide the navigation
  const hideNavigation = () => {
    isNavActive = false;
    
    // Hide nav links with stagger - change from y to x translation
    gsap.to(navLinks, {
      opacity: 0,
      x: -20,
      duration: 0.3,
      stagger: 0.03,
      ease: "power2.in"
    });
    
    // Show active title with a delay
    hideActiveTitleTimeout = setTimeout(() => {
      // Only show the active title if the nav is still not active
      if (!isNavActive) {
        gsap.to(activeTitle, {
          opacity: 1,
          duration: 0.4,
          ease: "power2.out"
        });
      }
    }, 300); // 300ms delay before showing the active title
  };
  
  // Create hover effect for the timeline navigation
  indicatorWrapper.addEventListener('mouseenter', showNavigation);
  
  // Also allow hovering on the nav itself to keep it visible
  pageNav.addEventListener('mouseenter', showNavigation);
  
  // Hide nav when mouse leaves both elements
  indicatorWrapper.addEventListener('mouseleave', (e) => {
    // Check if we're not entering the page nav
    if (!e.relatedTarget || !pageNav.contains(e.relatedTarget)) {
      hideNavigation();
    }
  });
  
  pageNav.addEventListener('mouseleave', (e) => {
    // Check if we're not entering the indicator wrapper
    if (!e.relatedTarget || !indicatorWrapper.contains(e.relatedTarget)) {
      hideNavigation();
    }
  });
  
  // Add click handler for nav links
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Remove active class from all links
      navLinks.forEach(l => l.classList.remove('active'));
      
      // Add active class to clicked link
      link.classList.add('active');
      
      // Update active title text
      activeTitle.textContent = link.textContent;
      
      // Hide the navigation after clicking
      hideNavigation();
    });
  });
}

// Animate hero number color
function animateHeroNumberColor() {
  const digits = document.querySelector("#hero-number");
  
  gsap.to(digits, {
    color: "rgba(205, 252, 255, 0.9)", // Teal color with full opacity
    ease: "none",
    scrollTrigger: {
      trigger: "#hero-travel-area",
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      markers: false
    }
  });
}

// Animate video scale from small to full size while scrolling
function animateVideoScale() {
  const videoElement = document.querySelector("#video video");
  
  if (videoElement) {
    // Set initial scale
    gsap.set(videoElement, {
      scale: 0.4,
      opacity: 0,
      transformOrigin: "center center"
    });
    
    // Animate scale and opacity as user scrolls
    gsap.to(videoElement, {
      scale: 1.0,
      opacity: 1,
      ease: "power1.out",
      scrollTrigger: {
        trigger: "#hero-travel-area",
        start: "top top", // Start at the top of hero-travel-area
        end: "bottom bottom", // End when bottom of hero-travel-area reaches bottom of viewport
        scrub: true,
        markers: false,
        onUpdate: (self) => {
          // Add/remove class based on progress
          if (self.progress > 0.8) {
            videoElement.classList.add('scale-active');
          } else {
            videoElement.classList.remove('scale-active');
          }
        }
      }
    });
  }
}
