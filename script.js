document.addEventListener('DOMContentLoaded', () => {
    const envelope = document.querySelector('.envelope');
    const popup = document.getElementById('message-popup');
    const closeButton = document.getElementById('close-popup');
    const popupMessage = popup.querySelector('p');
    
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

    // Handle envelope click
    envelope.addEventListener('click', () => {
        const messages = [
            "You're amazing! ✨",
            "Keep shining! 🌟",
            "You make the world better! 🌍",
            "Stay awesome! 💫",
            "You're one of a kind! 💝"
        ];
        
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        popupMessage.textContent = randomMessage;
        
        popup.classList.remove('hidden');
        popup.classList.add('opacity-100');
        
        // Add entrance animation to popup content
        const popupContent = popup.querySelector('.popup-content');
        popupContent.classList.add('scale-100', 'opacity-100');
    });

    // Handle popup close
    closeButton.addEventListener('click', () => {
        popup.classList.add('opacity-0');
        const popupContent = popup.querySelector('.popup-content');
        popupContent.classList.add('scale-95', 'opacity-0');
        
        setTimeout(() => {
            popup.classList.add('hidden');
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
    `;
    document.head.appendChild(style);
});