// Show popup after 20 seconds
setTimeout(function() {
    const popup = document.getElementById('promoPopup');
    popup.classList.remove('hidden');
}, 20000);

function closePopup(event) {
    if (event) {
        event.stopPropagation(); // Prevent popup click when closing
    }
    const popup = document.getElementById('promoPopup');
    popup.classList.add('hidden');
}

function handlePopupClick(event) {
    // Only trigger if not clicking the close button
    if (!event.target.closest('.close-btn')) {
        // Add your link or action here
        window.location.href = 'https://your-deal-page.com';
        // OR use: window.open('https://your-deal-page.com', '_blank');
    }
}

// Close popup when clicking outside the promo box
document.getElementById('promoPopup').addEventListener('click', function(e) {
    if (e.target === this) {
        closePopup();
    }
});

// Close popup with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closePopup();
    }
});
