/* ========================================
   TOP DRINKS & EVENTOS - JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ---------- Preloader ----------
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => preloader.classList.add('loaded'), 1800);
    });
    setTimeout(() => preloader.classList.add('loaded'), 3000);

    // ---------- Particles ----------
    const particlesContainer = document.getElementById('particles');
    function createParticles() {
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 15 + 's';
            particle.style.animationDuration = (15 + Math.random() * 20) + 's';
            particle.style.width = (2 + Math.random() * 3) + 'px';
            particle.style.height = particle.style.width;
            if (Math.random() > 0.5) {
                particle.style.background = '#E60012';
            } else {
                particle.style.background = '#FFFFFF';
            }
            particlesContainer.appendChild(particle);
        }
    }
    createParticles();

    // ---------- Navbar ----------
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        navbar.classList.toggle('scrolled', scrollY > 80);
        backToTop.classList.toggle('visible', scrollY > 600);
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ---------- Mobile Nav ----------
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('open');
    });
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('open');
        });
    });

    // ---------- Scroll Animations ----------
    const animateElements = document.querySelectorAll('[data-animate]');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-delay') || 0;
                setTimeout(() => entry.target.classList.add('animated'), parseInt(delay));
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    animateElements.forEach(el => observer.observe(el));

    // ---------- Contact Form -> WhatsApp ----------
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const eventType = document.getElementById('eventType');
        const eventText = eventType.options[eventType.selectedIndex]?.text || '';
        const date = document.getElementById('date').value;
        const service = document.getElementById('service');
        const serviceText = service.options[service.selectedIndex]?.text || '';
        const guests = document.getElementById('guests').value;
        const message = document.getElementById('message').value;

        let text = `Olá! Vim pelo site da Top Drinks e gostaria de solicitar um orçamento.%0A%0A`;
        text += `*Nome:* ${name}%0A`;
        text += `*WhatsApp:* ${phone}%0A`;
        if (eventText && eventType.value) text += `*Tipo de Evento:* ${eventText}%0A`;
        if (date) text += `*Data:* ${date}%0A`;
        if (serviceText && service.value) text += `*Serviço:* ${serviceText}%0A`;
        if (guests) text += `*Convidados:* ${guests}%0A`;
        if (message) text += `*Detalhes:* ${message}%0A`;

        window.open(`https://wa.me/5547984013400?text=${text}`, '_blank');
    });

    // ---------- Smooth Scroll ----------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = navbar.offsetHeight + 20;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // ---------- Active Nav Link ----------
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY + 200;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            const link = document.querySelector(`.nav-menu a[href="#${id}"]`);
            if (link) {
                if (scrollY >= top && scrollY < top + height) {
                    document.querySelectorAll('.nav-menu a').forEach(a => a.classList.remove('active-link'));
                    link.classList.add('active-link');
                }
            }
        });
    });
});
