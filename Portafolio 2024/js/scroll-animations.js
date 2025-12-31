// Enhanced scroll animation that works in both directions
document.addEventListener('DOMContentLoaded', () => {
    // Function to check if element is in viewport
    const isInViewport = (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.9 &&
            rect.bottom >= 0
        );
    };

    // Add fade-in class to all elements that should fade in
    const fadeElements = document.querySelectorAll('.project, .project-info');
    
    // Function to handle fade in/out
    const handleFade = () => {
        fadeElements.forEach(element => {
            if (isInViewport(element)) {
                // Always add visible class when in viewport
                element.classList.add('visible');
                // Remove the fade-in class to reset the animation
                element.classList.remove('fade-in');
                // Force reflow to restart animation
                void element.offsetWidth;
                // Add fade-in class back to enable animation
                element.classList.add('fade-in');
            } else {
                // Remove visible class when out of viewport
                element.classList.remove('visible');
            }
        });
    };

    // Set initial state
    fadeElements.forEach(element => {
        element.classList.add('fade-in');
    });

    // Initial check
    handleFade();

    // Add scroll event listener
    window.addEventListener('scroll', handleFade, { passive: true });

    // Check again after a short delay
    setTimeout(handleFade, 500);

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(handleFade, 100);
    });
});
