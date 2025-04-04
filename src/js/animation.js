import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import SplitType from "split-type";

// Register the plugins
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(MorphSVGPlugin);

// export function animateCountdownChange(id, value) {
//   const el = document.querySelector(`#${id} .number`);
//   const formatted = id === "days" ? (value >= 100 ? String(value) : ("0" + value).slice(-2)) : ("0" + value).slice(-2);

//   if (el.dataset.value === formatted) return;
//   el.dataset.value = formatted;

//   const currentChars = el.querySelectorAll(".char");
//   gsap.to(currentChars, {
//     y: -12,
//     opacity: 0,
//     duration: 0.4,
//     stagger: 0.05,
//     onComplete: () => {
//       el.innerHTML = formatted
//         .split("")
//         .map((char) => `<span class="char">${char}</span>`)
//         .join("");
//       const newChars = el.querySelectorAll(".char");
//       gsap.from(newChars, {
//         y: 20,
//         z: -500,
//         opacity: 0,
//         duration: 0.42,
//         stagger: 0.05,
//         ease: "power1.out",
//       });
//     },
//   });
// }

export function initHeroAnimation() {
  // Split the hero heading text into characters
  const heroHeading = document.querySelector('#hero-area h1');
  const heroNumber = document.querySelector('#hero-number');
  const header = document.querySelector('header');
  const sectionTimeline = document.querySelector('.section-timeline');
  const enterExperienceBtn = document.querySelector('button.enter-experience');
  
  if (!heroHeading || !heroNumber) return;
  
  // Hide header and section-timeline initially
  if (header) {
    gsap.set(header, { 
      opacity: 0,
      autoAlpha: 0
    });
  }
  
  if (sectionTimeline) {
    gsap.set(sectionTimeline, { 
      opacity: 0,
      autoAlpha: 0
    });
  }
  
  // Hide enter-experience button initially but don't apply transform
  // This avoids conflicts with fancy-btn effects
  if (enterExperienceBtn) {
    gsap.set(enterExperienceBtn, {
      opacity: 0,
      autoAlpha: 0
    });
  }
  
  // Stop Lenis scrolling until animations complete or button is clicked
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
  
  // Dispatch event to start particle fade-in at the very beginning of the animation
  const veryEarlyFadeEvent = new CustomEvent('veryEarlyParticleFade');
  setTimeout(() => {
    document.dispatchEvent(veryEarlyFadeEvent);
  }, 840);
  
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
      opacity: 0.44, // Fade in to 0.44 opacity as requested
      y: 0,
      z: 0,
      duration: 2.5, // Much longer duration for slower fade-in
      stagger: 0.1, // Slightly longer stagger
      ease: "power3.out",
      onComplete: () => {
        // Fade in the enter-experience button after hero number animation completes
        // Only change opacity, not position or scale
        if (enterExperienceBtn) {
          gsap.to(enterExperienceBtn, {
            opacity: 1,
            autoAlpha: 1,
            duration: 0.8,
            ease: "power2.out"
          });
        }
        
        // Mark hero animation as complete
        window.heroAnimationComplete = true;
        
        // Dispatch event to initialize fancy buttons
        const heroAnimationCompleteEvent = new CustomEvent('heroAnimationComplete');
        document.dispatchEvent(heroAnimationCompleteEvent);
      }
    }, 
    "-=0.6" // Slight overlap
  );
  
  // Add click event listener to the enter-experience button
  if (enterExperienceBtn) {
    enterExperienceBtn.addEventListener('click', () => {
      // Fade in header
      if (header) {
        gsap.to(header, {
          opacity: 1,
          autoAlpha: 1,
          duration: 0.8,
          ease: "power2.inOut"
        });
      }
      
      // Fade in section-timeline
      if (sectionTimeline) {
        gsap.to(sectionTimeline, {
          opacity: 1,
          autoAlpha: 1,
          duration: 0.8,
          ease: "power2.inOut",
          delay: 0.2 // Slight delay after header starts fading in
        });
      }
      
      // Mark user as having interacted with the page
      window.userInteracted = true;
      
      // Try to play audio
      window.playBackgroundAudio();
      
      // Re-enable Lenis scrolling
      if (window.lenis) {
        window.lenis.start();
      }
      
      // Fade out the enter-experience button - only opacity, not position
      gsap.to(enterExperienceBtn, {
        opacity: 0,
        autoAlpha: 0,
        duration: 0.5,
        ease: "power2.in"
      });
    });
  }
  
  // Initialize the hero animation
  
  // Create the hero number animation
  if (heroNumber) {
    // Add transform animation for the hero number (size and position)
    // Simplified for better performance - only essential properties
    gsap.to(heroNumber, {
      scale: 0.5, // Reduce size to 50% of original
      ease: "none",
      scrollTrigger: {
        trigger: "#hero-travel-area",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5, // Add a small amount of smoothing
        markers: false
      }
    });
    
    // Create a ScrollTrigger for the opacity animation
    // This will be applied to all digits, including ones that change during scrolling
    const digitOpacityScrollTrigger = ScrollTrigger.create({
      trigger: "#hero-travel-area",
      start: "top top",
      end: "20% top", // End at 20% through the hero-travel-area
      scrub: true,
      markers: false,
      onUpdate: function(self) {
        // Get the current progress (0 to 1)
        const progress = self.progress;
        
        // Calculate the opacity value (from 0.44 to 1)
        const opacity = 0.44 + (progress * 0.56);
        
        // Apply to all current digits
        const digits = heroNumber.querySelectorAll('.digit');
        digits.forEach(digit => {
          digit.style.opacity = opacity;
        });
      }
    });
    
    // Add fade-out animation for the hero number as we approach the video travel area
    ScrollTrigger.create({
      trigger: "#video-travel-area",
      start: "top bottom", // Start when the top of video-travel-area is 100% away from the bottom of viewport
      end: "top 90%", // End when the top of video-travel-area is 10% away from the bottom of viewport
      scrub: true,
      markers: false,
      onUpdate: function(self) {
        // Get the current progress (0 to 1)
        const progress = self.progress;
        
        // Calculate the opacity value (from 1 to 0)
        const opacity = 1 - progress;
        
        // Apply to the hero number
        heroNumber.style.opacity = opacity;
      }
    });
  }
}

