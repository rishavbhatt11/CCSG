// Mobile Navigation Toggle
const hamburgerBtn = document.getElementById('hamburger-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (hamburgerBtn && mobileMenu) {
    hamburgerBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    const navItems = mobileMenu.querySelectorAll('a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        });
    });
}

// Fade-in Sections
const sections = document.querySelectorAll('.fade-in-section');

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2 // Trigger when 20% of the section is visible
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

// Partner Banks Carousel
const carouselContainer = document.querySelector('.carousel-container');
const carouselTrack = document.querySelector('.carousel-track');

if (carouselContainer && carouselTrack) {
    // Duplicate logos for seamless scrolling
    const logos = Array.from(carouselTrack.children);
    logos.forEach(logo => {
        const clone = logo.cloneNode(true);
        carouselTrack.appendChild(clone);
    });

    let isPaused = false;
    let animationFrameId;

    function animate() {
        if (!isPaused) {
            const currentTransform = new WebKitCSSMatrix(window.getComputedStyle(carouselTrack).transform);
            let position = currentTransform.m41;
            const speed = 0.5; // pixels per frame

            position -= speed;
            if (Math.abs(position) >= carouselTrack.scrollWidth / 2) {
                position = 0; // seamless reset
            }
            carouselTrack.style.transform = `translateX(${position}px)`;
        }
        animationFrameId = requestAnimationFrame(animate);
    }
    
    animate();

    // Pause carousel on hover and raise hovered logo
    const logoBoxes = document.querySelectorAll('.bank-logo-box');
    logoBoxes.forEach(box => {
        box.addEventListener('mouseenter', () => {
            isPaused = true;
            box.style.transform = 'translateY(-10px)';
        });
        box.addEventListener('mouseleave', () => {
            isPaused = false;
            box.style.transform = 'translateY(0)';
            animate(); // Restart animation
        });
    });
}