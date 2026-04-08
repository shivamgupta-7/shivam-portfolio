/* =========================
   SCROLL REVEAL SYSTEM
========================= */

const revealElements = document.querySelectorAll(".reveal");

function revealOnScroll() {
  const triggerBottom = window.innerHeight * 0.85;

  revealElements.forEach((el) => {
    const rect = el.getBoundingClientRect();

    if (rect.top < triggerBottom) {
      el.classList.add("active");
    }
  });
}

/* =========================
   TIMELINE ANIMATION
========================= */

const timelineItems = document.querySelectorAll(".timeline-item");

function animateTimeline() {
  const triggerBottom = window.innerHeight * 0.85;

  timelineItems.forEach((item, index) => {
    const rect = item.getBoundingClientRect();

    if (rect.top < triggerBottom) {
      // stagger effect
      setTimeout(() => {
        item.classList.add("active");
      }, index * 120);
    }
  });
}

/* =========================
   NAV ACTIVE SCROLL (optional premium feel)
========================= */

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

function highlightNav() {
  let current = "";

  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();

    if (rect.top <= 150 && rect.bottom >= 150) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
}

/* =========================
   SMOOTH SCROLL (optional)
========================= */

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    const targetId = link.getAttribute("href");

    if (targetId.startsWith("#")) {
      e.preventDefault();

      document.querySelector(targetId).scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
});

/* =========================
   MAIN SCROLL HANDLER
========================= */

window.addEventListener("scroll", () => {
  revealOnScroll();
  animateTimeline();
  highlightNav();
});

/* run once on load */
window.addEventListener("load", () => {
  revealOnScroll();
  animateTimeline();
  highlightNav();
});