export function initAnimations() {
  console.log('Initializing animations');

  ScrollTrigger.refresh();
  ScrollTrigger.clearMatchMedia();

  // Kill any existing ScrollTriggers to prevent duplicates
  ScrollTrigger.getAll().forEach(st => st.kill());

  gsap.registerPlugin(ScrollTrigger);
  gsap.registerPlugin(SplitType);

  // Initialize hero animation (animations that happen on page load)
  initHeroAnimation();

  // Initialize video scale animation
  animateVideoScale();
  
  // Initialize get involved text animation 
  animateGetInvolvedText();
  
  // Initialize sliding cards animation
  animateSlidingCards();
  
  // Initialize page navigation
  updatePageNavigation();

  // Initialize fancy button interactions
  initFancyButtonEffects();
  
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
  
  // Add scroll direction detection and class toggling
  let lastScrollTop = 0;
  window.addEventListener('scroll', () => {
    const currentScrollTop = window.scrollY;
    const anniversaryHeader = document.querySelector('header.anniversary');
    
    if (anniversaryHeader) {
      if (currentScrollTop > lastScrollTop) {
        // Scrolling down
        anniversaryHeader.classList.remove('active');
      } else {
        // Scrolling up
        anniversaryHeader.classList.add('active');
      }
    }
    
    lastScrollTop = currentScrollTop;
  });
  
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
        end: "70% 70%",
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
              
              // Keep only a simple update without animation for performance
              // No opacity animation here
            }
          });
        }
      }
    });
    
    // Add transform animation for the hero number (size and position)
    // Simplified for better performance - only essential properties
    gsap.to(heroNumber, {
      scale: 0.5, // Reduce size to 50% of original
      ease: "none",
      scrollTrigger: {
        trigger: "#hero-travel-area",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5, // Add a small amount of smoothing
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
  //const yearsElem = document.querySelector(".years");
  //const fontWeightObj = { weight: 100 };
//
  //if (yearsElem) {
  //  // Create an object to hold the year value
  //  const yearsObj = { year: 2026 };
  //  // Set initial text
  //  yearsElem.innerText = yearsObj.year.toString();
  //  // Animation for the year counter
  //  gsap.to(yearsObj, {
  //    year: 1876,
  //    ease: "none",
  //    scrollTrigger: {
  //      trigger: "#years-travel-area",
  //      start: "top -80%",
  //      end: "bottom 180%",
  //      scrub: true,
  //    },
  //    onUpdate: function () {
  //      yearsElem.innerText = Math.round(yearsObj.year).toString();
  //    },
  //  });
  //  // Animation for the font weight
  //  gsap.to(fontWeightObj, {
  //    weight: 900,
  //    ease: "power2.inOut",
  //    scrollTrigger: {
  //      trigger: "#years-travel-area",
  //      start: "top -80%",
  //      end: "bottom 180%",
  //      scrub: true,
  //    },
  //    onUpdate: function () {
  //      yearsElem.style.fontWeight = Math.round(fontWeightObj.weight).toString();
  //    },
  //  });
  //  // Add a scale tween: start smaller (scale 0.5) and grow larger (scale 1.5) as you scroll
  //  gsap.fromTo(
  //    yearsElem,
  //    { scale: 0.5 },
  //    {
  //      scale: 1.5,
  //      ease: "power2.inOut",
  //      scrollTrigger: {
  //        trigger: "#years-travel-area",
  //        start: "top top",
  //        end: "bottom bottom",
  //        scrub: true,
  //      },
  //    }
  //  );
  //}

  // Add seamless infinite marquee inside #anniversary-area
  // const anniversaryArea = document.getElementById("anniversary-area");
  // if (anniversaryArea) {
  //   let marquee = anniversaryArea.querySelector("#marquee");
  //   if (!marquee) {
  //     marquee = document.createElement("div");
  //     marquee.id = "marquee";
  //     marquee.style.position = "absolute";
  //     marquee.style.bottom = "0";
  //     marquee.style.left = "0";
  //     // Create two copies for seamless looping with no space
  //     const textContent = "150 YEARS OF AMERICAN CHEMICAL SOCIETY ";
  //     marquee.innerHTML = `<span>${textContent}</span><span>${textContent}</span>`;
  //     anniversaryArea.appendChild(marquee);
  //     // Animate the marquee: translateX using xPercent for smoother movement
  //     gsap.to(marquee, {
  //       xPercent: -50,
  //       ease: "linear",
  //       duration: 20,
  //       repeat: -1,
  //     });
  //   }
  // }

  const waveGroup = document.getElementById("waveGroup");
  if (!waveGroup) return;
  // Animate the waveGroup shifting 100 units to the left continuously for seamless looping
  const waveAnimation = gsap.to(waveGroup, {
    x: "-=100",
    ease: "linear",
    duration: 2,
    repeat: -1,
  });

  // Create and configure background audio with Web Audio API for better volume control
  const getAudioPath = (filename) => {
    // Check if we're in any production environment
    const pathname = window.location.pathname;
    const hostname = window.location.hostname;
    const isProd = pathname.includes('/150-lab/') || 
                  pathname.includes('/content/') || 
                  hostname.includes('acs.org');
    return isProd ? `/150-lab/assets/audio/${filename}` : `/audio/${filename}`;
  };
  
  const backgroundAudio = new Audio(getAudioPath('chemistry2.mp3'));
  backgroundAudio.loop = true;
  backgroundAudio.volume = 0; // Start at 0 volume for fade in
  
  // Add error event listener to check if the audio file can be loaded
  backgroundAudio.addEventListener('error', (e) => {
    console.error('Audio loading error:', e);
    console.error('Audio src:', backgroundAudio.src);
  });
  
  // Store reference for other functions to access
  window.backgroundAudio = backgroundAudio;
  window.audioInitialized = false;
  window.audioMuted = false;
  window.userInteracted = false;
  window.heroAnimationComplete = false;
  
  // Simplified audio playback function - plays at 8% volume
  const playBackgroundAudio = () => {
    if (window.audioMuted) return;
    
    // Only play if both conditions are met: user interaction and hero animation complete
    if (!window.userInteracted || !window.heroAnimationComplete) return;
    
    // Don't play if already initialized
    if (window.audioInitialized) return;
    
    try {
      // Play the audio at 8% volume
      backgroundAudio.volume = 0.08;
      backgroundAudio.play().then(() => {
        console.log('Audio playback started at 8% volume');
        window.audioInitialized = true;
        
        // Update sound toggle if it exists
        const soundToggle = document.querySelector('.sound-toggle');
        if (soundToggle) {
          soundToggle.classList.add('active');
        }
      }).catch(error => {
        console.error('Audio play was prevented:', error);
      });
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  };
  
  // Expose playBackgroundAudio globally so it can be accessed in other callbacks
  window.playBackgroundAudio = playBackgroundAudio;

  // Create and configure UI click sound
  const uiClickSound = new Audio(getAudioPath('ui-click.mp3'));
  uiClickSound.volume = 0.38; // Set to 38% volume
  
  // Function to play UI click sound
  const playUIClickSound = () => {
    if (window.audioMuted) return;
    
    try {
      // Clone the audio to allow multiple overlapping sounds
      const clickSound = uiClickSound.cloneNode();
      clickSound.volume = 0.38;
      clickSound.play().catch(error => {
        console.warn('UI click sound play was prevented:', error);
      });
    } catch (error) {
      console.error('Error playing UI click sound:', error);
    }
  };
  
  // Add click sound to interactive elements
  const setupUIClickSounds = () => {
    // Select all interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input[type="button"], input[type="submit"], input[type="reset"], input[type="checkbox"], input[type="radio"]');
    
    // Add click event listeners to play sound
    interactiveElements.forEach(element => {
      element.addEventListener('click', (event) => {
        // For enter-experience button, only play sound if it's the first click
        if (element.classList.contains('enter-experience')) {
          if (!element.dataset.clickSoundPlayed) {
            if (!window.audioMuted) {
              playUIClickSound();
            }
            element.dataset.clickSoundPlayed = 'true';
          }
          return;
        }
        
        if (!window.audioMuted) {
          playUIClickSound();
        }
      });
    });
    
    // Set up a MutationObserver to add click sounds to new elements
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach(node => {
            if (node.nodeType === 1) { // Element node
              // Check if the node itself is an interactive element
              if (node.matches('a, button, input[type="button"], input[type="submit"], input[type="reset"], input[type="checkbox"], input[type="radio"]')) {
                node.addEventListener('click', (event) => {
                  // For enter-experience button, only play sound if it's the first click
                  if (node.classList.contains('enter-experience')) {
                    if (!node.dataset.clickSoundPlayed) {
                      if (!window.audioMuted) {
                        playUIClickSound();
                      }
                      node.dataset.clickSoundPlayed = 'true';
                    }
                    return;
                  }
                  
                  if (!window.audioMuted) {
                    playUIClickSound();
                  }
                });
              }
              
              // Check for interactive elements within the added node
              const childInteractiveElements = node.querySelectorAll('a, button, input[type="button"], input[type="submit"], input[type="reset"], input[type="checkbox"], input[type="radio"]');
              childInteractiveElements.forEach(element => {
                element.addEventListener('click', (event) => {
                  // For enter-experience button, only play sound if it's the first click
                  if (element.classList.contains('enter-experience')) {
                    if (!element.dataset.clickSoundPlayed) {
                      if (!window.audioMuted) {
                        playUIClickSound();
                      }
                      element.dataset.clickSoundPlayed = 'true';
                    }
                    return;
                  }
                  
                  if (!window.audioMuted) {
                    playUIClickSound();
                  }
                });
              });
            }
          });
        }
      });
    });
    
    // Start observing the document with the configured parameters
    observer.observe(document.body, { childList: true, subtree: true });
  };
  
  // Handle audio playback on user interaction
  const enableAudioOnInteraction = (event) => {
    // Mark that user has interacted with the page
    window.userInteracted = true;
    
    // Try to play audio if hero animation is also complete
    window.playBackgroundAudio();
  };
  
  // Add event listeners for user interaction
  document.addEventListener('click', enableAudioOnInteraction);
  document.addEventListener('touchstart', enableAudioOnInteraction);
  document.addEventListener('keydown', enableAudioOnInteraction);

  // Add sound toggle functionality
  const soundToggle = document.querySelector('.sound-toggle');
  if (soundToggle) {
    soundToggle.addEventListener('click', () => {
      // Always play UI click sound first, regardless of mute state
      playUIClickSound();
      
      // Toggle the muted class
      soundToggle.classList.toggle('muted');
      
      // Update global mute state
      window.audioMuted = soundToggle.classList.contains('muted');
      
      // Pause or resume the wave animation based on muted state
      if (window.audioMuted) {
        waveAnimation.pause();
        
        // Mute the audio
        if (window.backgroundAudio) {
          window.backgroundAudio.volume = 0;
          // Optional: pause the audio
          // window.backgroundAudio.pause();
        }
      } else {
        waveAnimation.resume();
        
        // If audio hasn't been initialized yet, initialize it now
        if (!window.audioInitialized && window.backgroundAudio) {
          window.playBackgroundAudio();
        } else if (window.backgroundAudio) {
          // Unmute the audio
          window.backgroundAudio.volume = 0.08;
          
          // If audio was paused, restart it
          if (window.backgroundAudio.paused) {
            window.backgroundAudio.play().catch(error => {
              console.warn('Audio play was prevented:', error);
            });
          }
        }
      }
    });
  }

  // Add page navigation hover and click functionality
  const pageNav = document.querySelector('.section-timeline .page-nav');
  const navLinks = pageNav.querySelectorAll('a');
  const activeTitle = document.querySelector('.section-timeline .indicator .active-title');
  const indicatorWrapper = document.querySelector('.section-timeline .indicator-wrapper');
  const timelineNavWrapper = document.querySelector('.timeline-nav-wrapper');
  
  // Track navigation state
  let isNavActive = false;
  let hideActiveTitleTimeout;
  let showActiveTitleTimeout;
  
  // Initially hide the page nav and ensure active title is visible
  gsap.set(navLinks, { opacity: 0, x: -20 });
  gsap.set(activeTitle, { opacity: 1 });
  
  // Cancel all pending animations and timeouts
  const cancelAllPendingAnimations = () => {
    // Clear any pending timeouts
    if (hideActiveTitleTimeout) {
      clearTimeout(hideActiveTitleTimeout);
      hideActiveTitleTimeout = null;
    }
    if (showActiveTitleTimeout) {
      clearTimeout(showActiveTitleTimeout);
      showActiveTitleTimeout = null;
    }
    
    // Kill any ongoing GSAP animations for these elements
    gsap.killTweensOf(activeTitle);
    gsap.killTweensOf(navLinks);
  };
  
  // Function to show the navigation
  const showNavigation = () => {
    cancelAllPendingAnimations();
    isNavActive = true;
    
    // Immediately hide active title
    gsap.set(activeTitle, { opacity: 0 });
    
    // Then animate the nav links
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
    cancelAllPendingAnimations();
    isNavActive = false;
    
    // Hide nav links with stagger
    gsap.to(navLinks, {
      opacity: 0,
      x: -20,
      duration: 0.3,
      stagger: 0.03,
      ease: "power2.in",
      onComplete: () => {
        // Only show the active title if the nav is still not active
        if (!isNavActive) {
          gsap.to(activeTitle, {
            opacity: 1,
            duration: 0.4,
            ease: "power2.out"
          });
        }
      }
    });
  };
  
  // Remove old event listeners if they exist
  if (indicatorWrapper) {
    indicatorWrapper.removeEventListener('mouseenter', showNavigation);
    const oldLeaveHandlers = indicatorWrapper.onmouseleave;
    if (oldLeaveHandlers) {
      indicatorWrapper.removeEventListener('mouseleave', oldLeaveHandlers);
    }
  }
  
  if (pageNav) {
    pageNav.removeEventListener('mouseenter', showNavigation);
    const oldLeaveHandlers = pageNav.onmouseleave;
    if (oldLeaveHandlers) {
      pageNav.removeEventListener('mouseleave', oldLeaveHandlers);
    }
  }
  
  if (timelineNavWrapper) {
    timelineNavWrapper.removeEventListener('mouseenter', showNavigation);
    const oldLeaveHandlers = timelineNavWrapper.onmouseleave;
    if (oldLeaveHandlers) {
      timelineNavWrapper.removeEventListener('mouseleave', oldLeaveHandlers);
    }
  }
  
  // Create hover effect for the timeline navigation using the new wrapper
  if (timelineNavWrapper) {
    // Use mouseenter/mouseleave for more reliable hover detection
    timelineNavWrapper.addEventListener('mouseenter', () => {
      showNavigation();
    });
    
    timelineNavWrapper.addEventListener('mouseleave', () => {
      hideNavigation();
    });
  } else {
    // Fallback to old behavior if new wrapper doesn't exist
    indicatorWrapper.addEventListener('mouseenter', showNavigation);
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
  }
  
  // Add click handler for nav links
  navLinks.forEach(link => {
    // Remove any existing click listeners to prevent duplicates
    const oldClickListeners = link.onclick;
    if (oldClickListeners) {
      link.removeEventListener('click', oldClickListeners);
    }
    
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Cancel any pending animations
      cancelAllPendingAnimations();
      
      // Remove active class from all links
      navLinks.forEach(l => l.classList.remove('active'));
      
      // Add active class to clicked link
      link.classList.add('active');
      
      // Update active title text
      activeTitle.textContent = link.textContent;
      
      // Immediately hide nav links
      gsap.to(navLinks, {
        opacity: 0,
        x: -20,
        duration: 0.3,
        stagger: 0.03,
        ease: "power2.in",
        onComplete: () => {
          // Ensure nav is marked as inactive
          isNavActive = false;
          
          // Show active title
          gsap.to(activeTitle, {
            opacity: 1,
            duration: 0.4,
            ease: "power2.out"
          });
        }
      });
    });
  });

  // Export a utility function to handle dynamically added audio elements
  window.handleNewAudioElement = (element) => {
    // Check if the sound is currently muted
    if (window.audioMuted) {
      // If muted, set volume to 0 and mute
      element.volume = 0;
      element.muted = true;
    }
    
    // Add event listener to check mute state when audio starts playing
    element.addEventListener('play', () => {
      const soundToggle = document.querySelector('.sound-toggle');
      if (soundToggle && soundToggle.classList.contains('muted')) {
        element.volume = 0;
        element.muted = true;
      }
    });
  };

  // Add a mutation observer to detect dynamically added audio/video elements
  const audioObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach((node) => {
          // Check if the added node is an audio or video element
          if (node.nodeName === 'AUDIO' || node.nodeName === 'VIDEO') {
            window.handleNewAudioElement(node);
          } else if (node.querySelectorAll) {
            // Check for audio/video elements inside the added node
            const audioNodes = node.querySelectorAll('audio, video');
            audioNodes.forEach(audioNode => {
              window.handleNewAudioElement(audioNode);
            });
          }
        });
      }
    });
  });

  // Start observing the document body for added nodes
  audioObserver.observe(document.body, { childList: true, subtree: true });

  // Initialize UI click sounds after the DOM is fully loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupUIClickSounds);
  } else {
    setupUIClickSounds();
  }

  // Add this line where other animations are initialized
  animateGetInvolvedText();

  // Initialize page navigation updates
  updatePageNavigation();

  // Initialize split lines animations
  initSplitLinesAnimation();
  
  // Initialize split chars animations
  initSplitCharsAnimation();
  
  // Initialize scroll reveal animations
  initScrollRevealAnimation();
}

