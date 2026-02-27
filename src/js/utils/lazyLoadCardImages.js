/**
 * Lazy load card background images and marquee image
 * Defers loading until elements are near viewport to improve initial load time
 */

export function initLazyCardImages() {
  // Lazy load card background images
  const cards = document.querySelectorAll('.sliding-card-row .card');
  
  if (cards.length) {
    // Use IntersectionObserver for efficient lazy loading
    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const card = entry.target;
          // Add attribute to trigger CSS background-image rules
          card.setAttribute('data-bg-loaded', 'true');
          cardObserver.unobserve(card);
        }
      });
    }, {
      // Load when card is within 400px of viewport
      rootMargin: '400px 0px',
      threshold: 0.01
    });

    cards.forEach(card => cardObserver.observe(card));
    console.log(`[lazyLoadCardImages] Observing ${cards.length} cards for lazy background loading`);
  }

  // Lazy load marquee image
  const marqueeImg = document.querySelector('.form-panel .animation-column img');
  
  if (marqueeImg) {
    const marqueeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const src = img.getAttribute('src');
          
          // Only load if not already loaded
          if (src && !img.complete) {
            // Create a new image to preload
            const preloader = new Image();
            preloader.onload = () => {
              img.style.opacity = '0'; // Keep opacity 0, marquee.js handles visibility
              console.log('[lazyLoadCardImages] Marquee image loaded');
            };
            preloader.src = src;
          }
          
          marqueeObserver.unobserve(img);
        }
      });
    }, {
      // Load when form panel is within 600px of viewport
      rootMargin: '600px 0px',
      threshold: 0.01
    });

    marqueeObserver.observe(marqueeImg);
    console.log('[lazyLoadCardImages] Observing marquee image for lazy loading');
  }
}
