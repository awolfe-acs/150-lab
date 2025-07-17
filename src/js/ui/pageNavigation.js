// ui/pageNavigation.js
// Page navigation and section linking

import gsap from "gsap";
import debounce from "../utils/debounce.js";

export function updatePageNavigation() {
  const heroTravelArea = document.querySelector("#hero-travel-area");
  const getInvolvedSection = document.querySelector("#get-involved");
  const eventsSection = document.querySelector("#events");
  const videoTravelArea = document.querySelector("#video-travel-area");
  const pageNav = document.querySelector(".page-nav");
  const activeTitle = document.querySelector(".section-timeline .indicator .active-title");
  const sectionTimeline = document.querySelector(".section-timeline");
  const formPanel = document.querySelector(".form-panel");

  if (!heroTravelArea || !getInvolvedSection || !pageNav || !activeTitle || !sectionTimeline) return;

  // Initially hide the page navigation
  gsap.set(pageNav, { opacity: 0 });

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
      gsap.to(pageNav, { opacity: 1, duration: 0.3, ease: "power2.out" });
    }
  });

  sectionTimeline.addEventListener("mouseleave", () => {
    gsap.to(pageNav, { opacity: 0, duration: 0.3, ease: "power2.out" });
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

  const heroYearsLink = pageNav.querySelector(".anniversary");
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

  // Click handlers with immediate title updates and fresh position calculations
  heroYearsLink.addEventListener("click", (e) => {
    e.preventDefault();

    // Immediately update active title and links
    pageNav.querySelectorAll("a").forEach((link) => link.classList.remove("active"));
    heroYearsLink.classList.add("active");
    updateActiveTitle("150 Years of ACS");

    // Hide navigation and mark as clicked
    gsap.to(pageNav, { opacity: 0, duration: 0.2, ease: "power2.out" });
    navClickedAndHidden = true;

    // Always scroll to top for hero section
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  getInvolvedLink.addEventListener("click", (e) => {
    e.preventDefault();

    // Immediately update active title and links
    pageNav.querySelectorAll("a").forEach((link) => link.classList.remove("active"));
    getInvolvedLink.classList.add("active");
    updateActiveTitle("Get Involved");

    // Hide navigation and mark as clicked
    gsap.to(pageNav, { opacity: 0, duration: 0.2, ease: "power2.out" });
    navClickedAndHidden = true;

    // Calculate fresh scroll position for get-involved section
    if (getInvolvedSection) {
      // Add a small delay to ensure any ongoing animations have settled
      setTimeout(() => {
        const targetOffset = getElementScrollPosition(getInvolvedSection);
        window.scrollTo({
          top: targetOffset,
          behavior: "smooth",
        });
      }, 50);
    }
  });

  eventsLink.addEventListener("click", (e) => {
    e.preventDefault();

    // Immediately update active title and links
    pageNav.querySelectorAll("a").forEach((link) => link.classList.remove("active"));
    eventsLink.classList.add("active");
    updateActiveTitle("Events");

    // Hide navigation and mark as clicked
    gsap.to(pageNav, { opacity: 0, duration: 0.2, ease: "power2.out" });
    navClickedAndHidden = true;

    // Calculate fresh scroll position for events section
    if (eventsSection) {
      setTimeout(() => {
        const targetOffset = getElementScrollPosition(eventsSection);
        window.scrollTo({
          top: targetOffset,
          behavior: "smooth",
        });
      }, 50);
    }
  });

  // -------------------------
  // Scroll-based detection with improved performance
  // -------------------------

  // Calculate section boundaries once, storing their ranges
  const sections = [
    {
      id: "hero",
      element: heroTravelArea,
      title: "150 Years of ACS",
      link: heroYearsLink,
      top: 0,
      bottom: 0,
    },
    {
      id: "getinvolved",
      element: getInvolvedSection,
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
    sections.forEach((section) => {
      if (section.element) {
        // Use offsetTop for more reliable positioning
        section.top = getElementScrollPosition(section.element);
        section.bottom = section.top + section.element.offsetHeight;
      }
    });

    // Special adjustment: Hero section ends at the start of get-involved section
    if (sections[0].element && getInvolvedSection) {
      sections[0].bottom = getElementScrollPosition(getInvolvedSection);
    }

    // Get-involved section spans from its start to events section
    if (getInvolvedSection && eventsSection) {
      const getInvolvedSectionObj = sections.find((s) => s.id === "getinvolved");
      if (getInvolvedSectionObj) {
        getInvolvedSectionObj.top = getElementScrollPosition(getInvolvedSection);
        getInvolvedSectionObj.bottom = getElementScrollPosition(eventsSection);
      }
    }
  }

  // Initial calculation
  updateSectionBoundaries();

  // Track current section to avoid unnecessary updates
  let currentSectionId = null;

  // Fast scroll handler with minimal processing
  function handleScroll() {
    // We'll use requestAnimationFrame to limit how often we calculate
    // This will naturally throttle during rapid scrolling
    requestAnimationFrame(() => {
      // Get current scroll position using viewport midpoint
      const scrollPosition = window.pageYOffset + window.innerHeight / 2;

      // Find the active section using a reverse loop for efficiency
      // (most likely to be in later sections when scrolling down)
      let activeSection = sections[0]; // Default to hero

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (!section.element) continue;

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
    // Force a layout recalculation
    document.body.offsetHeight;

    // Update boundaries multiple times to ensure they're correct
    updateSectionBoundaries();

    // Use requestAnimationFrame to ensure DOM has settled
    requestAnimationFrame(() => {
      updateSectionBoundaries(); // Update again after layout settles
      handleScroll(); // Check current position after resize
    });
  }, 150);

  window.addEventListener("resize", handleResize);

  // Also handle orientation changes which might not trigger resize on all devices
  window.addEventListener("orientationchange", () => {
    setTimeout(() => {
      handleResize();
    }, 300); // Give more time for orientation change to complete
  });

  // Ensure proper initialization with multiple attempts
  const initializeNavigation = () => {
    updateSectionBoundaries();
    handleScroll();
  };

  // Initial call to set correct state
  initializeNavigation();

  // Also ensure proper initialization after a short delay to handle any late-loading content
  setTimeout(initializeNavigation, 500);

  // And after fonts are fully loaded (which can affect layout)
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(initializeNavigation);
  }

  // Add a one-time scroll event listener to recalculate on first scroll
  // (in case initial calculations were off due to loading states)
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
