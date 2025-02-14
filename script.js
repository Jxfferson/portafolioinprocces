// Import particles.js library.  This assumes particles.js is available via a CDN or has been included in your project.
// If using a local file, adjust the path accordingly.  For example: import particlesJS from './particles.js';

document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("themeToggle")
  const themeIcon = themeToggle.querySelector(".theme-icon")
  const themeText = themeToggle.querySelector(".theme-text")

  // Particles.js configuration
  const particlesConfig = {
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
          value_area: 800,
        },
      },
      color: {
        value: "#ffffff",
      },
      shape: {
        type: "circle",
        stroke: {
          width: 0,
          color: "#000000",
        },
      },
      opacity: {
        value: 0.5,
        random: false,
      },
      size: {
        value: 3,
        random: true,
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#ffffff",
        opacity: 0.4,
        width: 1,
      },
      move: {
        enable: true,
        speed: 2,
        direction: "none",
        random: false,
        straight: false,
        out_mode: "out",
        bounce: false,
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: true,
          mode: "repulse",
        },
        onclick: {
          enable: true,
          mode: "push",
        },
        resize: true,
      },
    },
    retina_detect: true,
  }

  // Initialize particles.js  (Assuming particlesJS is a globally available function from the particles.js library)
  particlesJS("particles-js", particlesConfig)

  // Function to update particles color based on theme
  function updateParticlesColor(theme) {
    const color = theme === "dark" ? "#ffffff" : "#000000"
    window.pJSDom[0].pJS.particles.color.value = color
    window.pJSDom[0].pJS.particles.line_linked.color = color
    window.pJSDom[0].pJS.fn.particlesRefresh()
  }

  // Check for saved theme preference
  const savedTheme = localStorage.getItem("theme") || "dark"
  document.body.className = `${savedTheme}-theme`
  updateThemeToggle(savedTheme)
  updateParticlesColor(savedTheme)

  // Theme toggle functionality
  themeToggle.addEventListener("click", () => {
    const currentTheme = document.body.classList.contains("dark-theme") ? "dark" : "light"
    const newTheme = currentTheme === "dark" ? "light" : "dark"

    document.body.className = `${newTheme}-theme`
    localStorage.setItem("theme", newTheme)
    updateThemeToggle(newTheme)
    updateParticlesColor(newTheme)
  })

  function updateThemeToggle(theme) {
    themeIcon.textContent = theme === "dark" ? "🌙" : "☀️"
    themeText.textContent = `${theme === "dark" ? "Dark" : "Light"} Mode`
  }

  // Intersection Observer for section animations
  const sections = document.querySelectorAll(".section")

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible")
        }
      })
    },
    {
      threshold: 0.1,
    },
  )

  sections.forEach((section) => {
    sectionObserver.observe(section)
  })

  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        const yOffset = -80 // Adjust this value based on your header height
        const y = targetSection.getBoundingClientRect().top + window.pageYOffset + yOffset

        window.scrollTo({ top: y, behavior: "smooth" })
      }
    })
  })

  // Contact form handling
  const contactForm = document.querySelector(".contact-form")
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()
      // Add your form submission logic here
      console.log("Form submitted")
    })
  }
})

