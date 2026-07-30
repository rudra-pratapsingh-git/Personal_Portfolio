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

    // Scroll Progress Bar
    const scrollProgress = document.getElementById('scroll-progress');
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        scrollProgress.style.width = scrolled + '%';
    });

    // Real-Time Clock
    const clockElement = document.getElementById('live-clock');
    const updateClock = () => {
        const now = new Date();
        clockElement.textContent = now.toLocaleTimeString('en-US', { hour12: false }) + ' LOCAL';
    };
    setInterval(updateClock, 1000);
    updateClock();

    // Dynamic Greeting
    const greetingElement = document.getElementById('dynamic-greeting');
    const hour = new Date().getHours();
    let greetingText = 'Good evening, my name is';
    if (hour < 12) greetingText = 'Good morning, my name is';
    else if (hour < 18) greetingText = 'Good afternoon, my name is';
    greetingElement.textContent = greetingText;

    // Session Tracker
    const sessionTracker = document.getElementById('session-tracker');
    let sessionSeconds = 0;
    setInterval(() => {
        sessionSeconds++;
        const m = Math.floor(sessionSeconds / 60).toString().padStart(2, '0');
        const s = (sessionSeconds % 60).toString().padStart(2, '0');
        if (sessionTracker) {
            sessionTracker.innerHTML = `<span class="pulse-dot"></span> Session Active: ${m}:${s}`;
        }
    }, 1000);
});
