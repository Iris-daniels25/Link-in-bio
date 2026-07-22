"use strict";

/* =========================================================
   IRIS BUILDS — SHARED SITE INTERACTIONS
========================================================= */

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

document.documentElement.classList.add("js");

document.addEventListener("DOMContentLoaded", () => {
  if (!prefersReducedMotion) {
    document.body.classList.add("page-entering");
  }

  setupMobileNavigation();
  setupShrinkingNavigation();
  setupProgressBars();
  setupScrollReveal();
  setupActiveNavigation();
  setupBackToTop();
  setupPageEntry();
  setupLegacyContactToggle();
});


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

function setupMobileNavigation() {
  const menuButton = document.getElementById("mobile-menu-button");
  const navMenu = document.getElementById("primary-menu");

  if (!menuButton || !navMenu) {
    return;
  }

  const closeMenu = () => {
    navMenu.classList.remove("open");
    menuButton.classList.remove("open");

    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute(
      "aria-label",
      "Open navigation menu"
    );
  };

  const openMenu = () => {
    navMenu.classList.add("open");
    menuButton.classList.add("open");

    menuButton.setAttribute("aria-expanded", "true");
    menuButton.setAttribute(
      "aria-label",
      "Close navigation menu"
    );
  };

  menuButton.addEventListener("click", () => {
    const isOpen = navMenu.classList.contains("open");

    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  navMenu.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", (event) => {
    const clickedInsideMenu = navMenu.contains(event.target);
    const clickedMenuButton = menuButton.contains(event.target);

    if (!clickedInsideMenu && !clickedMenuButton) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") {
      return;
    }

    closeMenu();

    if (menuButton.offsetParent !== null) {
      menuButton.focus();
    }
  });

  window.addEventListener(
    "resize",
    () => {
      if (window.innerWidth > 760) {
        closeMenu();
      }
    },
    {
      passive: true
    }
  );
}


/* =========================================================
   SHRINK NAVIGATION WHILE SCROLLING
========================================================= */

function setupShrinkingNavigation() {
  const siteHeader = document.querySelector(".site-header");

  if (!siteHeader) {
    return;
  }

  const updateHeader = () => {
    siteHeader.classList.toggle(
      "scrolled",
      window.scrollY > 40
    );
  };

  window.addEventListener("scroll", updateHeader, {
    passive: true
  });

  updateHeader();
}


/* =========================================================
   PROJECT PROGRESS-BAR ANIMATION
========================================================= */

function setupProgressBars() {
  const progressBars =
    document.querySelectorAll(".progress-fill");

  if (!progressBars.length) {
    return;
  }

  progressBars.forEach((bar) => {
    bar.classList.add("progress-ready");
  });

  if (
    prefersReducedMotion ||
    !("IntersectionObserver" in window)
  ) {
    progressBars.forEach((bar) => {
      bar.classList.add("progress-visible");
    });

    return;
  }

  const progressObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("progress-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.35
    }
  );

  progressBars.forEach((bar) => {
    progressObserver.observe(bar);
  });
}


/* =========================================================
   SCROLL REVEAL ANIMATIONS
========================================================= */

function setupScrollReveal() {
  const revealSelectors = [
    "main > section",
    "main .section-heading",
    "main .glass-card",
    "main .highlight-card",
    "main .project-card",
    "main .building-card",
    "main .resume-highlight-card",
    "main .education-card",
    "main .skill-group",
    "main .experience-card",
    "main .timeline-item",
    "main .process-card",
    "main .contact-card",
    "main .cta-card",
    "main .resume-download-card"
  ];

  const revealTargets =
    getUniqueElements(revealSelectors);

  if (!revealTargets.length) {
    return;
  }

  revealTargets.forEach((element) => {
    element.classList.add("reveal");
  });

  applyRevealStagger(revealTargets);

  if (
    prefersReducedMotion ||
    !("IntersectionObserver" in window)
  ) {
    revealTargets.forEach((element) => {
      element.classList.add("reveal-visible");
    });

    return;
  }

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("reveal-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.14,
      rootMargin: "0px 0px -8% 0px"
    }
  );

  revealTargets.forEach((element) => {
    revealObserver.observe(element);
  });
}


