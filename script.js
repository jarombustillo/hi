document.addEventListener('DOMContentLoaded', () => {
    const envelope = document.querySelector('.envelope');
    const popup = document.getElementById('message-popup');
    const closeButton = document.getElementById('close-popup');
    const video = document.getElementById('anniversary-video');
    const nextButton = document.getElementById('next-slide');
    const prevButton = document.getElementById('prev-slide');
    const slide1 = document.getElementById('slide-1');
    const slide2 = document.getElementById('slide-2');
    
    // Add video error handling
    video.addEventListener('error', (e) => {
        console.error('Video Error:', video.error);
        alert('There was an error loading the video. Please try again.');
    });

    // Add video loading handling
    video.addEventListener('loadeddata', () => {
        console.log('Video loaded successfully');
    });

    // Add sparkle effect to envelope
    const createSparkle = () => {
        const sparkle = document.createElement('div');
        sparkle.className = 'absolute w-2 h-2 bg-yellow-400 rounded-full animate-sparkle';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        envelope.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, 1000);
    };

    // Create sparkles periodically
    setInterval(createSparkle, 2000);

    // Add hover effect for envelope
    envelope.addEventListener('mouseenter', () => {
        envelope.classList.add('scale-105');
        envelope.classList.add('shadow-3xl');
    });

    envelope.addEventListener('mouseleave', () => {
        envelope.classList.remove('scale-105');
        envelope.classList.remove('shadow-3xl');
    });

    // Function to reset popup state
    const resetPopupState = () => {
        const popupContent = popup.querySelector('.popup-content');
        popup.classList.remove('opacity-0');
        popup.classList.remove('hidden');
        popupContent.classList.remove('scale-95', 'opacity-0');
        popupContent.classList.add('scale-100', 'opacity-100');
        slide2.classList.add('hidden');
        slide1.classList.remove('hidden');
    };

    // Handle envelope click
    envelope.addEventListener('click', () => {
        // Add click animation
        envelope.style.transform = 'scale(1.1) rotate(5deg)';
        envelope.style.transition = 'transform 0.3s ease';
        
        // Reset animation after delay
        setTimeout(() => {
            envelope.style.transform = 'scale(1) rotate(0deg)';
        }, 300);

        // Show popup after animation
        setTimeout(() => {
            resetPopupState();
        }, 500);
    });

    // Handle next slide
    nextButton.addEventListener('click', () => {
        slide1.classList.add('hidden');
        slide2.classList.remove('hidden');
        // Start playing the video
        video.play().catch(error => {
            console.error('Error playing video:', error);
            alert('There was an error playing the video. Please try again.');
        });
    });

    // Handle previous slide
    prevButton.addEventListener('click', () => {
        slide2.classList.add('hidden');
        slide1.classList.remove('hidden');
        // Pause and reset the video
        video.pause();
        video.currentTime = 0;
    });

    // Handle popup close
    closeButton.addEventListener('click', () => {
        // Pause the video
        video.pause();
        video.currentTime = 0;
        
        // Add closing animations
        popup.classList.add('opacity-0');
        const popupContent = popup.querySelector('.popup-content');
        popupContent.classList.remove('scale-100', 'opacity-100');
        popupContent.classList.add('scale-95', 'opacity-0');
        
        // Hide popup after animation
        setTimeout(() => {
            popup.classList.add('hidden');
            // Remove the closing animations so it can open properly next time
            popup.classList.remove('opacity-0');
            popupContent.classList.remove('scale-95', 'opacity-0');
        }, 300);
    });

    // Add some CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes sparkle {
            0% { transform: scale(0) rotate(0deg); opacity: 0; }
            50% { transform: scale(1) rotate(180deg); opacity: 1; }
            100% { transform: scale(0) rotate(360deg); opacity: 0; }
        }
        .animate-sparkle {
            animation: sparkle 1s ease-in-out forwards;
        }
        .shadow-3xl {
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
        .slide {
            transition: all 0.3s ease-in-out;
        }
        .video-frame {
            box-shadow: 0 0 30px rgba(139, 92, 246, 0.2);
            padding: 1rem;
            background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
            backdrop-filter: blur(10px);
            border-radius: 1rem;
        }
        .video-container {
            box-shadow: inset 0 0 20px rgba(0,0,0,0.1);
            border: 1px solid rgba(139, 92, 246, 0.2);
            position: relative;
            z-index: 20;
        }
        .video-container video {
            position: relative;
            z-index: 21;
            pointer-events: auto;
        }
        .video-container .absolute {
            pointer-events: none;
        }
        .popup {
            transition: opacity 0.3s ease-in-out;
        }
        .popup-content {
            transition: all 0.3s ease-in-out;
        }
    `;
    document.head.appendChild(style);
});