// Function to initialize fancy button effects
function initFancyButtonEffects() {
  const fancyButtons = document.querySelectorAll('.fancy-btn');
  
  // Flag to track if we've already set up the event listener
  let heroEventListenerAdded = false;
  
  // Create a function to initialize all fancy buttons
  const initAllFancyButtons = () => {
    fancyButtons.forEach(button => {
      // Skip buttons that are already initialized
      if (button.dataset.fancyInitialized === 'true') {
        return;
      }
      
      initSingleFancyButton(button);
      // Mark as initialized
      button.dataset.fancyInitialized = 'true';
    });
  };
  
  // Add event listener for heroAnimationComplete only once
  if (!heroEventListenerAdded) {
    document.addEventListener('heroAnimationComplete', initAllFancyButtons);
    heroEventListenerAdded = true;
  }
  
  // Initialize non-enter-experience buttons immediately
  fancyButtons.forEach(button => {
    if (!button.classList.contains('enter-experience')) {
      initSingleFancyButton(button);
      button.dataset.fancyInitialized = 'true';
    }
  });
  
  // If hero animation is already complete, initialize all buttons now
  if (window.heroAnimationComplete) {
    initAllFancyButtons();
  }
  
  // Helper function to initialize a single fancy button
  function initSingleFancyButton(button) {
    let isHovering = false;
    
    // Add hover effect
    button.addEventListener('mouseenter', () => {
      isHovering = true;
      button.classList.add('fancy-btn-active');
      button.style.transform = 'translateY(-2px) scale(1.02)';
    });
    
    // Remove hover effect
    button.addEventListener('mouseleave', () => {
      isHovering = false;
      button.classList.remove('fancy-btn-active');
      button.style.transform = '';
    });
    
    // Add click effect
    button.addEventListener('mousedown', () => {
      button.style.transform = 'translateY(1px) scale(0.98)';
    });
    
    // Reset after click
    button.addEventListener('mouseup', () => {
      if (isHovering) {
        button.style.transform = 'translateY(-2px) scale(1.02)';
      }
    });
  }
}

