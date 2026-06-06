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

// LeetCode card — now wrapped in <a> tag, just add press animation
const leetcodeCard = document.getElementById('leetcode-card');
if (leetcodeCard) {
    leetcodeCard.addEventListener('mousedown', () => {
        leetcodeCard.style.transform = 'scale(0.98)';
    });
    leetcodeCard.addEventListener('mouseup', () => {
        leetcodeCard.style.transform = '';
    });
}

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

// ── Contact Form — Formspree submission ──
// SETUP (one-time, 2 minutes):
//   1. Go to https://formspree.io  →  Sign up with GitHub (free)
//   2. Click "New Form"  →  copy the Form ID  (looks like: xabc1234)
//   3. Replace YOUR_FORM_ID in this file with your actual Form ID
const FORMSPREE_ID = 'YOUR_FORM_ID'; // ← paste your Formspree form ID here

const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');
const submitBtn   = document.getElementById('submit-btn');

function showFormMsg(type, text) {
    formMessage.className = 'form-message ' + type;
    formMessage.innerHTML = (type === 'success')
        ? '<i class="fas fa-check-circle"></i> ' + text
        : '<i class="fas fa-exclamation-circle"></i> ' + text;
    formMessage.style.display = 'flex';
    if (type === 'success') {
        setTimeout(() => { formMessage.style.display = 'none'; }, 6000);
    }
}

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (FORMSPREE_ID === 'YOUR_FORM_ID') {
            showFormMsg('error', 'Contact form not set up yet. Please email me at srinivas280205@gmail.com');
            return;
        }

        // Loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

        try {
            const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
                method: 'POST',
                body: new FormData(contactForm),
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                showFormMsg('success', "Message sent! I'll get back to you soon.");
                contactForm.reset();
            } else {
                const data = await response.json();
                throw new Error(data.errors ? data.errors.map(e => e.message).join(', ') : 'Submission failed');
            }
        } catch (err) {
            showFormMsg('error', 'Something went wrong. Email me directly: srinivas280205@gmail.com');
            console.error('Form error:', err);
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        }
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

// ── PDF Certificate Renderer (pdf.js) ──
// Renders first page of a PDF onto a canvas — no scrollbar, full image shown
async function renderPDFCert(pdfPath, canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas || typeof pdfjsLib === 'undefined') return;

    try {
        pdfjsLib.GlobalWorkerOptions.workerSrc =
            'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

        const pdf      = await pdfjsLib.getDocument(pdfPath).promise;
        const page     = await pdf.getPage(1);
        const viewport = page.getViewport({ scale: 1 });

        // ── HiDPI / Retina fix ──
        // devicePixelRatio is 2 on Retina, 1.5 on some Windows screens, 1 on regular.
        // We render the canvas internally at 2x (or 1.5x) resolution,
        // then shrink it back to CSS display size — result is crisp, not blurry.
        const dpr            = window.devicePixelRatio || 1;
        const containerWidth = canvas.parentElement.clientWidth || 600;
        const cssScale       = containerWidth / viewport.width;         // scale to fit card
        const renderScale    = cssScale * dpr;                          // render at screen density
        const scaledViewport = page.getViewport({ scale: renderScale });

        // Internal canvas resolution = high-res
        canvas.width  = scaledViewport.width;
        canvas.height = scaledViewport.height;

        // CSS display size = normal size (browser scales it down — sharp result)
        canvas.style.width  = containerWidth + 'px';
        canvas.style.height = (scaledViewport.height / dpr) + 'px';

        await page.render({
            canvasContext: canvas.getContext('2d'),
            viewport: scaledViewport
        }).promise;

    } catch (err) {
        console.warn('PDF render failed for', canvasId, err);
        canvas.style.display = 'none';
        const fallback = document.createElement('a');
        fallback.href = pdfPath;
        fallback.target = '_blank';
        fallback.className = 'pdf-fallback-link';
        fallback.innerHTML = '<i class="fas fa-file-pdf"></i> View Certificate';
        canvas.parentElement.appendChild(fallback);
    }
}

// Render all PDF certs on page load
window.addEventListener('load', () => {
    renderPDFCert('infosys springboard internship certificate.pdf', 'canvas-infosys');
    renderPDFCert('cloud computing.pdf', 'canvas-cloud');
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




