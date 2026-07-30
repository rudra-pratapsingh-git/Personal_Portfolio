document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Reveal sections on scroll
    const sections = document.querySelectorAll('.section');
    const revealSection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    };

    const sectionObserver = new IntersectionObserver(revealSection, {
        root: null,
        threshold: 0.15,
    });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Hide/Show navbar on scroll
    let lastScroll = 0;
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll <= 0) {
            navbar.style.boxShadow = 'none';
        } else {
            navbar.style.boxShadow = '0 10px 30px -10px rgba(2,12,27,0.7)';
        }

        if (currentScroll > lastScroll && currentScroll > 80) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        lastScroll = currentScroll;
    });

    // Parallax effect for shapes in hero section
    const heroShapes = document.querySelector('.hero-shapes');
    if (heroShapes) {
        document.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            heroShapes.style.transform = `translate(-${x * 30}px, -${y * 30}px)`;
        });
    }
});
