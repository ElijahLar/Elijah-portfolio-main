document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector(".site-header");
    const menuToggle = document.querySelector(".menu-toggle");
    const siteNav = document.querySelector(".site-nav");
    const navLinks = document.querySelectorAll(".site-nav a[href^='#']");
    const sections = Array.from(document.querySelectorAll("main section[id]"));

    const setHeaderState = () => {
        if (!header) {
            return;
        }

        header.classList.toggle("is-scrolled", window.scrollY > 12);
    };

    const closeMenu = () => {
        if (!menuToggle || !siteNav) {
            return;
        }

        menuToggle.setAttribute("aria-expanded", "false");
        siteNav.classList.remove("is-open");
    };

    const openMenu = () => {
        if (!menuToggle || !siteNav) {
            return;
        }

        menuToggle.setAttribute("aria-expanded", "true");
        siteNav.classList.add("is-open");
    };

    if (menuToggle && siteNav) {
        menuToggle.addEventListener("click", () => {
            const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
            if (isExpanded) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        document.addEventListener("click", (event) => {
            if (!event.target.closest(".site-header")) {
                closeMenu();
            }
        });
    }

    navLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            const target = document.querySelector(link.getAttribute("href"));
            if (!target) {
                return;
            }

            event.preventDefault();
            closeMenu();
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    });

    const sectionObserver = new IntersectionObserver(
        (entries) => {
            const visibleEntry = entries
                .filter((entry) => entry.isIntersecting)
                .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

            if (!visibleEntry) {
                return;
            }

            const visibleId = visibleEntry.target.id;
            navLinks.forEach((link) => {
                const isCurrent = link.getAttribute("href") === `#${visibleId}`;
                link.classList.toggle("is-current", isCurrent);
                if (isCurrent) {
                    link.setAttribute("aria-current", "page");
                } else {
                    link.removeAttribute("aria-current");
                }
            });
        },
        {
            rootMargin: "-30% 0px -45% 0px",
            threshold: [0.2, 0.45, 0.7]
        }
    );

    sections.forEach((section) => sectionObserver.observe(section));

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeMenu();
        }
    });

    setHeaderState();
    window.addEventListener("scroll", setHeaderState, { passive: true });
});
