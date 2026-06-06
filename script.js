// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar Background on Scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(26, 26, 26, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.backgroundColor = 'rgba(26, 26, 26, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
    }
});

// Active Navigation Link on Scroll
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Leetcode Card Click - Opens Leetcode Profile
const leetcodeCard = document.getElementById('leetcode-card');
leetcodeCard.addEventListener('click', () => {
    window.open('https://leetcode.com/RSrinivas155', '_blank');
});

// Add click animation to Leetcode card
leetcodeCard.addEventListener('mousedown', () => {
    leetcodeCard.style.transform = 'scale(0.98)';
});

leetcodeCard.addEventListener('mouseup', () => {
    leetcodeCard.style.transform = '';
});

// Project Cards - Click to open GitHub
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    const githubUrl = card.getAttribute('data-github');
    if (githubUrl) {
        card.addEventListener('click', (e) => {
            // Don't open if clicking on the link itself
            if (!e.target.closest('.project-link')) {
                window.open(githubUrl, '_blank');
            }
        });
    }
});

// Add ripple effect to project cards
projectCards.forEach(card => {
    card.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.skill-card, .project-card, .certificate-card, .stat-card, .contact-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Contact Form Submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Here you would typically send the data to a server
        // For now, we'll just show an alert
        alert(`Thank you ${name}! Your message has been received. I'll get back to you soon at ${email}.`);
        
        // Reset form
        contactForm.reset();
        
        // Add success animation
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        submitBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            submitBtn.style.transform = '';
        }, 200);
    });
}

// Add hover sound effect simulation (visual feedback)
document.querySelectorAll('.btn, .skill-card, .project-card, .certificate-card, .social-link').forEach(element => {
    element.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// Animate circular progress on scroll
const circularProgress = document.getElementById('circular-progress');
if (circularProgress) {
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate the progress circle
                const circle = entry.target.querySelector('.progress-ring-circle');
                const total = 382;
                const circumference = 2 * Math.PI * 65; // radius = 65
                const offset = circumference - (total / 1000) * circumference;
                
                circle.style.strokeDashoffset = offset;
                entry.target.style.opacity = '1';
            }
        });
    }, { threshold: 0.5 });
    
    progressObserver.observe(circularProgress);
}

// Typewriter for the greeting prefix only — preserves the highlight span
const animatedText = document.querySelector('.animated-text');
if (animatedText) {
    const highlightSpan = animatedText.querySelector('.highlight');
    const prefix = "Hi, I'm ";

    // Hide everything, then type just the prefix before revealing the name
    animatedText.innerHTML = '';
    animatedText.style.opacity = '1';

    let i = 0;
    const typeWriter = () => {
        if (i < prefix.length) {
            animatedText.innerHTML = prefix.slice(0, i + 1);
            i++;
            setTimeout(typeWriter, 60);
        } else {
            // Re-attach the original highlight span
            if (highlightSpan) animatedText.appendChild(highlightSpan);
        }
    };

    setTimeout(typeWriter, 500);
}



// Add active state to navigation links
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        navLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});

// Smooth reveal animation for section titles
const sectionTitles = document.querySelectorAll('.section-title');
sectionTitles.forEach(title => {
    const titleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            }
        });
    }, { threshold: 0.5 });
    
    titleObserver.observe(title);
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Console message
console.log('%c👋 Welcome to my Portfolio!', 'color: #ff6b35; font-size: 20px; font-weight: bold;');
console.log('%cFeel free to explore and check out my projects!', 'color: #4ecdc4; font-size: 14px;');

// --- IMAGE MODAL LOGIC ---

const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("fullImage");
const closeModal = document.querySelector(".close-modal");

// Get all images inside certificate cards
const certImages = document.querySelectorAll(".cert-image img");

certImages.forEach(img => {
    img.addEventListener("click", function() {
        modal.style.display = "block";
        modalImg.src = this.src; // Set modal image to clicked image
        
        // Disable scrolling on body when modal is open
        document.body.style.overflow = "hidden";
    });
});

// Close functionality
const closeImageModal = () => {
    modal.style.display = "none";
    // Re-enable scrolling
    document.body.style.overflow = "auto";
};

// Close when clicking the 'X'
closeModal.addEventListener("click", closeImageModal);

// Close when clicking anywhere outside the image (background)
modal.addEventListener("click", function(event) {
    if (event.target === modal) {
        closeImageModal();
    }
});

// Close when pressing Escape key
document.addEventListener("keydown", function(event) {
    if (event.key === "Escape" && modal.style.display === "block") {
        closeImageModal();
    }
});




