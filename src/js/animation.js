import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";

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

export function initAnimations() {
  var fast = 0.18;
  var mediumFast = 0.24;
  var medium = 0.44;
  var mediumSlow = 0.68;
  var slow = 0.84;

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
  document.querySelectorAll(".pin-top-top").forEach(function (el) {
    let wrapper = el.parentElement;
    ScrollTrigger.create({
      trigger: wrapper,
      start: "top top",
      end: "bottom bottom",
      pin: el,
      pinSpacing: false,
    });
  });

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

  // Fade out the span.years when #anniversary-area reaches the top of the viewport and fade in immediately on scroll back
  ScrollTrigger.create({
    trigger: "#anniversary-area",
    start: "top top",
    onEnter: () => {
      gsap.to(".years", { opacity: 0, duration: 0.3, ease: "none" });
    },
    onLeaveBack: () => {
      gsap.to(".years", { opacity: 1, duration: 0.3, ease: "none" });
    },
  });

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
}
