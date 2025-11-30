// ========================================
// CONFIGURE POPUP TIMING HERE (in milliseconds)
// ========================================
const POPUP_DELAY = 3000; // 3000ms = 3 seconds
// Change this number:
// 1000 = 1 second
// 3000 = 3 seconds
// 5000 = 5 seconds
// 10000 = 10 seconds
// 0 = show immediately
// ========================================

// Show popup after delay
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const popup = document.getElementById('promoPopup');
        popup.classList.remove('hidden');
    }, POPUP_DELAY);
});

// Close popup function
function closePopup(event) {
    event.preventDefault();
    event.stopPropagation();
    const popup = document.getElementById('promoPopup');
    popup.classList.add('hidden');
}

// Close popup when clicking outside
document.getElementById('promoPopup').addEventListener('click', (event) => {
    if (event.target.id === 'promoPopup') {
        closePopup(event);
    }
});
