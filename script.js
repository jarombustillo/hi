document.addEventListener('DOMContentLoaded', () => {
    const envelope = document.querySelector('.envelope');
    const popup = document.getElementById('message-popup');
    const closeButton = document.getElementById('close-popup');
    const video = document.getElementById('anniversary-video');
    const nextButton = document.getElementById('next-slide');
    const prevButton = document.getElementById('prev-slide');
    const slide1 = document.getElementById('slide-1');
    const slide2 = document.getElementById('slide-2');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const closeLightbox = document.getElementById('close-lightbox');
    const closeCollage = document.getElementById('close-collage');
    const collageContainer = document.getElementById('collage-container');
    
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
            
            // Show collage
            showCollage();
        }, 300);
    });

    // Function to show collage
    function showCollage() {
        const collageGrid = collageContainer.querySelector('.collage-grid');
        const loveText = collageContainer.querySelector('.love-text');
        
        // Clear previous images
        collageGrid.innerHTML = '';
        
        // Show container
        collageContainer.classList.remove('hidden');
        
        // Heart shape coordinates (normalized to 0-1)
        const heartCoordinates = [
            // Left lobe
            { x: 0.2, y: 0.3 },
            { x: 0.1, y: 0.4 },
            { x: 0.2, y: 0.5 },
            { x: 0.3, y: 0.4 },
            // Right lobe
            { x: 0.8, y: 0.3 },
            { x: 0.9, y: 0.4 },
            { x: 0.8, y: 0.5 },
            { x: 0.7, y: 0.4 },
            // Bottom point
            { x: 0.5, y: 0.7 },
            { x: 0.5, y: 0.8 }
        ];
        
        // Create image elements in heart shape
        for (let i = 1; i <= 10; i++) {
            const img = document.createElement('img');
            img.src = `uploads/${i}.jpg`;
            img.className = 'collage-image w-32 h-32 sm:w-48 sm:h-48 object-cover rounded-lg shadow-lg transform transition-all duration-1000 cursor-pointer absolute';
            
            // Calculate position based on heart coordinates
            const coord = heartCoordinates[i - 1];
            const x = coord.x * 100;
            const y = coord.y * 100;
            
            img.style.opacity = '0';
            img.style.transform = `translate(${x}%, ${y}%) translate(-50%, -50%) rotate(${Math.random() * 20 - 10}deg)`;
            img.style.objectFit = 'cover';
            img.style.objectPosition = 'center';
            img.style.borderRadius = '0.5rem';
            img.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
            
            // Add click handler for lightbox
            img.addEventListener('click', () => {
                showLightbox(img.src, i);
            });
            
            collageGrid.appendChild(img);
            
            // Animate each image with a delay
            setTimeout(() => {
                img.style.opacity = '1';
                img.style.transform = `translate(${x}%, ${y}%) translate(-50%, -50%) rotate(0deg)`;
            }, i * 200);
        }
        
        // Show love text after images
        setTimeout(() => {
            loveText.style.opacity = '1';
        }, 2000);
    }

    // Lightbox functionality
    let currentImageIndex = 1;
    const totalImages = 10;

    function showLightbox(src, index) {
        currentImageIndex = index;
        lightboxImage.src = src;
        lightbox.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    function showNextImage() {
        currentImageIndex = (currentImageIndex % totalImages) + 1;
        lightboxImage.src = `uploads/${currentImageIndex}.jpg`;
    }

    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 2 + totalImages) % totalImages + 1;
        lightboxImage.src = `uploads/${currentImageIndex}.jpg`;
    }

    // Add lightbox navigation
    document.getElementById('next-image').addEventListener('click', showNextImage);
    document.getElementById('prev-image').addEventListener('click', showPrevImage);

    // Add touch swipe functionality
    let touchStartX = 0;
    let touchEndX = 0;

    lightboxImage.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    lightboxImage.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const swipeDistance = touchEndX - touchStartX;

        if (Math.abs(swipeDistance) > swipeThreshold) {
            if (swipeDistance > 0) {
                showPrevImage();
            } else {
                showNextImage();
            }
        }
    }

    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('hidden')) {
            if (e.key === 'ArrowRight') {
                showNextImage();
            } else if (e.key === 'ArrowLeft') {
                showPrevImage();
            }
        }
    });

    // Handle lightbox close
    closeLightbox.addEventListener('click', () => {
        lightbox.classList.add('hidden');
        document.body.style.overflow = ''; // Restore scrolling
    });

    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.add('hidden');
            document.body.style.overflow = ''; // Restore scrolling
        }
    });

    // Handle collage close
    closeCollage.addEventListener('click', () => {
        // Hide the collage container
        collageContainer.classList.add('hidden');
        
        // Reset any open lightbox
        lightbox.classList.add('hidden');
        
        // Reset the love text opacity
        const loveText = collageContainer.querySelector('.love-text');
        loveText.style.opacity = '0';
        
        // Reset all images
        const images = collageContainer.querySelectorAll('.collage-image');
        images.forEach(img => {
            img.style.opacity = '0';
            img.style.transform = 'translate(0, 0) rotate(0deg)';
        });
        
        // Restore scrolling
        document.body.style.overflow = '';
    });

    // Close collage with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (!lightbox.classList.contains('hidden')) {
                lightbox.classList.add('hidden');
                document.body.style.overflow = '';
            } else if (!collageContainer.classList.contains('hidden')) {
                // Hide the collage container
                collageContainer.classList.add('hidden');
                
                // Reset the love text opacity
                const loveText = collageContainer.querySelector('.love-text');
                loveText.style.opacity = '0';
                
                // Reset all images
                const images = collageContainer.querySelectorAll('.collage-image');
                images.forEach(img => {
                    img.style.opacity = '0';
                    img.style.transform = 'translate(0, 0) rotate(0deg)';
                });
                
                document.body.style.overflow = '';
            }
        }
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
        .collage-image {
            transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
            position: absolute;
            transform-origin: center;
        }
        .collage-image:hover {
            transform: scale(1.1) rotate(5deg) !important;
            z-index: 10;
        }
        .collage-grid {
            position: relative;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    `;
    document.head.appendChild(style);
});