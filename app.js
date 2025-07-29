// Performance optimized car gallery
class CarGallery {
    constructor() {
        this.slides = document.querySelectorAll('.slide');
        this.loadedImages = new Set();
        this.init();
    }

    init() {
        // Preload the active slide image immediately
        this.loadActiveSlideImage();
        
        // Set up intersection observer for lazy loading
        this.setupLazyLoading();
        
        // Add event listeners with performance optimization
        this.addEventListeners();
    }

    addEventListeners() {
        // Use event delegation for better performance
        const container = document.querySelector('.container');
        container.addEventListener('click', this.handleSlideClick.bind(this));
        
        // Preload images on hover for instant switching
        container.addEventListener('mouseenter', this.handleMouseEnter.bind(this), true);
    }

    handleSlideClick(event) {
        const slide = event.target.closest('.slide');
        if (!slide) return;

        // Use requestAnimationFrame for smooth transitions
        requestAnimationFrame(() => {
            this.clearActiveClasses();
            slide.classList.add('active');
            this.loadSlideImage(slide);
        });
    }

    handleMouseEnter(event) {
        const slide = event.target.closest('.slide');
        if (slide && !this.loadedImages.has(slide)) {
            // Preload image on hover for instant switching
            this.loadSlideImage(slide);
        }
    }

    clearActiveClasses() {
        this.slides.forEach((slide) => {
            slide.classList.remove('active');
        });
    }

    loadActiveSlideImage() {
        const activeSlide = document.querySelector('.slide.active');
        if (activeSlide) {
            this.loadSlideImage(activeSlide);
        }
    }

    loadSlideImage(slide) {
        if (this.loadedImages.has(slide)) return;

        const bgUrl = slide.dataset.bg;
        if (!bgUrl) return;

        // Add loading state
        slide.classList.add('loading');

        // Create image element for preloading
        const img = new Image();
        
        img.onload = () => {
            // Image loaded successfully
            slide.style.backgroundImage = `url('${bgUrl}')`;
            slide.classList.remove('loading');
            this.loadedImages.add(slide);
        };

        img.onerror = () => {
            // Handle error gracefully
            slide.classList.remove('loading');
            console.warn(`Failed to load image: ${bgUrl}`);
        };

        // Start loading
        img.src = bgUrl;
    }

    setupLazyLoading() {
        // Use Intersection Observer for efficient lazy loading
        const options = {
            root: null,
            rootMargin: '50px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadSlideImage(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, options);

        // Observe all slides except the active one (already loaded)
        this.slides.forEach(slide => {
            if (!slide.classList.contains('active')) {
                observer.observe(slide);
            }
        });
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new CarGallery());
} else {
    new CarGallery();
}