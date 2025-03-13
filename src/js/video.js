export function initVideo() {
    const videoElement = document.querySelector("#video video");
    const videoSection = document.querySelector("#video");
    
    if (!videoElement || !videoSection) return;
    
    // Get the correct video path based on environment
    const getVideoPath = (filename) => {
        // Check if we're in any production environment
        const pathname = window.location.pathname;
        const hostname = window.location.hostname;
        const isProd = pathname.includes('/150-lab/') || 
                      pathname.includes('/content/') || 
                      hostname.includes('acs.org');
        return isProd ? `/assets/video/${filename}` : `/video/${filename}`;
    };

    // Update video source with correct path
    const videoPath = getVideoPath('acs-150-compressed.mp4');
    console.log('Setting video source:', videoPath);
    videoElement.src = videoPath;
    
    // Add error event listener to check if the video file can be loaded
    videoElement.addEventListener('error', (e) => {
        console.error('Video loading error:', e);
        console.error('Video src:', videoElement.src);
        console.error('Video error code:', videoElement.error?.code);
        console.error('Video error message:', videoElement.error?.message);
    });

    // Add loadeddata event to ensure video is ready
    videoElement.addEventListener('loadeddata', () => {
        console.log('Video data loaded successfully');
        videoElement.style.opacity = '1';
        // Ensure video starts paused
        videoElement.pause();
    });

    // Add loadedmetadata event to ensure video is ready
    videoElement.addEventListener('loadedmetadata', () => {
        console.log('Video metadata loaded successfully');
        // Force a layout recalculation
        videoElement.style.display = 'none';
        videoElement.offsetHeight; // Force reflow
        videoElement.style.display = '';
    });
    
    // Create overlay and play button
    const overlay = document.createElement('div');
    overlay.className = 'video-overlay';
    
    const playButton = document.createElement('div');
    playButton.className = 'play-button';
    
    overlay.appendChild(playButton);
    videoElement.parentNode.insertBefore(overlay, videoElement.nextSibling);
    
    // Function to fade audio
    const fadeAudio = (audioElement, targetVolume, duration = 1000) => {
        if (!audioElement) return;
        
        const startVolume = audioElement.volume;
        const startTime = performance.now();
        
        const fade = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Use exponential easing for more natural fade
            const easedProgress = progress * progress;
            audioElement.volume = startVolume + (targetVolume - startVolume) * easedProgress;
            
            if (progress < 1) {
                requestAnimationFrame(fade);
            }
        };
        
        requestAnimationFrame(fade);
    };

    // Function to pause video and show overlay
    const pauseVideoAndShowOverlay = () => {
        if (!videoElement.paused) {
            videoElement.pause();
            overlay.classList.remove('hidden');
            // Fade in background music
            if (window.backgroundAudio) {
                fadeAudio(window.backgroundAudio, 0.08);
            }
        }
    };
    
    // Handle play/pause
    const handlePlayPause = () => {
        if (videoElement.paused) {
            videoElement.play();
            overlay.classList.add('hidden');
            // Fade out background music and ensure video audio is playing
            if (window.backgroundAudio) {
                fadeAudio(window.backgroundAudio, 0);
            }
            videoElement.volume = 1;
        } else {
            pauseVideoAndShowOverlay();
        }
    };
    
    // Add click handlers
    overlay.addEventListener('click', handlePlayPause);
    videoElement.addEventListener('click', handlePlayPause);
    
    // Handle video end
    videoElement.addEventListener('ended', () => {
        overlay.classList.remove('hidden');
        // Fade in background music when video ends
        if (window.backgroundAudio) {
            fadeAudio(window.backgroundAudio, 0.08);
        }
    });
    
    // Handle video pause (when user clicks video controls)
    videoElement.addEventListener('pause', () => {
        overlay.classList.remove('hidden');
        // Fade in background music
        if (window.backgroundAudio) {
            fadeAudio(window.backgroundAudio, 0.08);
        }
    });

    // Create Intersection Observer to handle video visibility
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                // Video is out of view, pause it and show overlay
                pauseVideoAndShowOverlay();
            }
        });
    }, {
        threshold: 0.5 // Trigger when 50% of the video is out of view
    });

    // Start observing the video section
    observer.observe(videoSection);
}
