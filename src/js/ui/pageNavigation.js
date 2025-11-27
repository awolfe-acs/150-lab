// ui/pageNavigation.js
// Page navigation and section linking

import gsap from "gsap";
import debounce from "../utils/debounce.js";

export function updatePageNavigation() {
  const pageNav = document.querySelector(".page-nav");
  const activeTitle = document.querySelector(".section-timeline .indicator .active-title");
  const sectionTimeline = document.querySelector(".section-timeline");
  const formPanel = document.querySelector(".form-panel");
  const timelineNavWrapper = document.querySelector(".timeline-nav-wrapper");

  // Target sections
  const getInvolvedMessage = document.querySelector(".get-involved-message") || document.querySelector("#acs-timeline"); // Fallback to timeline if message missing
  const signupForm = document.querySelector("#signup-form");
  const eventsSection = document.querySelector("#events");
  
  if (!pageNav || !activeTitle || !sectionTimeline) return;

  // Initially hide the page navigation
  gsap.set(pageNav, { opacity: 0, pointerEvents: "none" });

  // Track if navigation was clicked and should stay hidden
  let navClickedAndHidden = false;

  // Helper function to check if mouse is within form panel boundaries
  const isMouseInFormPanel = (event) => {
    if (!formPanel) return false;

    const rect = formPanel.getBoundingClientRect();
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    return mouseX >= rect.left && mouseX <= rect.right && mouseY >= rect.top && mouseY <= rect.bottom;
  };

  // Add hover functionality to show/hide page navigation
  sectionTimeline.addEventListener("mouseenter", (event) => {
    // Only show if not in clicked-and-hidden state AND mouse is not within form panel
    if (!navClickedAndHidden && !isMouseInFormPanel(event)) {
      gsap.to(pageNav, { opacity: 1, pointerEvents: "auto", duration: 0.3, ease: "power2.out" });
    }
  });

  sectionTimeline.addEventListener("mouseleave", () => {
    gsap.to(pageNav, { opacity: 0, pointerEvents: "none", duration: 0.3, ease: "power2.out" });
    // Reset the clicked state on mouseleave - ready for next mouseenter
    navClickedAndHidden = false;
  });

  // Add hover functionality to fade out active title when hovering over page nav
  pageNav.addEventListener("mouseenter", (event) => {
    // Only hide active title if mouse is not within form panel
    if (!isMouseInFormPanel(event)) {
      gsap.to(activeTitle, { opacity: 0, duration: 0.2, ease: "power2.out" });
    }
  });

  pageNav.addEventListener("mouseleave", () => {
    gsap.to(activeTitle, { opacity: 1, duration: 0.2, ease: "power2.out" });
  });

  // Control pointer events on timeline-nav-wrapper when mouse is inside form-panel
  if (formPanel && timelineNavWrapper) {
    formPanel.addEventListener("mouseenter", () => {
      gsap.set(timelineNavWrapper, { pointerEvents: "none" });
    });

    formPanel.addEventListener("mouseleave", () => {
      gsap.set(timelineNavWrapper, { pointerEvents: "auto" });
    });
  }

  const introLink = pageNav.querySelector(".intro");
  const anniversaryLink = pageNav.querySelector(".anniversary");
  const getInvolvedLink = pageNav.querySelector(".get-involved");
  const eventsLink = pageNav.querySelector(".events");

  // Create a function to update the active title with a quick fade transition
  const updateActiveTitle = (newText) => {
    // Don't update if the text is already the same
    if (activeTitle.textContent === newText) return;

    // Use a very fast timeline for a smooth but quick transition
    const tl = gsap.timeline();

    // Quick fade out (100ms)
    tl.to(activeTitle, {
      opacity: 0,
      duration: 0.18,
      onComplete: () => {
        // Update the text during the brief fade out
        activeTitle.textContent = newText;
      },
    });

    // Quick fade in (100ms)
    tl.to(activeTitle, {
      opacity: 1,
      duration: 0.24,
    });
  };

  // Helper function to get fresh scroll position for an element
  const getElementScrollPosition = (element) => {
    if (!element) return 0;

    // Force layout recalculation by accessing offsetTop
    element.offsetHeight;

    // Use offsetTop for more reliable positioning, especially after layout changes
    let offsetTop = 0;
    let currentElement = element;

    // Calculate cumulative offset from document top
    while (currentElement) {
      offsetTop += currentElement.offsetTop;
      currentElement = currentElement.offsetParent;
    }

    return offsetTop;
  };

  // Helper to handle click navigation
  const handleNavClick = (e, link, title, targetElement, isTop = false) => {
    e.preventDefault();

    // Immediately update active title and links
    pageNav.querySelectorAll("a").forEach((l) => l.classList.remove("active"));
    if (link) link.classList.add("active");
    updateActiveTitle(title);

    // Hide navigation and mark as clicked
    gsap.to(pageNav, { opacity: 0, pointerEvents: "none", duration: 0.2, ease: "power2.out" });
    navClickedAndHidden = true;

    if (isTop) {
      if (window.lenis) {
        window.lenis.scrollTo(0, { duration: 1.5 });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else if (targetElement) {
      // Use Lenis for scrolling if available, as it handles the large timeline distance better
      if (window.lenis) {
        // Add a small offset to ensure we land exactly where intended
        window.lenis.scrollTo(targetElement, { 
          offset: 0, 
          duration: 2.0, // Longer duration for long scrolls
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) // Custom easing
        });
      } else {
        setTimeout(() => {
          const targetOffset = getElementScrollPosition(targetElement);
          window.scrollTo({
            top: targetOffset,
            behavior: "smooth",
          });
        }, 50);
      }
    }
  };

  // Click handlers
  if (introLink) {
    introLink.addEventListener("click", (e) => handleNavClick(e, introLink, "Intro", null, true));
  }

  if (anniversaryLink) {
    anniversaryLink.addEventListener("click", (e) => handleNavClick(e, anniversaryLink, "150 Years of ACS", getInvolvedMessage));
  }

  if (getInvolvedLink) {
    getInvolvedLink.addEventListener("click", (e) => handleNavClick(e, getInvolvedLink, "Get Involved", signupForm));
  }

  if (eventsLink) {
    eventsLink.addEventListener("click", (e) => handleNavClick(e, eventsLink, "Events", eventsSection));
  }

  // -------------------------
  // Scroll-based detection with improved performance
  // -------------------------

  // Calculate section boundaries once, storing their ranges
  const sections = [
    {
      id: "intro",
      element: document.body, // Intro is basically top/body
      title: "Intro",
      link: introLink,
      top: 0,
      bottom: 0,
    },
    {
      id: "anniversary",
      element: getInvolvedMessage,
      title: "150 Years of ACS",
      link: anniversaryLink,
      top: 0,
      bottom: 0,
    },
    {
      id: "getinvolved",
      element: signupForm,
      title: "Get Involved",
      link: getInvolvedLink,
      top: 0,
      bottom: 0,
    },
    {
      id: "events",
      element: eventsSection,
      title: "Events",
      link: eventsLink,
      top: 0,
      bottom: 0,
    },
  ];

  // Calculate section boundaries using more reliable positioning
  function updateSectionBoundaries() {
    sections.forEach((section, index) => {
      if (section.element) {
        section.top = getElementScrollPosition(section.element);
        // Default bottom is top + height, but we'll adjust based on next section
        section.bottom = section.top + section.element.offsetHeight;
      }
    });

    // Adjust boundaries to be contiguous
    // Intro ends where Anniversary starts
    if (sections[1].element) {
      sections[0].bottom = sections[1].top;
    } else {
      sections[0].bottom = window.innerHeight; // Fallback
    }

    // Anniversary ends where Get Involved starts
    if (sections[2].element) {
      sections[1].bottom = sections[2].top;
    }

    // Get Involved ends where Events starts (if events exists)
    if (sections[3].element) {
      sections[2].bottom = sections[3].top;
      // Events ends at bottom of page
      sections[3].bottom = document.body.scrollHeight;
    } else {
      // If no events section, Get Involved goes to bottom
      sections[2].bottom = document.body.scrollHeight;
    }
  }

  // Initial calculation
  updateSectionBoundaries();

  // Track current section to avoid unnecessary updates
  let currentSectionId = null;

  // Fast scroll handler with minimal processing
  function handleScroll() {
    requestAnimationFrame(() => {
      // Get current scroll position using viewport midpoint
      const scrollPosition = window.pageYOffset + window.innerHeight / 2;

      // Find the active section
      let activeSection = sections[0]; // Default to intro

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (!section.element && section.id !== 'intro') continue; // Skip missing sections (except intro which is always valid)

        // Check if we're within this section's boundaries
        if (scrollPosition >= section.top && scrollPosition < section.bottom) {
          activeSection = section;
          break;
        }
      }

      // Only update if the section has changed
      if (currentSectionId !== activeSection.id) {
        currentSectionId = activeSection.id;

        // Update nav links
        pageNav.querySelectorAll("a").forEach((link) => link.classList.remove("active"));
        if (activeSection.link) {
          activeSection.link.classList.add("active");
        }

        // Update title with no delay
        updateActiveTitle(activeSection.title);
      }
    });
  }

  // Use no debounce to ensure immediate response
  window.removeEventListener("scroll", handleScroll);
  window.addEventListener("scroll", handleScroll);

  // Update boundaries on resize with more aggressive recalculation
  const handleResize = debounce(() => {
    document.body.offsetHeight; // Force reflow
    updateSectionBoundaries();
    requestAnimationFrame(() => {
      updateSectionBoundaries();
      handleScroll();
    });
  }, 150);

  window.addEventListener("resize", handleResize);

  window.addEventListener("orientationchange", () => {
    setTimeout(() => {
      handleResize();
    }, 300);
  });

  const initializeNavigation = () => {
    updateSectionBoundaries();
    handleScroll();
  };

  initializeNavigation();
  setTimeout(initializeNavigation, 500);

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(initializeNavigation);
  }

  let hasScrolled = false;
  const oneTimeScrollHandler = () => {
    if (!hasScrolled) {
      hasScrolled = true;
      updateSectionBoundaries();
      window.removeEventListener("scroll", oneTimeScrollHandler);
    }
  };
  window.addEventListener("scroll", oneTimeScrollHandler);
}
