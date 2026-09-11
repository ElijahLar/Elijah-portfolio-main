document.addEventListener("DOMContentLoaded", () => {
    const navLinks = Array.from(document.querySelectorAll(".floating-nav a[href^='#'], .footer-links a[href^='#']"));
    const sections = Array.from(document.querySelectorAll("main section[id], footer[id]"));
    const mailButton = document.querySelector("[data-copy-email]");
    const ventArtwork = "data:image/webp;base64,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";

    // Add VENT to Selected Work while keeping the existing portfolio markup untouched.
    const selectedWork = document.querySelector(".card-stack");
    const repQuestCard = selectedWork?.querySelector(":scope > .work-card");

    if (selectedWork && repQuestCard && !document.querySelector("[data-vent-work]")) {
        repQuestCard.insertAdjacentHTML(
            "afterend",
            `
                <article class="work-card" data-vent-work>
                    <div class="work-card__text">
                        <div>
                            <h3>VENT</h3>
                            <p>
                                A deliberately temporary web experience where a thought is typed, pulled into a black hole,
                                and gone — with no journal history, account, or AI response waiting on the other side.
                            </p>
                        </div>
                        <div class="work-card__meta">
                            <span>Independent product, live on the web</span>
                            <a href="vent-case.html">View Work</a>
                        </div>
                    </div>
                    <a class="work-card__media" href="vent-case.html" aria-label="Open VENT case study" style="background:#0c0e13;">
                        <img src="${ventArtwork}" alt="VENT black hole artwork" loading="lazy" style="width:100%;height:100%;object-fit:cover;">
                    </a>
                </article>
            `
        );
    }

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
