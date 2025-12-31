document.addEventListener('DOMContentLoaded', function() {
    // Initialize all sliders
    const sliderContainers = document.querySelectorAll('.slider-container');
    
    sliderContainers.forEach(container => {
        const slider = container.querySelector('.slider');
        const slides = slider.querySelectorAll('.slide');
        const prevBtn = container.querySelector('.left-arrow');
        const nextBtn = container.querySelector('.right-arrow');
        
        // Clone first and last slides for infinite effect
        const firstSlide = slides[0].cloneNode(true);
        const lastSlide = slides[slides.length - 1].cloneNode(true);
        
        // Add clones to the slider
        slider.appendChild(firstSlide);
        slider.insertBefore(lastSlide, slides[0]);
        
        // Set initial position to show the first real slide
        slider.style.transform = 'translateX(-100%)';
        
        // Track current slide (1 because we have a clone before first slide)
        let currentSlide = 1;
        const totalSlides = slides.length;
        
        // Function to move to a specific slide
        function goToSlide(index, instant = false) {
            if (instant) {
                slider.style.transition = 'none';
            } else {
                // Increased duration to 0.8s for smoother, slower movement
                slider.style.transition = 'transform 0.8s ease-in-out';
            }
            slider.style.transform = `translateX(-${index * 100}%)`;
            currentSlide = index;
        }
        
        // Handle next slide (moves to the right)
        function next() {
            if (currentSlide >= totalSlides + 1) {
                // If we're at the end, instantly jump to the first real slide
                goToSlide(1, true);
                // Then animate to the next slide
                setTimeout(() => goToSlide(2), 10);
            } else {
                goToSlide(currentSlide + 1);
            }
        }
        
        // Handle previous slide (moves to the left)
        function prev() {
            if (currentSlide <= 0) {
                // If we're at the start, instantly jump to the last real slide
                goToSlide(totalSlides, true);
                // Then animate to the previous slide
                setTimeout(() => goToSlide(totalSlides - 1), 10);
            } else {
                goToSlide(currentSlide - 1);
            }
        }
        
        // Auto-slide functionality
        let slideInterval;
        const AUTO_SLIDE_INTERVAL = 2500; // 2.5 seconds
        
        // Function to start auto-sliding
        function startAutoSlide() {
            stopAutoSlide(); // Clear any existing interval
            slideInterval = setInterval(next, AUTO_SLIDE_INTERVAL);
        }
        
        // Function to stop auto-sliding
        function stopAutoSlide() {
            if (slideInterval) {
                clearInterval(slideInterval);
                slideInterval = null;
            }
        }
        
        // Handle transition end to handle the infinite loop
        slider.addEventListener('transitionend', function() {
            if (currentSlide === 0) {
                // If we've gone before the first slide, jump to the last real slide
                goToSlide(totalSlides, true);
            } else if (currentSlide === totalSlides + 1) {
                // If we've gone past the last slide, jump to the first real slide
                goToSlide(1, true);
            }
        });
        
        // Event listeners for buttons
        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                next();
                // Reset auto-slide timer on manual navigation
                stopAutoSlide();
                startAutoSlide();
            });
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                prev();
                // Reset auto-slide timer on manual navigation
                stopAutoSlide();
                startAutoSlide();
            });
        }
        
        // Pause auto-slide on hover
        container.addEventListener('mouseenter', stopAutoSlide);
        container.addEventListener('mouseleave', startAutoSlide);
        
        // Start auto-sliding
        startAutoSlide();
        
        // Touch events for mobile
        let touchStartX = 0;
        let touchEndX = 0;
        
        slider.addEventListener('touchstart', e => {
            touchStartX = e.touches[0].clientX;
        }, { passive: true });
        
        slider.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].clientX;
            const swipeDiff = touchStartX - touchEndX;
            
            if (Math.abs(swipeDiff) > 50) { // Minimum swipe distance
                if (swipeDiff > 0) {
                    next(); // Swipe left
                } else {
                    prev(); // Swipe right
                }
            }
        }, { passive: true });
    });
    
    // Fade-in animation for projects as they come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    document.querySelectorAll('.project').forEach(project => {
        observer.observe(project);
    });
});