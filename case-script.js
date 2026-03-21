document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector(".site-header");
    const backToTopButton = document.getElementById("back-to-top");
    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightbox-img");
    const lightboxClose = document.querySelector(".lightbox-close");
    const interactiveImages = Array.from(document.querySelectorAll(".interactive-image"));
    const tocLinks = Array.from(document.querySelectorAll(".toc-card a[href^='#']"));
    const sections = Array.from(document.querySelectorAll(".content-column > [id]"));
    let lastFocusedImage = null;

    const setHeaderState = () => {
        if (header) {
            header.classList.toggle("is-scrolled", window.scrollY > 12);
        }

        if (backToTopButton) {
            backToTopButton.classList.toggle("is-visible", window.scrollY > 280);
        }
    };

    const openLightbox = (image) => {
        if (!lightbox || !lightboxImage) {
            return;
        }

        lastFocusedImage = image;
        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;
        lightbox.classList.add("is-open");
        lightbox.setAttribute("aria-hidden", "false");
        lightboxClose?.focus();
        document.body.style.overflow = "hidden";
    };

    const closeLightbox = () => {
        if (!lightbox) {
            return;
        }

        lightbox.classList.remove("is-open");
        lightbox.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
        lastFocusedImage?.focus();
    };

    interactiveImages.forEach((image) => {
        image.setAttribute("tabindex", "0");
        image.setAttribute("role", "button");
        image.setAttribute("aria-label", `${image.alt}. Open larger image.`);

        image.addEventListener("click", () => openLightbox(image));
        image.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openLightbox(image);
            }
        });
    });

    lightboxClose?.addEventListener("click", closeLightbox);

    lightbox?.addEventListener("click", (event) => {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    backToTopButton?.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    tocLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            const target = document.querySelector(link.getAttribute("href"));
            if (!target) {
                return;
            }

            event.preventDefault();
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    });

    const tocObserver = new IntersectionObserver(
        (entries) => {
            const visibleEntry = entries
                .filter((entry) => entry.isIntersecting)
                .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

            if (!visibleEntry) {
                return;
            }

            const visibleId = visibleEntry.target.id;
            tocLinks.forEach((link) => {
                const isCurrent = link.getAttribute("href") === `#${visibleId}`;
                link.classList.toggle("is-current", isCurrent);
                if (isCurrent) {
                    link.setAttribute("aria-current", "location");
                } else {
                    link.removeAttribute("aria-current");
                }
            });
        },
        {
            rootMargin: "-20% 0px -60% 0px",
            threshold: [0.15, 0.4, 0.7]
        }
    );

    sections.forEach((section) => {
        if (section.id) {
            tocObserver.observe(section);
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && lightbox?.classList.contains("is-open")) {
            closeLightbox();
        }
    });

    setHeaderState();
    window.addEventListener("scroll", setHeaderState, { passive: true });
});
