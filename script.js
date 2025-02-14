

document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("themeToggle")
  const themeIcon = themeToggle.querySelector(".theme-icon")
  const themeText = themeToggle.querySelector(".theme-text")

  // Particles.js configuración
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

  // Iniciamos particles.js  
  particlesJS("particles-js", particlesConfig)

  // Función para que las particulas cambien segun el tema escogido (oscuro o claro)
  function updateParticlesColor(theme) {
    const color = theme === "dark" ? "#ffffff" : "#000000"
    window.pJSDom[0].pJS.particles.color.value = color
    window.pJSDom[0].pJS.particles.line_linked.color = color
    window.pJSDom[0].pJS.fn.particlesRefresh()
  }

  // Aca se comprueba la "preferencia" del tema guardado
  const savedTheme = localStorage.getItem("theme") || "dark"
  document.body.className = `${savedTheme}-theme`
  updateThemeToggle(savedTheme)
  updateParticlesColor(savedTheme)

  // Funcionalidad al cambiar el tema
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

  // Observador que mira las intersecciones para las animaciones entre todas las secciones creadas
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

  // Para que al desplazar en enlaces se vea "fluido"
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        const yOffset = -80 
        const y = targetSection.getBoundingClientRect().top + window.pageYOffset + yOffset

        window.scrollTo({ top: y, behavior: "smooth" })
      }
    })
  })


  const contactForm = document.querySelector(".contact-form")
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()
      
      console.log("Form submitted")
    })
  }
})