// Animate video scale from small to full size while scrolling
function animateVideoScale() {
    const videoWrapper = document.querySelector("#video .video-wrapper");
    const videoSection = document.querySelector("#video");
    const videoTravelArea = document.querySelector("#video-travel-area");
    
    if (videoWrapper && videoSection && videoTravelArea) {
        // Set initial scale
        gsap.set(videoWrapper, {
            scale: 0.4,
            opacity: 0,
            transformOrigin: "center center"
        });
        
        // Create a timeline for the video animations - start when entering video-travel-area
        const videoTl = gsap.timeline({
            scrollTrigger: {
                trigger: "#video-travel-area", // Changed from hero-travel-area to video-travel-area
                start: "top bottom", // Start when the top of video-travel-area enters the viewport
                end: "top 20%", // End when the top of video-travel-area is 20% from the top of viewport
                scrub: true,
                markers: false,
                onUpdate: (self) => {
                    // Add/remove class based on progress
                    if (self.progress > 0.8) {
                        videoWrapper.classList.add('scale-active');
                    } else {
                        videoWrapper.classList.remove('scale-active');
                    }
                }
            }
        });
        
        // Add the scale animation to the timeline
        videoTl.to(videoWrapper, {
            scale: 1.0,
            opacity: 1,
            ease: "power2.out" // Slightly more pronounced easing
        });
        
        // Create a pin animation that pins the video when it reaches the top of the viewport
        ScrollTrigger.create({
            trigger: "#video",
            start: "top top", // Start pinning when the top of #video reaches the top of the viewport
            endTrigger: "#video-travel-area", // Use video-travel-area as the end trigger
            end: "bottom bottom", // End pinning when the bottom of video-travel-area reaches the bottom of viewport
            pin: true, // Pin the video section
            pinSpacing: false, // Don't add extra space for the pinned element
            anticipatePin: 1, // Helps prevent jittering
            markers: false, // Set to true for debugging
            id: "video-pin" // Add an ID for easier debugging
        });
    }
}

