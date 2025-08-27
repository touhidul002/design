class ProductCarousel {
    constructor() {
        this.container = document.getElementById('productsGrid');
        this.navigation = document.getElementById('navigation');
        this.dotsContainer = document.getElementById('dotsContainer');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.cards = document.querySelectorAll('.product-card');
        this.currentIndex = 0;
        this.cardsPerView = this.getCardsPerView();
        this.totalPages = Math.ceil(this.cards.length / this.cardsPerView);
        
        this.init();
        this.setupEventListeners();
    }

    getCardsPerView() {
        const containerWidth = window.innerWidth;
        if (containerWidth < 480) return 1;
        if (containerWidth < 768) return 2;
        if (containerWidth < 800) return 3; // Changed from 1200 to 800
        return 4; // Always 4 at 800px and above
    }

    getCardWidth() {
        // Match the CSS: 200px card width + 8px gap = 208px per card
        return 208;
    }

    init() {
        this.createDots();
        this.updateNavigation();
        this.updateCarousel();
    }

    createDots() {
        this.dotsContainer.innerHTML = '';
        for (let i = 0; i < this.totalPages; i++) {
            const dot = document.createElement('div');
            dot.className = 'nav-dot';
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => this.goToPage(i));
            this.dotsContainer.appendChild(dot);
        }
    }

    updateNavigation() {
        const dots = this.dotsContainer.querySelectorAll('.nav-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });

        // Properly disable buttons
        this.prevBtn.disabled = this.currentIndex === 0;
        this.nextBtn.disabled = this.currentIndex === this.totalPages - 1;
        
        this.prevBtn.style.opacity = this.currentIndex === 0 ? '0.5' : '1';
        this.nextBtn.style.opacity = this.currentIndex === this.totalPages - 1 ? '0.5' : '1';
    }

    updateCarousel() {
        const cardWidth = this.getCardWidth();
        const offset = this.currentIndex * this.cardsPerView * cardWidth;
        this.container.style.transform = `translateX(-${offset}px)`;
    }

    goToPage(pageIndex) {
        if (pageIndex >= 0 && pageIndex < this.totalPages) {
            this.currentIndex = pageIndex;
            this.updateNavigation();
            this.updateCarousel();
        }
    }

    next() {
        if (this.currentIndex < this.totalPages - 1) {
            this.goToPage(this.currentIndex + 1);
        }
    }

    prev() {
        if (this.currentIndex > 0) {
            this.goToPage(this.currentIndex - 1);
        }
    }

    setupEventListeners() {
        this.prevBtn.addEventListener('click', () => this.prev());
        this.nextBtn.addEventListener('click', () => this.next());

        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                const newCardsPerView = this.getCardsPerView();
                if (newCardsPerView !== this.cardsPerView) {
                    this.cardsPerView = newCardsPerView;
                    this.totalPages = Math.ceil(this.cards.length / this.cardsPerView);
                    this.currentIndex = Math.min(this.currentIndex, this.totalPages - 1);
                    this.createDots();
                    this.updateNavigation();
                    this.updateCarousel();
                }
            }, 100); // Debounce resize events
        });

        // Touch/swipe support
        let startX = 0;
        let currentX = 0;
        let isDragging = false;

        this.container.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
        }, { passive: true });

        this.container.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            currentX = e.touches[0].clientX;
        }, { passive: true });

        this.container.addEventListener('touchend', () => {
            if (!isDragging) return;
            isDragging = false;
            
            const diff = startX - currentX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    this.next();
                } else {
                    this.prev();
                }
            }
        });

        // Hover effects
        this.cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-8px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ProductCarousel();
});
