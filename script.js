document.addEventListener('DOMContentLoaded', () => {
    const envelope = document.querySelector('.envelope');
    const popup = document.getElementById('message-popup');
    const closeButton = document.getElementById('close-popup');
    let isOpen = false;

    envelope.addEventListener('click', () => {
        if (!isOpen) {
            envelope.classList.add('open');
            isOpen = true;
            
            // Show popup after envelope animation
            setTimeout(() => {
                popup.classList.add('active');
            }, 1000);
        }
    });

    closeButton.addEventListener('click', () => {
        popup.classList.remove('active');
        envelope.classList.remove('open');
        isOpen = false;
    });

    // Close popup when clicking outside
    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            popup.classList.remove('active');
            envelope.classList.remove('open');
            isOpen = false;
        }
    });
}); 