// Add this function after the animateVideoScale function
function animateGetInvolvedText() {
  const getInvolvedText = document.querySelector('#get-involved-text p');
  
  if (getInvolvedText) {
    // Make sure the paragraph is visible and has proper dimensions
    gsap.set(getInvolvedText, { 
      opacity: 1,
      visibility: 'visible',
      autoAlpha: 1
    });
    
    // Use a short delay to ensure the browser has properly rendered text and calculated dimensions
    setTimeout(() => {
      // Force a reflow to ensure proper layout calculations
      document.body.offsetHeight;
      getInvolvedText.offsetHeight;
      
      // Manually force proper word wrapping before splitting
      getInvolvedText.style.width = getInvolvedText.offsetWidth + 'px';
      
      // Split the text into lines based on natural word-wrap
      const splitText = new SplitType(getInvolvedText, { 
        types: 'lines',
        lineClass: 'line',
        // Ensure proper positioning
        absolute: false
      });
      
      // If we have splitText.lines, proceed with the animation
      if (splitText.lines && splitText.lines.length > 0) {
        console.log('Number of lines detected:', splitText.lines.length);
        
        // Hide all lines initially and set their initial position
        gsap.set(splitText.lines, { 
          opacity: 0,
          y: 40,
          transformOrigin: "center center"
        });
        
        // Create a timeline for the animation
        gsap.timeline({
          scrollTrigger: {
            trigger: "#get-involved",
            start: "top 65%",
            end: "top 20%",
            scrub: false,
            markers: false,
            toggleActions: "play none none reverse"
          }
        })
        .to(splitText.lines, {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.25,
          ease: "power1.out"
        });
      } else {
        console.warn('SplitType failed to detect lines properly');
      }
    }, 100); // Small delay to ensure proper layout
  }
}

