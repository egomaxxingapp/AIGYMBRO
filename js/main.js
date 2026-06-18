// AIGymBro Website Interactive Controller

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header");
  const navLinks = document.querySelectorAll("nav a");
  const mobileToggle = document.getElementById("mobileToggle");
  const navMenu = document.getElementById("navMenu");

  // 1. Header scroll visual transformation
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
    
    // Update active link state based on scroll section
    updateActiveLink();
  });

  // 2. Mobile Menu Toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener("click", () => {
      const isExpanded = navToggleExpanded();
      if (isExpanded) {
        navMenu.style.display = "none";
        mobileToggle.innerHTML = "☰";
      } else {
        navMenu.style.display = "flex";
        navMenu.style.flexDirection = "column";
        navMenu.style.position = "absolute";
        navMenu.style.top = "70px";
        navMenu.style.left = "0";
        navMenu.style.width = "100%";
        navMenu.style.backgroundColor = "rgba(13, 13, 21, 0.98)";
        navMenu.style.borderBottom = "1px solid var(--card-border)";
        navMenu.style.padding = "20px 0";
        navMenu.style.gap = "16px";
        mobileToggle.innerHTML = "✕";
      }
    });
  }

  function navToggleExpanded() {
    return mobileToggle.innerHTML === "✕";
  }

  // 3. Update active nav link based on scroll position
  function updateActiveLink() {
    let scrollPosition = window.scrollY + 120;
    
    // Only query section offsets if we are on the landing page
    const sections = ["features", "tech"];
    let currentActive = null;

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        const offsetTop = el.offsetTop;
        const offsetHeight = el.offsetHeight;
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          currentActive = id;
        }
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      const href = link.getAttribute("href");
      if (href && href.includes(currentActive)) {
        link.classList.add("active");
      }
    });
  }

  // Trigger once on load
  updateActiveLink();
});
