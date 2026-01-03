(function () {
  const burger = document.querySelector("[data-burger]");
  const mobileMenu = document.querySelector("[data-mobile-menu]");

  function setActiveNav() {
    const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
    document.querySelectorAll(".navlinks a, .mobileMenu a").forEach(a => {
      const href = (a.getAttribute("href") || "").toLowerCase();
      a.classList.toggle("active", href === path);
    });
  }

  function toggleMenu() {
    if (!mobileMenu) return;
    const isOpen = mobileMenu.getAttribute("data-open") === "true";
    mobileMenu.setAttribute("data-open", String(!isOpen));
    mobileMenu.style.display = isOpen ? "none" : "block";
    if (burger) burger.setAttribute("aria-expanded", String(!isOpen));
  }

  function enableSmoothAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener("click", (e) => {
        const id = a.getAttribute("href");
        if (!id || id === "#") return;
        const el = document.querySelector(id);
        if (!el) return;
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        history.replaceState(null, "", id);
      });
    });
  }

  setActiveNav();
  enableSmoothAnchors();

  if (burger && mobileMenu) {
    burger.addEventListener("click", toggleMenu);
    // start closed
    mobileMenu.style.display = "none";
    mobileMenu.setAttribute("data-open", "false");
    burger.setAttribute("aria-expanded", "false");
  }
})();