function updatePageNavigation() {
  const heroTravelArea = document.querySelector('#hero-travel-area');
  const getInvolvedSection = document.querySelector('#get-involved');
  const assetsSection = document.querySelector('#anniversary-assets');
  const pageNav = document.querySelector('.page-nav');
  const activeTitle = document.querySelector('.section-timeline .indicator .active-title');
  
  if (!heroTravelArea || !getInvolvedSection || !pageNav || !activeTitle) return;
  
  const heroYearsLink = pageNav.querySelector('.anniversary');
  const getInvolvedLink = pageNav.querySelector('.get-involved');
  const assetsLink = pageNav.querySelector('.assets');
  
  // Add click event listeners for smooth scrolling
  heroYearsLink.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  getInvolvedLink.addEventListener('click', (e) => {
    e.preventDefault();
    const getInvolvedOffset = getInvolvedSection.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({
      top: getInvolvedOffset,
      behavior: 'smooth'
    });
  });
  
  assetsLink.addEventListener('click', (e) => {
    e.preventDefault();
    if (assetsSection) {
      const assetsOffset = assetsSection.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: assetsOffset,
        behavior: 'smooth'
      });
    }
  });
  
  // Create a function to update the active title with a fade transition
  const updateActiveTitleWithFade = (newText) => {
    // Don't animate if the text is already the same
    if (activeTitle.textContent === newText) return;
    
    // Create a timeline for the fade transition
    const tl = gsap.timeline();
    
    // Fade out current text
    tl.to(activeTitle, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        // Update text when fully faded out
        activeTitle.textContent = newText;
      }
    });
    
    // Fade in new text
    tl.to(activeTitle, {
      opacity: 1,
      duration: 0.3
    });
  };
  
  // Create ScrollTrigger for hero section
  ScrollTrigger.create({
    trigger: "#hero-travel-area",
    start: "top 50%",
    end: "bottom 50%",
    onEnter: () => {
      // Remove active class from all links
      pageNav.querySelectorAll('a').forEach(link => link.classList.remove('active'));
      // Add active class to 150 years link
      heroYearsLink.classList.add('active');
      // Update active title with fade transition
      updateActiveTitleWithFade("150 Years of ACS");
    },
    onEnterBack: () => {
      // Remove active class from all links
      pageNav.querySelectorAll('a').forEach(link => link.classList.remove('active'));
      // Add active class to 150 years link
      heroYearsLink.classList.add('active');
      // Update active title with fade transition
      updateActiveTitleWithFade("150 Years of ACS");
    }
  });
  
  // Create ScrollTrigger for get involved section
  ScrollTrigger.create({
    trigger: "#get-involved",
    start: "top 50%",
    end: "bottom 50%",
    onEnter: () => {
      // Remove active class from all links
      pageNav.querySelectorAll('a').forEach(link => link.classList.remove('active'));
      // Add active class to get involved link
      getInvolvedLink.classList.add('active');
      // Update active title with fade transition
      updateActiveTitleWithFade("Get Involved");
    },
    onEnterBack: () => {
      // Remove active class from all links
      pageNav.querySelectorAll('a').forEach(link => link.classList.remove('active'));
      // Add active class to get involved link
      getInvolvedLink.classList.add('active');
      // Update active title with fade transition
      updateActiveTitleWithFade("Get Involved");
    }
  });
  
  // Create ScrollTrigger for anniversary assets section
  ScrollTrigger.create({
    trigger: "#anniversary-assets",
    start: "top 50%",
    end: "bottom 50%",
    onEnter: () => {
      // Remove active class from all links
      pageNav.querySelectorAll('a').forEach(link => link.classList.remove('active'));
      // Add active class to assets link
      assetsLink.classList.add('active');
      // Update active title with fade transition
      updateActiveTitleWithFade("150th Assets");
    },
    onEnterBack: () => {
      // Remove active class from all links
      pageNav.querySelectorAll('a').forEach(link => link.classList.remove('active'));
      // Add active class to assets link
      assetsLink.classList.add('active');
      // Update active title with fade transition
      updateActiveTitleWithFade("150th Assets");
    }
  });
}

