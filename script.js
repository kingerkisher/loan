console.log("✅ script.js loaded successfully");

// ==============================
// NAVBAR SCROLL EFFECT & LOGO SWAP
// ==============================
window.addEventListener("scroll", handleScroll);
window.addEventListener("load", handleScroll);

function handleScroll() {
    const navbar = document.querySelector(".navbar");
    const scrollThreshold = 50;

    // Toggle navbar-scrolled class
    if (window.scrollY > scrollThreshold) {
        navbar.classList.add("navbar-scrolled");
    } else {
        navbar.classList.remove("navbar-scrolled");
    }

    // Highlight active nav link
    const sections = document.querySelectorAll("section[id]");
    const scrollPos = window.scrollY + navbar.offsetHeight + 5;

    sections.forEach(section => {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;
        const id = section.getAttribute("id");
        const navLink = document.querySelector(`.nav-link[href="#${id}"]`);

        if (scrollPos >= top && scrollPos < bottom) {
            document.querySelectorAll(".nav-link").forEach(link => link.classList.remove("active"));
            if (navLink) navLink.classList.add("active");
        }
    });

    // Animate elements in view
    animateElementsInView();
}

// ==============================
// SMOOTH SCROLL
// ==============================
document.querySelectorAll('.nav-link, .btn-hero, .btn-apply').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - document.querySelector(".navbar").offsetHeight,
                behavior: "smooth"
            });
        }
    });
});

// ==============================
// SCROLL ANIMATIONS
// ==============================
const animateElements = document.querySelectorAll('.animate-left, .animate-right');

function animateElementsInView() {
    const triggerBottom = window.innerHeight * 0.85;

    animateElements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;

        if (elementTop < triggerBottom && !el.classList.contains('in-view')) {
            // If text wrapper, stagger paragraphs
            if (el.classList.contains('animate-right')) {
                const paragraphs = el.querySelectorAll('.about-text, .section-title');
                paragraphs.forEach((p, i) => {
                    setTimeout(() => p.classList.add('in-view'), i * 200);
                });
            }
            el.classList.add('in-view'); // for image or single element
        }
    });
}

// Initial check
document.addEventListener("DOMContentLoaded", animateElementsInView);

const testimonials = document.querySelectorAll('.testimonial-card');
const indicatorsContainer = document.querySelector('.testimonial-indicators');

let currentIndex = 0;
const intervalTime = 5000;

// Create dots
testimonials.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
        showTestimonial(index);
        resetInterval();
    });
    indicatorsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

// Show testimonial by index
function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
        testimonial.classList.toggle('active', i === index);
        dots[i].classList.toggle('active', i === index);
    });
    currentIndex = index;
}

// Autoplay
let testimonialInterval = setInterval(() => {
    let nextIndex = (currentIndex + 1) % testimonials.length;
    showTestimonial(nextIndex);
}, intervalTime);

// Reset interval if user clicks dot
function resetInterval() {
    clearInterval(testimonialInterval);
    testimonialInterval = setInterval(() => {
        let nextIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(nextIndex);
    }, intervalTime);
}


