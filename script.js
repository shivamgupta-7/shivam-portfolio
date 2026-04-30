/* ==========================================================================
   SCROLL REVEAL
   ---------------------------------------------------------------------------
   Makes elements with the class ".reveal" fade/slide into view as the user
   scrolls down the page.  Each element is observed once; when its top edge
   crosses 85 % of the viewport height the "active" class is added, which
   triggers the CSS transition defined in the stylesheet.
   ========================================================================== */

// Grab every element that should animate on scroll.
// These are collected once at load time so we don't re-query the DOM on every
// scroll event.
const revealElements = document.querySelectorAll(".reveal");

/**
 * revealOnScroll
 * Called on every scroll (and once on load).
 * For each ".reveal" element, checks whether it has scrolled into the
 * visible portion of the viewport (top < 85 % of window height).
 * If so, adds the "active" class to kick off the CSS animation.
 */
function revealOnScroll() {
  // 85 % of the viewport height — the "trigger line".
  const triggerBottom = window.innerHeight * 0.85;

  revealElements.forEach((el) => {
    // getBoundingClientRect().top gives the distance from the element's top
    // edge to the top of the viewport.  When it's less than triggerBottom the
    // element is considered "in view".
    if (el.getBoundingClientRect().top < triggerBottom) el.classList.add("active");
  });
}

/* ==========================================================================
   TIMELINE ANIMATION
   ---------------------------------------------------------------------------
   Animates the experience / education timeline.  Two things happen:
   1. The vertical spine line grows in (class "spine-active" on the timeline
      container).
   2. Each timeline item fades in with a staggered delay (120 ms between
      successive items) so they appear one after another.
   ========================================================================== */

// All individual timeline entries (cards / rows).
const timelineItems = document.querySelectorAll(".timeline-item");

// The timeline container(s) that carry the vertical spine line.
const timelines = document.querySelectorAll(".timeline.elite");

/**
 * animateTimeline
 * Called on every scroll (and once on load).
 * Activates the spine line and staggers the appearance of each timeline item.
 */
function animateTimeline() {
  // Same 85 % trigger line used by the reveal system.
  const triggerBottom = window.innerHeight * 0.85;

  // Activate the spine line once the timeline container scrolls into view.
  timelines.forEach((tl) => {
    if (tl.getBoundingClientRect().top < triggerBottom) tl.classList.add("spine-active");
  });

  // Stagger-reveal each timeline item.
  // The `index * 120` delay creates a cascading entrance effect.
  timelineItems.forEach((item, index) => {
    if (item.getBoundingClientRect().top < triggerBottom) {
      setTimeout(() => item.classList.add("active"), index * 120);
    }
  });
}

/* ==========================================================================
   NAV HIGHLIGHT + SHRINK
   ---------------------------------------------------------------------------
   Two responsibilities:
   • Highlights the nav link whose section is currently in the viewport
     (single-section "spy" approach).
   • Adds a "scrolled" class to the <nav> after the user scrolls past 50 px,
     which the CSS uses to shrink / add a backdrop to the navbar.
   ========================================================================== */

// Every <section> that has an id — these are the scroll-spy targets.
const sections = document.querySelectorAll("section[id]");

// Top-level nav links (used for the active-highlight toggle).
const navLinks = document.querySelectorAll("nav a");

// All navigable links including dropdown items (used for smooth-scroll binding).
const allNavLinks = document.querySelectorAll("nav a, .nav-dropdown a");

// The <nav> element itself (used for the "scrolled" shrink class).
const nav = document.querySelector("nav");

/**
 * highlightNav
 * Called on every scroll.
 * Determines which section is currently at the 150 px mark from the top of
 * the viewport and toggles the "active" class on the matching nav link.
 * Also toggles the "scrolled" class on the nav bar.
 */
function highlightNav() {
  let current = "";

  // Walk through each section; the last one whose top is ≤ 150 px and whose
  // bottom is ≥ 150 px "wins" as the current section.
  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= 150 && rect.bottom >= 150) current = section.getAttribute("id");
  });

  // Toggle the "active" class only on the link that matches the current section.
  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });

  // Shrink the nav bar once the user has scrolled past 50 px.
  nav.classList.toggle("scrolled", window.scrollY > 50);
}