function animateSlidingCards() {
  const slidingCardWrapper = document.querySelector('.sliding-card-row-wrapper');
  const getInvolvedCards = document.querySelector('#get-involved-cards');
  
  if (slidingCardWrapper && getInvolvedCards) {
    // Create scroll animation for the sliding cards
    gsap.fromTo(
      slidingCardWrapper, 
      { x: '44vw' }, // Starting position (matching the CSS)
      {
        x: '-28vw', // End position
        ease: 'power1.inOut', // Slightly smoother easing
        scrollTrigger: {
          trigger: '#get-involved-cards',
          start: 'top 80%', // Start when the top of cards section is 80% down the viewport
          end: 'bottom 20%', // End when the bottom of cards section is 20% from the top of viewport
          scrub: 1.5, // Smoother scrubbing with slightly more lag
          invalidateOnRefresh: true, // Recalculate on resize
          markers: false, // Set to true for debugging
          id: "sliding-cards-animation" // For debugging
        }
      }
    );
    
    console.log('Sliding cards animation initialized');
  } else {
    console.warn('Could not find sliding card wrapper or get-involved-cards section');
  }
}

export function initSplitLinesAnimation() {
  // Get all elements with the split-lines class
  const splitLinesElements = document.querySelectorAll('.split-lines');
  
  if (!splitLinesElements.length) {
    console.warn('No .split-lines elements found');
    return;
  }
  
  // Store references to split instances for potential cleanup
  const splitInstances = [];
  
  // Function to process a single element with proper timing
  const processSplitElement = (element, index) => {
    // First, store the original content
    const originalContent = element.innerHTML;
    
    // Create a wrapper div that will contain the split text only
    const wrapperDiv = document.createElement('div');
    wrapperDiv.className = 'split-lines-wrapper';
    wrapperDiv.innerHTML = originalContent;
    element.innerHTML = '';
    element.appendChild(wrapperDiv);
    
    // Add a small timeout to ensure the text is fully rendered before splitting
    setTimeout(() => {
      // Apply SplitType only to the wrapper div
      const splitText = new SplitType(wrapperDiv, {
        types: 'lines',
        lineClass: 'split-line',
        absolute: false, // Avoid absolute positioning which affects layout more
        tagName: 'div'   // Use div instead of default spans
      });
      
      // Store the instance for potential cleanup
      splitInstances.push({ 
        element, 
        wrapper: wrapperDiv, 
        splitText, 
        originalContent 
      });
      
      // Check if lines were created properly
      if (splitText.lines && splitText.lines.length > 0) {
        // Set initial state for lines - hidden and shifted down
        gsap.set(splitText.lines, {
          opacity: 0,
          y: 50
        });
        
        // Create ScrollTrigger animation for each element
        ScrollTrigger.create({
          trigger: element,
          start: "top 85%", // Trigger when the top of the element is 85% from the top of viewport
          once: false, // Allow the animation to run multiple times if scrolled past
          markers: false, // Set to true for debugging
          id: `split-lines-${index}`,
          onEnter: () => {
            // Animate the lines when they enter the viewport
            gsap.to(splitText.lines, {
              opacity: 1,
              y: 0,
              duration: 1.2,
              stagger: 0.1, // Staggered animation for each line
              ease: "power2.out",
              overwrite: true
            });
          },
          onLeaveBack: () => {
            // Reset the animation when scrolling back up
            gsap.to(splitText.lines, {
              opacity: 0,
              y: 50,
              duration: 0.8,
              stagger: 0.05,
              ease: "power2.in",
              overwrite: true
            });
          }
        });
      } else {
        console.warn('SplitType failed to create lines for element:', element);
        // Restore original content if split failed
        element.innerHTML = originalContent;
      }
    }, 100); // 100ms delay to ensure rendering is complete
  };
  
  // Process each split-lines element with the delayed function
  splitLinesElements.forEach((element, index) => {
    processSplitElement(element, index);
  });
  
  // Add a cleanup method to the window for potential use
  window.cleanupSplitLines = () => {
    splitInstances.forEach(instance => {
      // Revert to original content
      instance.element.innerHTML = instance.originalContent;
      // Remove from instance array
      const index = splitInstances.indexOf(instance);
      if (index > -1) {
        splitInstances.splice(index, 1);
      }
    });
    console.log('Split lines cleanup completed');
  };
  
  // Also add a refresh method to recalculate splits if needed (like after window resize)
  window.refreshSplitLines = () => {
    // First clean up existing splits
    window.cleanupSplitLines();
    
    // Then re-initialize with a slight delay to ensure DOM is updated
    setTimeout(() => {
      // Get elements again in case DOM has changed
      const elements = document.querySelectorAll('.split-lines');
      elements.forEach((element, index) => {
        processSplitElement(element, index);
      });
      console.log('Split lines refreshed');
    }, 100);
  };
  
  // Add a window resize handler to refresh splits when viewport size changes
  const debouncedRefresh = debounce(() => {
    window.refreshSplitLines();
  }, 250); // 250ms debounce
  
  window.addEventListener('resize', debouncedRefresh);
  
  console.log(`Initialized split lines animations for ${splitLinesElements.length} elements`);
}

