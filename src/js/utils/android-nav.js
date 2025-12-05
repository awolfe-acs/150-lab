/**
 * Android Bottom Navigation / Chrome UI Detection
 * --------------------------------------------------
 * This version FIXES the mismatched coordinate systems issue
 * by placing the probe inside a fixed 100vh wrapper.
 *
 * This forces the probe to live in the SAME coordinate space as
 * your fixed UI elements (e.g., timeline scrubber), ensuring Chrome's
 * internal UI shifting is accurately measurable.
 *
 * Exports the CSS variable:
 *   --js-detected-nav-height: px
 */

export function adjustForAndroidNav() {
  if (!window.visualViewport) return;

  const getOrCreateProbe = () => {
    let wrapper = document.getElementById("android-nav-probe-wrapper");
    let probe = document.getElementById("android-nav-probe");

    if (!wrapper) {
      wrapper = document.createElement("div");
      wrapper.id = "android-nav-probe-wrapper";
      wrapper.style.cssText = `
        position: fixed;
        left: 0;
        top: 0;
        height: 100vh;
        width: 1px;
        pointer-events: none;
        visibility: hidden;
        z-index: -1;
      `;

      probe = document.createElement("div");
      probe.id = "android-nav-probe";
      probe.style.cssText = `
        position: absolute;
        bottom: 0;
        left: 0;
        height: 0;
        width: 1px;
      `;

      wrapper.appendChild(probe);
      document.body.appendChild(wrapper);
    }

    return probe;
  };

  const update = () => {
    const probe = getOrCreateProbe();

    const probeBottom = probe.getBoundingClientRect().bottom;
    const visibleBottom = window.visualViewport.height;

    // THIS is the accurate hidden area behind Android nav bar
    const obscured = Math.max(0, probeBottom - visibleBottom);

    document.documentElement.style.setProperty(
      "--js-detected-nav-height",
      `${obscured}px`
    );

    // console.log("[NavDetect] probe:", probeBottom, "vv:", visibleBottom, "obscured:", obscured);
  };

  update();

  window.visualViewport.addEventListener("resize", update);
  window.visualViewport.addEventListener("scroll", update);
  window.addEventListener("resize", update);

  // Orientation switch produces delayed viewport updates
  window.addEventListener("orientationchange", () => setTimeout(update, 120));
}

export function initAndroidNavAdjustments() {
  adjustForAndroidNav();
}
