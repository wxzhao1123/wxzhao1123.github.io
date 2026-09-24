// Personal academic homepage — small, dependency-free behaviors.

(function () {
  "use strict";

  var navLinks = Array.prototype.slice.call(
    document.querySelectorAll(".nav__link")
  );
  var sections = navLinks
    .map(function (link) {
      return document.querySelector(link.getAttribute("href"));
    })
    .filter(Boolean);

  // 1. Highlight the nav item for the section currently in view.
  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            navLinks.forEach(function (link) {
              link.classList.toggle(
                "is-active",
                link.getAttribute("href") === "#" + entry.target.id
              );
            });
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  // 2. Reveal-on-scroll fade for sections.
  var revealables = document.querySelectorAll(".section");
  if ("IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    revealables.forEach(function (el) {
      el.classList.add("reveal");
      revealObserver.observe(el);
    });
  } else {
    // Fallback: show everything immediately.
    revealables.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }
})();