// Initialize character splitting animation for elements with .split-chars class
export function initSplitCharsAnimation() {
  // Get all elements with the split-chars class
  const splitCharsElements = document.querySelectorAll('.split-chars');
  
  if (!splitCharsElements.length) {
    console.warn('No .split-chars elements found');
    return;
  }
  
  // Store references to split instances for potential cleanup
  const splitCharsInstances = [];
  
  // Function to process a single element with proper timing
  const processSplitCharsElement = (element, index) => {
    // First, store the original content
    const originalContent = element.innerHTML;
    
    // Create a wrapper div that will contain the split text only
    const wrapperDiv = document.createElement('div');
    wrapperDiv.className = 'split-chars-wrapper';
    wrapperDiv.innerHTML = originalContent;
    element.innerHTML = '';
    element.appendChild(wrapperDiv);
    
    // Add a small timeout to ensure the text is fully rendered before splitting
    setTimeout(() => {
      // Apply SplitType only to the wrapper div, but split by chars
      const splitText = new SplitType(wrapperDiv, {
        types: 'chars',
        charClass: 'split-char',
        absolute: false,
        tagName: 'span' // Use spans for characters as they're inline elements
      });
      
      // Store the instance for potential cleanup
      splitCharsInstances.push({ 
        element, 
        wrapper: wrapperDiv, 
        splitText, 
        originalContent 
      });
      
      // Check if chars were created properly
      if (splitText.chars && splitText.chars.length > 0) {
        // Set initial state for chars - hidden and shifted down
        gsap.set(splitText.chars, {
          opacity: 0,
          y: 50,
          // Ensure characters don't break the flow
          display: 'inline-block'
        });
        
        // Create ScrollTrigger animation for each element
        ScrollTrigger.create({
          trigger: element,
          start: "top 85%", // Trigger when the top of the element is 85% from the top of viewport
          once: false, // Allow the animation to run multiple times if scrolled past
          markers: false, // Set to true for debugging
          id: `split-chars-${index}`,
          onEnter: () => {
            // Animate the chars when they enter the viewport
            gsap.to(splitText.chars, {
              opacity: 1,
              y: 0,
              duration: 1.2,
              stagger: 0.02, // Faster stagger for chars since there are more of them
              ease: "power2.out",
              overwrite: true
            });
          },
          onLeaveBack: () => {
            // Reset the animation when scrolling back up
            gsap.to(splitText.chars, {
              opacity: 0,
              y: 50,
              duration: 0.8,
              stagger: 0.01, // Faster stagger for reset
              ease: "power2.in",
              overwrite: true
            });
          }
        });
      } else {
        console.warn('SplitType failed to create chars for element:', element);
        // Restore original content if split failed
        element.innerHTML = originalContent;
      }
    }, 100); // 100ms delay to ensure rendering is complete
  };
  
  // Process each split-chars element with the delayed function
  splitCharsElements.forEach((element, index) => {
    processSplitCharsElement(element, index);
  });
  
  // Add a cleanup method to the window for potential use
  window.cleanupSplitChars = () => {
    splitCharsInstances.forEach(instance => {
      // Revert to original content
      instance.element.innerHTML = instance.originalContent;
      // Remove from instance array
      const index = splitCharsInstances.indexOf(instance);
      if (index > -1) {
        splitCharsInstances.splice(index, 1);
      }
    });
    console.log('Split chars cleanup completed');
  };
  
  // Also add a refresh method to recalculate splits if needed (like after window resize)
  window.refreshSplitChars = () => {
    // First clean up existing splits
    window.cleanupSplitChars();
    
    // Then re-initialize with a slight delay to ensure DOM is updated
    setTimeout(() => {
      // Get elements again in case DOM has changed
      const elements = document.querySelectorAll('.split-chars');
      elements.forEach((element, index) => {
        processSplitCharsElement(element, index);
      });
      console.log('Split chars refreshed');
    }, 100);
  };
  
  // Add a window resize handler to refresh splits when viewport size changes
  const debouncedRefresh = debounce(() => {
    window.refreshSplitChars();
  }, 250); // 250ms debounce
  
  window.addEventListener('resize', debouncedRefresh);
  
  console.log(`Initialized split chars animations for ${splitCharsElements.length} elements`);
}

// Initialize simple scroll reveal animation without text splitting
export function initScrollRevealAnimation() {
  // Get all elements with the scroll-reveal class
  const scrollRevealElements = document.querySelectorAll('.scroll-reveal');
  
  if (!scrollRevealElements.length) {
    console.warn('No .scroll-reveal elements found');
    return;
  }
  
  // Process each scroll-reveal element
  scrollRevealElements.forEach((element, index) => {
    // Set initial state - hidden and shifted down
    gsap.set(element, {
      opacity: 0,
      y: 50
    });
    
    // Create ScrollTrigger animation for each element
    ScrollTrigger.create({
      trigger: element,
      start: "top 85%", // Trigger when the top of the element is 85% from the top of viewport
      once: false, // Allow the animation to run multiple times if scrolled past
      markers: false, // Set to true for debugging
      id: `scroll-reveal-${index}`,
      onEnter: () => {
        // Animate when element enters the viewport
        gsap.to(element, {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power2.out",
          overwrite: true
        });
      },
      onLeaveBack: () => {
        // Reset the animation when scrolling back up
        gsap.to(element, {
          opacity: 0,
          y: 50,
          duration: 0.8,
          ease: "power2.in",
          overwrite: true
        });
      }
    });
  });
  
  console.log(`Initialized scroll reveal animations for ${scrollRevealElements.length} elements`);
}

// Simple debounce function to prevent too many resize calculations
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
