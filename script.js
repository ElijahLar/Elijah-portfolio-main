document.addEventListener("DOMContentLoaded", () => {
    const navLinks = Array.from(document.querySelectorAll(".floating-nav a[href^='#'], .footer-links a[href^='#']"));
    const sections = Array.from(document.querySelectorAll("main section[id], footer[id]"));
    const mailButton = document.querySelector("[data-copy-email]");

    const setCurrentLink = (id) => {
        navLinks.forEach((link) => {
            const isCurrent = link.getAttribute("href") === `#${id}`;
            link.classList.toggle("is-current", isCurrent);

            if (isCurrent) {
                link.setAttribute("aria-current", "page");
            } else {
                link.removeAttribute("aria-current");
            }
        });
    };

    navLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            const target = document.querySelector(link.getAttribute("href"));
            if (!target) {
                return;
            }

            event.preventDefault();
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    });

    const observer = new IntersectionObserver(
        (entries) => {
            const visible = entries
                .filter((entry) => entry.isIntersecting)
                .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

            if (visible) {
                setCurrentLink(visible.target.id);
            }
        },
        {
            rootMargin: "-30% 0px -45% 0px",
            threshold: [0.15, 0.4, 0.7]
        }
    );

    sections.forEach((section) => observer.observe(section));
    setCurrentLink("top");

    if (mailButton) {
        let copyTimer;

        mailButton.addEventListener("click", async () => {
            const email = mailButton.getAttribute("data-copy-email");
            if (!email) {
                return;
            }

            try {
                await navigator.clipboard.writeText(email);
                mailButton.classList.add("is-copied");

                window.clearTimeout(copyTimer);
                copyTimer = window.setTimeout(() => {
                    mailButton.classList.remove("is-copied");
                }, 1400);
            } catch (error) {
                window.location.href = `mailto:${email}`;
            }
        });
    }
});
