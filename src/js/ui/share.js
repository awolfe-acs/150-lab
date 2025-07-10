// ui/share.js
// Share button and share panel functionality

import gsap from "gsap";

// Initialize share button overlap detection with events panel
export function initShareButtonOverlapDetection() {
  const shareButton = document.querySelector(".share-button-pinned");
  const eventsPanel = document.querySelector(".events-panel");

  if (!shareButton || !eventsPanel) {
    console.warn("Share button or events panel not found for overlap detection");
    return;
  }

  // Function to check if elements overlap
  const checkOverlap = () => {
    const shareRect = shareButton.getBoundingClientRect();
    const eventsRect = eventsPanel.getBoundingClientRect();

    // Check if rectangles overlap
    const isOverlapping = !(
      shareRect.right < eventsRect.left ||
      shareRect.left > eventsRect.right ||
      shareRect.bottom < eventsRect.top ||
      shareRect.top > eventsRect.bottom
    );

    // Update background color based on overlap
    if (isOverlapping) {
      shareButton.style.backgroundColor = "#14b500";
    } else {
      shareButton.style.backgroundColor = ""; // Reset to default
    }
  };

  // Create a throttled version of checkOverlap for better performance
  let ticking = false;
  const throttledCheckOverlap = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        checkOverlap();
        ticking = false;
      });
      ticking = true;
    }
  };

  // Check overlap on scroll
  window.addEventListener("scroll", throttledCheckOverlap);

  // Check overlap on resize
  window.addEventListener("resize", throttledCheckOverlap);

  // Initial check
  checkOverlap();

  // Store cleanup function for potential use
  window.cleanupShareButtonOverlap = () => {
    window.removeEventListener("scroll", throttledCheckOverlap);
    window.removeEventListener("resize", throttledCheckOverlap);
    // Reset button background
    if (shareButton) {
      shareButton.style.backgroundColor = "";
    }
  };
}

// Initialize share panel functionality with gooey animation
export function initSharePanel() {
  const shareButton = document.querySelector(".share-button-pinned");

  if (!shareButton) {
    console.warn("Share button not found for share panel initialization");
    return;
  }

  // Create share panel HTML structure
  const sharePanel = document.createElement("div");
  sharePanel.className = "share-panel";
  sharePanel.innerHTML = `
    <div class="share-panel-content">
      <div class="share-panel-title">#ACS150</div>
      <button class="share-option facebook" data-platform="facebook">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="white"/>
        </svg>
        <span>Facebook</span>
      </button>
      <button class="share-option linkedin" data-platform="linkedin">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" fill="white"/>
        </svg>
        <span>LinkedIn</span>
      </button>
      <button class="share-option instagram" data-platform="instagram">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" fill="white"/>
        </svg>
        <span>Instagram</span>
      </button>
      <button class="share-option copy" data-platform="copy">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" fill="white"/>
        </svg>
        <span>Copy Link</span>
      </button>
    </div>
  `;

  // Add panel to document body
  document.body.appendChild(sharePanel);

  // Initialize functionality
  initSharePanelBehavior(shareButton, sharePanel);
}

// Helper function to initialize share panel behavior
function initSharePanelBehavior(shareButton, sharePanel) {
  let isOpen = false;

  // Helper functions
  const getShareData = () => ({
    url: window.location.href,
    title: "American Chemical Society - 150 Years of Innovation",
    description: "Join us in celebrating 150 years of advancing chemistry and chemical sciences. #ACS150",
    hashtags: "ACS150,Chemistry,Science,Innovation",
  });

  const openShareUrl = (platform, data) => {
    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(data.url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(data.url)}`,
      instagram: `https://www.instagram.com/`, // Instagram doesn't support direct URL sharing
    };

    if (urls[platform]) {
      window.open(urls[platform], "_blank", "width=600,height=400");
    }
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      console.error("Failed to copy text: ", err);
      return false;
    }
  };

  const showCopyFeedback = (message) => {
    const feedback = document.createElement("div");
    feedback.textContent = message;
    feedback.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 12px 24px;
      border-radius: 8px;
      z-index: 100000;
      font-size: 14px;
      pointer-events: none;
    `;
    document.body.appendChild(feedback);

    setTimeout(() => {
      feedback.remove();
    }, 2000);
  };

  const togglePanel = () => {
    isOpen = !isOpen;
    sharePanel.classList.toggle("active", isOpen);
    shareButton.classList.toggle("active", isOpen);
  };

  const closePanel = () => {
    if (isOpen) {
      isOpen = false;
      sharePanel.classList.remove("active");
      shareButton.classList.remove("active");
    }
  };

  // Event listeners
  shareButton.addEventListener("click", (e) => {
    e.stopPropagation();
    togglePanel();
  });

  // Handle share option clicks
  sharePanel.addEventListener("click", (e) => {
    const shareOption = e.target.closest(".share-option");
    if (!shareOption) return;

    const platform = shareOption.dataset.platform;
    const data = getShareData();

    if (platform === "copy") {
      copyToClipboard(data.url).then((success) => {
        if (success) {
          showCopyFeedback("Link copied to clipboard!");
        } else {
          showCopyFeedback("Failed to copy link");
        }
      });
    } else {
      openShareUrl(platform, data);
    }

    closePanel();
  });

  // Close panel when clicking outside
  document.addEventListener("click", (e) => {
    if (!sharePanel.contains(e.target) && !shareButton.contains(e.target)) {
      closePanel();
    }
  });

  // Close panel on escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closePanel();
    }
  });

  // Add styles
  if (!document.querySelector("#share-panel-styles")) {
    const style = document.createElement("style");
    style.id = "share-panel-styles";
    style.textContent = `
      .share-panel {
        position: fixed;
        bottom: 80px;
        right: 20px;
        z-index: 99998;
        opacity: 0;
        visibility: hidden;
        transform: translateY(20px) scale(0.8);
        transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        pointer-events: none;
      }

      .share-panel.active {
        opacity: 1;
        visibility: visible;
        transform: translateY(0) scale(1);
        pointer-events: auto;
      }

      .share-panel-content {
        background: rgba(0, 0, 0, 0.36);
        backdrop-filter: blur(20px);
        border-radius: 24px;
        padding: 16px;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        border: 1px solid rgba(255, 255, 255, 0.1);
        position: relative;
        overflow: hidden;
      }

      .share-panel-title {
        text-align: center;
        color: white;
        font-size: 16px;
        font-weight: 400;
        margin-bottom: 8px;
        letter-spacing: 3px;
        font-style: italic;
      }

      .share-option {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 16px;
        border-radius: 16px;
        cursor: pointer;
        transition: all 0.3s ease;
        color: white;
        font-size: 14px;
        font-weight: 500;
        margin-bottom: 8px;
        border: none;
        background: transparent;
        width: 100%;
        text-align: left;
      }

      .share-option:last-child {
        margin-bottom: 0;
      }

      .share-option:hover {
        background: rgba(255, 255, 255, 0.1);
        transform: translateX(-2px);
      }

      .share-option svg {
        flex-shrink: 0;
      }
    `;
    document.head.appendChild(style);
  }
}
