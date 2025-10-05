// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// NEW: Enhanced Scroll Animation Observer for alternating left/right animations
const scrollAnimationObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  }
);

// Observe all sections with scroll-animate class
const scrollAnimateSections = document.querySelectorAll(".scroll-animate");
scrollAnimateSections.forEach((section) => {
  scrollAnimationObserver.observe(section);
});

// Intersection Observer for individual animated elements
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

// Observe all animated elements
const animatedElements = document.querySelectorAll(
  ".about-card, .problem-item, .feature-card, .team-card, .contact-item"
);
animatedElements.forEach((el) => observer.observe(el));

// Active navigation link highlighting
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

function highlightNavigation() {
  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (window.scrollY >= sectionTop - 200) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").slice(1) === currentSection) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", highlightNavigation);

// Parallax effect for hero elements
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const heroContent = document.querySelector(".hero-content");
  const particles = document.querySelectorAll(".particle");
  const heroScienceImage = document.querySelector(".hero-science-image");

  if (heroContent) {
    heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
    heroContent.style.opacity = 1 - scrolled / 600;
  }

  // NEW: Parallax effect for the rotating science image
  if (heroScienceImage) {
    heroScienceImage.style.transform = `translateY(${-50 + scrolled * 0.3}%)`;
  }

  particles.forEach((particle, index) => {
    const speed = 0.3 + index * 0.1;
    particle.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// Add active class to navigation link based on current section
const navLinkElements = document.querySelectorAll(".nav-links a");
navLinkElements.forEach((link) => {
  link.addEventListener("click", function () {
    navLinkElements.forEach((l) => l.classList.remove("active"));
    this.classList.add("active");
  });
});

// Counter animation for statistics (if you want to add stats later)
function animateCounter(element, target, duration) {
  let start = 0;
  const increment = target / (duration / 16);

  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(start);
    }
  }, 16);
}

// Initialize animations when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Add visible class to hero content immediately
  const heroContent = document.querySelector(".hero-content");
  if (heroContent) {
    setTimeout(() => {
      heroContent.classList.add("visible");
    }, 100);
  }

  // Animate particles
  const particles = document.querySelectorAll(".particle");
  particles.forEach((particle, index) => {
    particle.style.animationDelay = `${index * 0.5}s`;
  });
});

// Add mouse parallax effect
document.addEventListener("mousemove", (e) => {
  const { clientX, clientY } = e;
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  const moveX = (clientX - centerX) / 50;
  const moveY = (clientY - centerY) / 50;

  const atom = document.querySelector(".atom");
  const dnaHelix = document.querySelector(".dna-helix");

  if (atom) {
    atom.style.transform = `translate(${moveX}px, ${moveY}px)`;
  }

  if (dnaHelix) {
    dnaHelix.style.transform = `translate(${-moveX}px, ${-moveY}px)`;
  }
});

// Scroll progress indicator
function updateScrollProgress() {
  const scrollTop =
    document.documentElement.scrollTop || document.body.scrollTop;
  const scrollHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const scrollPercentage = (scrollTop / scrollHeight) * 100;

  // You can use this to create a progress bar if needed
  // console.log(`Scroll progress: ${scrollPercentage.toFixed(2)}%`);
}

window.addEventListener("scroll", updateScrollProgress);

// Add stagger animation to team cards
const teamCards = document.querySelectorAll(".team-card");
teamCards.forEach((card, index) => {
  card.style.animationDelay = `${index * 0.1}s`;
});

// Add hover effect sound (optional - can be removed)
const cards = document.querySelectorAll(
  ".about-card, .feature-card, .problem-item"
);
cards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transition = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
  });
});

// Lazy loading for images (if you add real images later)
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        imageObserver.unobserve(img);
      }
    });
  });

  const images = document.querySelectorAll("img[data-src]");
  images.forEach((img) => imageObserver.observe(img));
}

// Mobile menu toggle (for responsive design)
function createMobileMenu() {
  if (window.innerWidth <= 768) {
    const nav = document.querySelector("nav");
    const navLinks = document.querySelector(".nav-links");

    if (!document.querySelector(".menu-toggle")) {
      const menuToggle = document.createElement("button");
      menuToggle.classList.add("menu-toggle");
      menuToggle.innerHTML = "☰";
      menuToggle.style.cssText = `
                display: block;
                background: none;
                border: none;
                color: #3b82f6;
                font-size: 2rem;
                cursor: pointer;
            `;

      menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
      });

      nav.querySelector(".nav-container").appendChild(menuToggle);
    }
  }
}