/* =========================================================
   REVEAL STAGGER
========================================================= */

function applyRevealStagger(elements) {
  const groupedElements = new Map();

  elements.forEach((element) => {
    const parent = element.parentElement;

    if (!parent) {
      return;
    }

    if (!groupedElements.has(parent)) {
      groupedElements.set(parent, []);
    }

    groupedElements.get(parent).push(element);
  });

  groupedElements.forEach((siblings) => {
    if (siblings.length < 2) {
      return;
    }

    siblings.forEach((element, index) => {
      const delay = Math.min(index * 70, 280);

      element.style.setProperty(
        "--reveal-delay",
        `${delay}ms`
      );
    });
  });
}


/* =========================================================
   ACTIVE NAVIGATION LINK
========================================================= */

function setupActiveNavigation() {
  const navLinks = document.querySelectorAll(".nav-link");

  if (!navLinks.length) {
    return;
  }

  navLinks.forEach((link) => {
    link.classList.remove("active");
    link.removeAttribute("aria-current");
  });

  if (document.body.classList.contains("error-page")) {
    return;
  }

  const currentPage = getCurrentPageName();

  navLinks.forEach((link) => {
    const linkPage = getLinkPageName(link);
    const isActive = linkPage === currentPage;

    link.classList.toggle("active", isActive);

    if (isActive) {
      link.setAttribute("aria-current", "page");
    }
  });
}


function getCurrentPageName() {
  const pathname = window.location.pathname;
  const segments = pathname.split("/").filter(Boolean);
  const lastSegment =
    segments[segments.length - 1] || "";

  if (
    !lastSegment ||
    lastSegment === "index.html"
  ) {
    return "index.html";
  }

  return lastSegment;
}


function getLinkPageName(link) {
  const href = link.getAttribute("href");

  if (!href) {
    return "";
  }

  const url = new URL(href, window.location.href);
  const segments = url.pathname.split("/").filter(Boolean);
  const lastSegment =
    segments[segments.length - 1] || "";

  if (
    !lastSegment ||
    lastSegment === "index.html"
  ) {
    return "index.html";
  }

  return lastSegment;
}


/* =========================================================
   BACK TO TOP BUTTON
========================================================= */

function setupBackToTop() {
  let button = document.getElementById("back-to-top");

  if (!button) {
    button = document.createElement("button");

    button.id = "back-to-top";
    button.className = "back-to-top";
    button.type = "button";
    button.setAttribute("aria-label", "Back to top");
    button.innerHTML = '<span aria-hidden="true">↑</span>';

    document.body.appendChild(button);
  }

  const updateBackToTopButton = () => {
    const scrollPosition =
      window.scrollY ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    button.classList.toggle(
      "back-to-top-visible",
      scrollPosition > 250
    );
  };

  button.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth"
    });
  });

  window.addEventListener("scroll", updateBackToTopButton, {
    passive: true
  });

  window.addEventListener("pageshow", updateBackToTopButton);

  updateBackToTopButton();
}
/* =========================================================
   PAGE ENTRY TRANSITION
========================================================= */

function setupPageEntry() {
  if (prefersReducedMotion) {
    document.body.classList.add("page-entered");
    return;
  }

  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      document.body.classList.add("page-entered");
    });
  });
}


/* =========================================================
   LEGACY CONTACT FORM TOGGLE
========================================================= */

function setupLegacyContactToggle() {
  const connectButton =
    document.getElementById("show-form-button");

  const contactForm =
    document.getElementById("contact-form");

  if (!connectButton || !contactForm) {
    return;
  }

  connectButton.addEventListener("click", () => {
    const isOpen =
      contactForm.classList.contains("form-visible");

    contactForm.classList.toggle(
      "form-visible",
      !isOpen
    );

    contactForm.classList.toggle(
      "hidden",
      isOpen
    );

    connectButton.setAttribute(
      "aria-expanded",
      String(!isOpen)
    );
  });
}


/* =========================================================
   HELPERS
========================================================= */

function getUniqueElements(selectors) {
  const elements = new Set();

  selectors.forEach((selector) => {
    document
      .querySelectorAll(selector)
      .forEach((element) => {
        elements.add(element);
      });
  });

  return [...elements];
}
