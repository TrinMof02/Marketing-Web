document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  // =================================================================
  // UTILITY FUNCTIONS
  // =================================================================

  /**
   * Debounces a function to limit the rate at which it gets called.
   * @param {Function} func The function to debounce.
   * @param {number} wait The delay in milliseconds.
   * @returns {Function} The debounced function.
   */
  function debounce(func, wait = 15) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  // =================================================================
  // NAVIGATION
  // =================================================================

  // --- Smooth Scrolling for Anchor Links ---
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // --- Mobile Menu Toggle ---
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }

  // --- Active Navigation Link Highlighting on Scroll ---
  const sections = document.querySelectorAll("section[id]");
  const navLinkElements = document.querySelectorAll(".nav-links a");

  function highlightNavigation() {
    let currentSectionId = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (window.scrollY >= sectionTop - 150) {
        currentSectionId = section.getAttribute("id");
      }
    });

    navLinkElements.forEach((link) => {
      link.classList.remove("active");
      const linkHref = link.getAttribute("href");
      if (linkHref === `#${currentSectionId}`) {
        link.classList.add("active");
      }
    });
  }

  // =================================================================
  // ANIMATIONS & EFFECTS
  // =================================================================

  // --- Unified Intersection Observer for All Scroll Animations ---
const animationObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      // If the element is on screen
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      } 
      // If the element is NOT on screen
      else {
        entry.target.classList.remove("visible");
      }
    });
  },
  {
    threshold: 0.1, // Adjust if you want it to trigger sooner or later
    rootMargin: "0px 0px -100px 0px",
  }
);

// This part stays the same
const elementsToAnimate = document.querySelectorAll(
  ".scroll-animate, .about-card, .problem-item, .feature-card, .team-card"
);
elementsToAnimate.forEach((el) => animationObserver.observe(el));



  // --- Performant Parallax Effect for Hero Section ---
  const heroContent = document.querySelector(".hero-content");
  const heroScienceImage = document.querySelector(".hero-science-image");

  function handleHeroParallax() {
    const scrolled = window.pageYOffset;
    if (heroContent) {
      heroContent.style.transform = `translateY(${scrolled * 0.4}px)`;
      heroContent.style.opacity = Math.max(0, 1 - scrolled / 500);
    }
    if (heroScienceImage) {
        heroScienceImage.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
  }

  // --- Mouse-move Parallax Effect ---
  const atom = document.querySelector(".atom");
  const dnaHelix = document.querySelector(".dna-helix");
  
  function handleMouseMove(e) {
    const { clientX, clientY } = e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const moveX = (clientX - centerX) / 40;
    const moveY = (clientY - centerY) / 40;

    if (atom) atom.style.transform = `translate(${moveX}px, ${moveY}px)`;
    if (dnaHelix) dnaHelix.style.transform = `translate(${-moveX}px, ${-moveY}px)`;
  }
  
  // =================================================================
  // INTERACTIVITY
  // =================================================================
  
  // --- 3D Tilt Effect for Cards ---
  const tiltCards = document.querySelectorAll(".feature-card, .about-card");
  tiltCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 15;
      const rotateY = (centerX - x) / 15;
      
      // Note: This JS transform overrides the CSS hover transform.
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale(1)";
    });
  });

  // --- Technology Slider Controls ---
  const techTrack = document.querySelector(".tech-track");
  const leftArrow = document.querySelector(".slider-arrow-left");
  const rightArrow = document.querySelector(".slider-arrow-right");

  if (techTrack && leftArrow && rightArrow) {
    let scrollPosition = 0;
    const scrollAmount = 190; // Approx. width of item + gap

    const moveSlider = (direction) => {
      // Pause animation temporarily for manual control
      techTrack.style.animationPlayState = 'paused';
      scrollPosition += direction * scrollAmount;

      // Basic boundary checks
      const trackWidth = techTrack.scrollWidth / 2; // Since items are duplicated
      if (scrollPosition > 0) scrollPosition = -trackWidth;
      if (scrollPosition < -trackWidth) scrollPosition = 0;

      techTrack.style.transform = `translateX(${scrollPosition}px)`;
    };

    rightArrow.addEventListener("click", () => moveSlider(-1));
    leftArrow.addEventListener("click", () => moveSlider(1));

    // Resume animation when user is not interacting
    techTrack.addEventListener('mouseenter', () => techTrack.style.animationPlayState = 'paused');
    techTrack.addEventListener('mouseleave', () => techTrack.style.animationPlayState = 'running');
  }

  // =================================================================
  // EVENT LISTENERS
  // =================================================================

  // --- Optimized Scroll Listener ---
  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        handleHeroParallax();
        // The debounced function handles its own timing
        ticking = false;
      });
      ticking = true;
    }
  });

  // Use the debounced version for less critical scroll events
  window.addEventListener('scroll', debounce(highlightNavigation));
  
  // --- Mouse Move Listener ---
  window.addEventListener("mousemove", handleMouseMove);

  // =================================================================
  // INITIALIZATION & CONSOLE MESSAGES
  // =================================================================
  
  // --- Initial State Setup ---
  highlightNavigation(); // Run once on load to set the correct link

  // --- Console Message for Developers ---
  console.log(
    "%c👨‍💻 Top Tech Coders 👩‍💻",
    "font-size: 24px; font-weight: bold; color: #3b82f6;"
  );
  console.log(
    "%cBuilding the future of science education, one line of code at a time! 🚀",
    "font-size: 14px; color: #6366f1;"
  );
});