/* ==========================================================================
   HAMBURGER MENU
   ---------------------------------------------------------------------------
   Mobile navigation toggle.  Clicking the hamburger button opens/closes the
   nav menu and swaps the icon between ☰ (closed) and ✕ (open).
   Clicking any link inside the menu auto-closes it.
   ========================================================================== */

// The hamburger button element.
const hamburger = document.querySelector(".hamburger");

// The <ul> inside <nav> that holds the menu links.
const navMenu = document.querySelector("nav ul");

// Toggle the menu open/closed on hamburger click.
if (hamburger && navMenu) {
  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("open");
    // Swap the icon to give visual feedback.
    hamburger.textContent = navMenu.classList.contains("open") ? "✕" : "☰";
  });

  // Close the menu automatically when any link inside it is clicked.
  // Uses event delegation on the <ul> so we don't need a listener per link.
  navMenu.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      navMenu.classList.remove("open");
      hamburger.textContent = "☰";
    }
  });
}

/* ==========================================================================
   SMOOTH SCROLL
   ---------------------------------------------------------------------------
   Intercepts clicks on all nav links (including dropdown items) whose href
   starts with "#" and scrolls to the target section smoothly instead of
   jumping instantly.
   ========================================================================== */

allNavLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    const targetId = link.getAttribute("href");

    // Only handle internal anchor links (starting with "#").
    if (targetId.startsWith("#")) {
      e.preventDefault(); // Prevent the default jump-to-anchor behaviour.
      // scrollIntoView with "smooth" gives a native animated scroll.
      document.querySelector(targetId).scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

/* ==========================================================================
   THEME TOGGLE
   ---------------------------------------------------------------------------
   Switches between dark (default) and light themes.
   • Toggles the "light" class on <body>.
   • Swaps the button emoji between ☀️ (light mode active) and 🌙 (dark).
   • Persists the choice in localStorage so it survives page reloads.
   ========================================================================== */

// The theme-toggle button element.
const themeBtn = document.querySelector(".theme-toggle");

/**
 * setTheme
 * @param {boolean} light — true to activate light mode, false for dark.
 * Applies the theme class, updates the button label, and saves the
 * preference to localStorage.
 */
function setTheme(light) {
  document.body.classList.toggle("light", light);
  themeBtn.textContent = light ? "☀️" : "🌙";
  localStorage.setItem("theme", light ? "light" : "dark");
}

// Toggle theme on button click — reads the current state and flips it.
themeBtn.addEventListener("click", () => setTheme(!document.body.classList.contains("light")));

// On first load, restore the saved preference (if any).
if (localStorage.getItem("theme") === "light") setTheme(true);

/* ==========================================================================
   VOLUNTEERING + SPEAKING HOVER-OPEN
   ---------------------------------------------------------------------------
   In the #activities and #speaking sections, each card is a <details>
   element. Instead of requiring a click, these open on mouse-enter and
   close on mouse-leave, giving a hover-preview effect.
   ========================================================================== */

document.querySelectorAll("#activities details.card, #speaking details.card").forEach((d) => {
  // Open the <details> when the cursor enters.
  d.addEventListener("mouseenter", () => d.open = true);
  // Close it when the cursor leaves.
  d.addEventListener("mouseleave", () => d.open = false);
});

/* ==========================================================================
   SHOW MORE TOGGLE LABEL
   ---------------------------------------------------------------------------
   Handles the "Show more ▾ / Show less ▴" text swap for <details> elements
   that act as expandable sections.
   Two selectors are used:
   1. A specific element with id "activities-more" (legacy / single instance).
   2. All elements with the class ".show-more-toggle" (generic / reusable).
   Both listen for the native "toggle" event fired when a <details> opens or
   closes and update the <summary> text accordingly.
   ========================================================================== */

// Legacy single-instance handler for the activities section.
const showMore = document.getElementById("activities-more");
if (showMore) {
  showMore.addEventListener("toggle", () => {
    showMore.querySelector("summary").textContent = showMore.open ? "Show less ▴" : "Show more ▾";
  });
}

// Generic handler — works for any <details class="show-more-toggle">.
document.querySelectorAll(".show-more-toggle").forEach((el) => {
  el.addEventListener("toggle", () => {
    el.querySelector("summary").textContent = el.open ? "Show less ▴" : "Show more ▾";
  });
});

/* ==========================================================================
   BACK TO TOP (FLOATING)
   ---------------------------------------------------------------------------
   A floating button that appears after the user scrolls past 500 px.
   Clicking it smoothly scrolls the page back to the top.
   The visibility toggle happens inside the main scroll handler (onScroll).
   ========================================================================== */

// The floating "back to top" button (may not exist on every page).
const backToTopFloat = document.querySelector(".back-to-top-float");

if (backToTopFloat) {
  // Smooth-scroll to the very top of the page on click.
  backToTopFloat.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ==========================================================================
   MAIN SCROLL HANDLER
   ---------------------------------------------------------------------------
   A single, unified scroll listener that delegates to every scroll-dependent
   function.  Keeping one listener (instead of many) is better for
   performance and makes the execution order explicit.
   Also runs once on "load" so elements that are already in view get their
   initial state applied without waiting for the first scroll event.
   ========================================================================== */

/**
 * onScroll
 * Master handler bound to both "scroll" and "load" events.
 * Calls each scroll-dependent function in order and toggles the
 * back-to-top button's visibility.
 */
function onScroll() {
  revealOnScroll();    // Fade in .reveal elements.
  animateTimeline();   // Animate timeline spine + items.
  highlightNav();      // Update active nav link & shrink nav bar.

  // Show the floating back-to-top button once the user scrolls past 500 px.
  if (backToTopFloat) {
    backToTopFloat.classList.toggle("visible", window.scrollY > 500);
  }
}

// Bind the master handler to scroll and load events.
window.addEventListener("scroll", onScroll);
window.addEventListener("load", onScroll);

/* ==========================================================================
   NETWORK BACKGROUND ANIMATION
   ---------------------------------------------------------------------------
   Renders an ambient "distributed systems" style node network onto a
   full-viewport <canvas id="network-bg"> element behind all page content.
   Nodes drift slowly; when two nodes come within LINK_DISTANCE of each
   other, a faint line is drawn between them. The mouse gently repels
   nearby nodes for a subtle interactive feel.

   Implementation notes:
   • DPR-aware — canvas is sized to devicePixelRatio so it stays crisp on
     Retina displays without rendering at full-res on low-end devices.
   • Theme-aware — colors are pulled from CSS variables so the network
     automatically re-colors when dark/light mode toggles.
   • Respects prefers-reduced-motion — renders a single static frame and
     stops animating for users who've opted out of motion.
   • Pauses when the tab is hidden (Page Visibility API) to save battery.
   • Uses requestAnimationFrame for smooth 60fps rendering.
   ========================================================================== */

(() => {
  const canvas = document.getElementById("network-bg");
  if (!canvas) return;

  const ctx = canvas.getContext("2d", { alpha: true });
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Tunable parameters — tweak these to change the density / vibe.
  const LINK_DISTANCE = 140;   // Max px distance at which two nodes connect.
  const MOUSE_RADIUS  = 120;   // Mouse influence radius for repulsion.
  const BASE_DENSITY  = 14000; // Lower = more nodes. node count = area / BASE_DENSITY.
  const MAX_NODES     = 90;    // Hard cap so huge screens don't get overwhelmed.
  const MIN_NODES     = 30;    // Minimum on tiny screens.
  const SPEED         = 0.25;  // Max drift velocity in px/frame.

  let nodes = [];
  let width = 0;
  let height = 0;
  let dpr = Math.min(window.devicePixelRatio || 1, 2);
  let mouseX = -9999;
  let mouseY = -9999;
  let rafId = null;
  let colors = readThemeColors();

  /**
   * readThemeColors
   * Pulls accent colors from the current CSS variables so the network
   * automatically matches the active theme. Called on init and when the
   * theme toggle fires.
   */
  function readThemeColors() {
    const styles = getComputedStyle(document.body);
    const accent = styles.getPropertyValue("--accent").trim() || "#60a5fa";
    const accentLight = styles.getPropertyValue("--accent-light").trim() || "#93c5fd";
    return { dot: accent, line: accentLight };
  }

  /**
   * hexToRgb
   * Tiny helper to convert a hex color to an "r, g, b" string for use
   * inside rgba() — needed because we want variable alpha.
   */
  function hexToRgb(hex) {
    const h = hex.replace("#", "");
    const full = h.length === 3 ? h.split("").map(c => c + c).join("") : h;
    const n = parseInt(full, 16);
    return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`;
  }

  /**
   * resize
   * Sizes the canvas to the viewport (accounting for devicePixelRatio
   * so lines stay crisp) and regenerates the node set at a density
   * appropriate for the new dimensions.
   */
  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Node count scales with viewport area, clamped to [MIN, MAX].
    const target = Math.max(MIN_NODES, Math.min(MAX_NODES, Math.floor((width * height) / BASE_DENSITY)));
    nodes = Array.from({ length: target }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * SPEED * 2,
      vy: (Math.random() - 0.5) * SPEED * 2,
      r: 1.2 + Math.random() * 1.3, // Radius varies slightly for visual depth.
    }));
  }

  /**
   * step
   * Advances every node by its velocity, bounces off viewport edges,
   * and applies mouse repulsion. Pure simulation — drawing is separate.
   */
  function step() {
    for (const n of nodes) {
      n.x += n.vx;
      n.y += n.vy;

      // Bounce off the viewport edges.
      if (n.x < 0 || n.x > width)  n.vx *= -1;
      if (n.y < 0 || n.y > height) n.vy *= -1;

      // Mouse repulsion — nodes within MOUSE_RADIUS get pushed away.
      const dx = n.x - mouseX;
      const dy = n.y - mouseY;
      const distSq = dx * dx + dy * dy;
      if (distSq < MOUSE_RADIUS * MOUSE_RADIUS && distSq > 0) {
        const dist = Math.sqrt(distSq);
        const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS * 0.6;
        n.x += (dx / dist) * force;
        n.y += (dy / dist) * force;
      }
    }
  }

  /**
   * draw
   * Renders the current state: lines between nearby nodes (alpha
   * fades with distance), then the nodes themselves on top.
   */
  function draw() {
    ctx.clearRect(0, 0, width, height);
    const lineRgb = hexToRgb(colors.line);
    const dotRgb  = hexToRgb(colors.dot);

    // Lines first — so dots render on top and look cleaner.
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i];
        const b = nodes[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const distSq = dx * dx + dy * dy;

        if (distSq < LINK_DISTANCE * LINK_DISTANCE) {
          const dist = Math.sqrt(distSq);
          // Alpha fades linearly with distance (closer = more visible).
          const alpha = (1 - dist / LINK_DISTANCE) * 0.35;
          ctx.strokeStyle = `rgba(${lineRgb}, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    // Dots.
    ctx.fillStyle = `rgba(${dotRgb}, 0.8)`;
    for (const n of nodes) {
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  /**
   * loop
   * The rAF animation loop. Simulates a step, draws the frame, queues
   * the next. Stored in rafId so we can cancel it when the tab hides.
   */
  function loop() {
    step();
    draw();
    rafId = requestAnimationFrame(loop);
  }

  /** Starts the loop if not already running. */
  function start() {
    if (rafId == null) rafId = requestAnimationFrame(loop);
  }

  /** Stops the loop (used when tab is hidden). */
  function stop() {
    if (rafId != null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  }

  // ── Event wiring ────────────────────────────────────────────────────────

  // Track the mouse for repulsion. Reset when the cursor leaves the page.
  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  window.addEventListener("mouseout", () => {
    mouseX = -9999;
    mouseY = -9999;
  });

  // Rebuild the canvas + node set when the viewport changes.
  window.addEventListener("resize", resize);

  // Pause rendering when the tab is hidden — big battery/CPU win on laptops.
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stop();
    else if (!reduceMotion) start();
  });

  // Re-read theme colors whenever the theme toggle changes <body>'s class.
  // MutationObserver fires on any class change — cheap and reliable.
  new MutationObserver(() => { colors = readThemeColors(); })
    .observe(document.body, { attributes: true, attributeFilter: ["class"] });

  // ── Kickoff ─────────────────────────────────────────────────────────────

  resize();
  if (reduceMotion) {
    // Users who opt out of motion get a single static frame — still
    // shows the network, just doesn't animate.
    draw();
  } else {
    start();
  }
})();

/* ==========================================================================
   TEMPLATES  (commented-out reference snippets)
   ---------------------------------------------------------------------------
   Copy-paste these blocks when adding new features that follow the same
   patterns used above.  Each template includes the HTML you'd add to the
   page and the JS you'd add to this file.
   ========================================================================== */

/*
── TEMPLATE 1: Adding a New Scroll-Reveal Section ─────────────────────────

HTML — add the "reveal" class to any element you want to animate in:

  <section id="new-section" class="reveal">
    <h2>New Section</h2>
    <p>Content here…</p>
  </section>

CSS — make sure your stylesheet has the reveal transition rules:

  .reveal {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  .reveal.active {
    opacity: 1;
    transform: translateY(0);
  }

JS — no extra JS needed!  The existing revealOnScroll() function already
     queries all ".reveal" elements at page load and handles them.
     If you add elements dynamically after load, re-query:

  // const revealElements = document.querySelectorAll(".reveal");


── TEMPLATE 2: Adding a New Show-More Toggle ──────────────────────────────

HTML — use a <details> with the "show-more-toggle" class:

  <details class="show-more-toggle">
    <summary>Show more ▾</summary>
    <div class="hidden-content">
      <p>Extra content that is hidden by default…</p>
    </div>
  </details>

JS — no extra JS needed!  The generic ".show-more-toggle" handler above
     already covers any element with that class.  If you need a unique id
     variant, duplicate the "activities-more" pattern:

  // const newToggle = document.getElementById("my-new-toggle");
  // if (newToggle) {
  //   newToggle.addEventListener("toggle", () => {
  //     newToggle.querySelector("summary").textContent =
  //       newToggle.open ? "Show less ▴" : "Show more ▾";
  //   });
  // }


── TEMPLATE 3: Adding a New Hover-Open Details Section ────────────────────

HTML — use <details> with a class you can target (e.g. inside a new section):

  <section id="new-hover-section">
    <details class="card">
      <summary>Hover to preview</summary>
      <p>Details revealed on hover…</p>
    </details>
  </section>

JS — bind mouseenter / mouseleave just like the volunteering cards:

  // document.querySelectorAll("#new-hover-section details.card").forEach((d) => {
  //   d.addEventListener("mouseenter", () => d.open = true);
  //   d.addEventListener("mouseleave", () => d.open = false);
  // });


── TEMPLATE 4: Adding a New Theme-Aware Element ──────────────────────────

HTML — no special markup required; just use CSS that reacts to the "light"
       class on <body>:

  <div class="my-widget">Theme-aware widget</div>

CSS — define styles for both themes:

  .my-widget {
    background: #1a1a2e;          // dark-mode default
    color: #e0e0e0;
  }
  body.light .my-widget {
    background: #ffffff;          // light-mode override
    color: #1a1a2e;
  }

JS — if you need to run logic when the theme changes, hook into setTheme:

  // function setTheme(light) {
  //   document.body.classList.toggle("light", light);
  //   themeBtn.textContent = light ? "☀️" : "🌙";
  //   localStorage.setItem("theme", light ? "light" : "dark");
  //
  //   // ← Add custom logic here, e.g.:
  //   // document.querySelector(".my-widget").dataset.theme = light ? "light" : "dark";
  // }

*/
