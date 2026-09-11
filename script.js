document.addEventListener("DOMContentLoaded", () => {
    const navLinks = Array.from(document.querySelectorAll(".floating-nav a[href^='#'], .footer-links a[href^='#']"));
    const sections = Array.from(document.querySelectorAll("main section[id], footer[id]"));
    const mailButton = document.querySelector("[data-copy-email]");

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
                        <img src="vent-black-hole.jpg" alt="VENT black hole artwork" loading="lazy" style="object-fit:cover;width:100%;height:100%;">
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