window.addEventListener("resize", createMobileMenu);
createMobileMenu();

// 3D tilt effect for cards
function addTiltEffect() {
  const cards = document.querySelectorAll(
    ".feature-card, .about-card, .contact-item"
  );

  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform =
        "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";
    });
  });
}

addTiltEffect();

// Scroll reveal animation
function scrollReveal() {
  const reveals = document.querySelectorAll(
    ".about-card, .problem-item, .feature-card, .team-card, .contact-item"
  );

  reveals.forEach((element) => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      element.classList.add("active");
    }
  });
}

window.addEventListener("scroll", scrollReveal);

// Add ripple effect on button click
function createRipple(event) {
  const button = event.currentTarget;
  const circle = document.createElement("span");
  const diameter = Math.max(button.clientWidth, button.clientHeight);
  const radius = diameter / 2;

  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
  circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
  circle.classList.add("ripple");

  const ripple = button.getElementsByClassName("ripple")[0];
  if (ripple) {
    ripple.remove();
  }

  button.appendChild(circle);
}

const buttons = document.querySelectorAll(".cta-button, .social-btn");
buttons.forEach((button) => {
  button.addEventListener("click", createRipple);
});

// Add CSS for ripple effect dynamically
const style = document.createElement("style");
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .cta-button, .social-btn {
        position: relative;
        overflow: hidden;
    }
    
    .nav-links a.active {
        color: #3b82f6;
    }
    
    @media (max-width: 768px) {
        .nav-links {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(255, 255, 255, 0.98);
            flex-direction: column;
            padding: 2rem;
            gap: 1.5rem;
            border-top: 2px solid rgba(59, 130, 246, 0.3);
        }
        
        .nav-links.active {
            display: flex;
        }
        
        .menu-toggle {
            display: block !important;
        }
    }
`;
document.head.appendChild(style);

// Preloader (optional - can be added)
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

// Performance optimization: Debounce scroll events
function debounce(func, wait = 10, immediate = true) {
  let timeout;
  return function () {
    const context = this,
      args = arguments;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

const efficientScrollReveal = debounce(scrollReveal);
const efficientHighlightNav = debounce(highlightNavigation);

window.removeEventListener("scroll", scrollReveal);
window.removeEventListener("scroll", highlightNavigation);
window.addEventListener("scroll", efficientScrollReveal);
window.addEventListener("scroll", efficientHighlightNav);

// Console message for developers
console.log(
  "%c👨‍💻 Top Tech Coders 👩‍💻",
  "font-size: 24px; font-weight: bold; color: #3b82f6;"
);
console.log(
  "%cBuilding the future of science education, one line of code at a time! 🚀",
  "font-size: 14px; color: #6366f1;"
);
console.log(
  "%cInterested in our code? Check out our GitHub! 🐙",
  "font-size: 12px; color: #cbd5e1;"
);

// Initialize everything when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  console.log("🔬 Eskom Expo Hub Portfolio Loaded Successfully!");
  highlightNavigation();
  scrollReveal();
});
// Technology Slider Controls
const techTrack = document.querySelector(".tech-track");
const leftArrow = document.querySelector(".slider-arrow-left");
const rightArrow = document.querySelector(".slider-arrow-right");

if (techTrack && leftArrow && rightArrow) {
  let scrollPosition = 0;
  const scrollAmount = 220; // circle width + gap

  rightArrow.addEventListener("click", () => {
    techTrack.style.animation = "none";
    scrollPosition -= scrollAmount;
    techTrack.style.transform = `translateX(${scrollPosition}px)`;

    setTimeout(() => {
      techTrack.style.animation = "slideLeft 40s linear infinite";
    }, 500);
  });

  leftArrow.addEventListener("click", () => {
    techTrack.style.animation = "none";
    scrollPosition += scrollAmount;
    techTrack.style.transform = `translateX(${scrollPosition}px)`;

    setTimeout(() => {
      techTrack.style.animation = "slideLeft 40s linear infinite";
    }, 500);
  });
}
