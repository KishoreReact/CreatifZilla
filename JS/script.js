document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.carousel-container');
    const indicators = document.querySelectorAll('.indicator');
    let isDragging = false;
    let startX = 0;
    let currentTranslateX = 0;
    let prevTranslateX = 0;
    let currentIndex = 0;

    function updateIndicators() {
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === currentIndex);
        });
    }

    function handleMouseDown(event) {
        isDragging = true;
        startX = event.clientX || event.touches[0].clientX;
        container.style.cursor = 'grabbing'; // Change cursor to grabbing
    }

    function handleMouseMove(event) {
        if (!isDragging) return;
        const x = event.clientX || event.touches[0].clientX;
        const deltaX = x - startX;
        container.style.transform = `translateX(${prevTranslateX + deltaX}px)`;
    }

    function handleMouseUp(event) {
        if (!isDragging) return;
        isDragging = false;
        container.style.cursor = 'grab'; // Change cursor back to grab
        prevTranslateX += (event.clientX || event.changedTouches[0].clientX) - startX;
        const slideWidth = container.offsetWidth / indicators.length;
        const newIndex = Math.round(-prevTranslateX / slideWidth);
        currentIndex = Math.max(0, Math.min(indicators.length - 1, newIndex));
        container.style.transform = `translateX(${-currentIndex * slideWidth}px)`;
        updateIndicators();
    }

    container.addEventListener('mousedown', handleMouseDown);
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('mouseleave', handleMouseUp); // Handle case when mouse leaves container
    container.addEventListener('touchstart', handleMouseDown);
    container.addEventListener('touchmove', handleMouseMove);
    container.addEventListener('touchend', handleMouseUp);

    // Optional: Update indicators initially
    updateIndicators();
});
