// Main JavaScript functionality
document.addEventListener("DOMContentLoaded", () => {
  // Mobile Navigation Toggle
  const hamburger = document.querySelector(".hamburger")
  const navMenu = document.querySelector(".nav-menu")

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active")
    navMenu.classList.toggle("active")
  })

  // Close mobile menu when clicking on a link
  document.querySelectorAll(".nav-menu a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active")
      navMenu.classList.remove("active")
    })
  })

  // Testimonial Carousel
  const testimonialSlides = document.querySelectorAll(".testimonial-slide")
  const navDots = document.querySelectorAll(".nav-dot")
  let currentSlide = 0

  function showSlide(index) {
    // Hide all slides
    testimonialSlides.forEach((slide) => {
      slide.classList.remove("active")
    })

    // Remove active class from all dots
    navDots.forEach((dot) => {
      dot.classList.remove("active")
    })

    // Show current slide and activate dot
    testimonialSlides[index].classList.add("active")
    navDots[index].classList.add("active")
  }

  // Auto-advance testimonials
  function nextSlide() {
    currentSlide = (currentSlide + 1) % testimonialSlides.length
    showSlide(currentSlide)
  }

  // Set up auto-advance
  setInterval(nextSlide, 5000)

  // Manual navigation
  navDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentSlide = index
      showSlide(currentSlide)
    })
  })

  // Scroll Animations (AOS-like functionality)
  function animateOnScroll() {
    const elements = document.querySelectorAll("[data-aos]")

    elements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top
      const elementVisible = 150

      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add("aos-animate")
      }
    })
  }

  // Initial check
  animateOnScroll()

  // Check on scroll
  window.addEventListener("scroll", animateOnScroll)

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  // Navbar background on scroll
  window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar")
    if (window.scrollY > 100) {
      navbar.style.background = "rgba(255, 248, 231, 0.98)"
      navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)"
    } else {
      navbar.style.background = "rgba(255, 248, 231, 0.95)"
      navbar.style.boxShadow = "none"
    }
  })

  // Add loading animation to buttons
  document.querySelectorAll(".btn").forEach((button) => {
    button.addEventListener("click", function (e) {
      // Add ripple effect
      const ripple = document.createElement("span")
      const rect = this.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)
      const x = e.clientX - rect.left - size / 2
      const y = e.clientY - rect.top - size / 2

      ripple.style.width = ripple.style.height = size + "px"
      ripple.style.left = x + "px"
      ripple.style.top = y + "px"
      ripple.classList.add("ripple")

      this.appendChild(ripple)

      setTimeout(() => {
        ripple.remove()
      }, 600)
    })
  })

  // Daily affirmation rotation
  const affirmations = [
    "I honor my natural rhythm. Balance guides my choices.",
    "Calm breath, calm mind. My doshas harmonize with ease.",
    "Nourishment is medicine. I choose foods that support my prakriti.",
    "Grounded in tradition, elevated by science. I thrive in balance.",
    "Every sip and bite is a step toward equilibrium."
  ]
  const affirmationEl = document.getElementById("daily-affirmation-text")
  if (affirmationEl) {
    let idx = 0
    setInterval(() => {
      idx = (idx + 1) % affirmations.length
      affirmationEl.style.transition = "opacity 300ms ease"
      affirmationEl.style.opacity = "0"
      setTimeout(() => {
        affirmationEl.textContent = affirmations[idx]
        affirmationEl.style.opacity = "1"
      }, 300)
    }, 6000)
  }
})

// Add CSS for ripple effect
const style = document.createElement("style")
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`
document.head.appendChild(style)
