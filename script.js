document.addEventListener("DOMContentLoaded", () => {
    const navLinks = Array.from(document.querySelectorAll(".floating-nav a[href^='#'], .footer-links a[href^='#']"));
    const sections = Array.from(document.querySelectorAll("main section[id], footer[id]"));
    const mailButton = document.querySelector("[data-copy-email]");

    // Keep the portfolio copy aligned with the current state of RepQuest.
    const repQuestHeading = Array.from(document.querySelectorAll(".work-card h3"))
        .find((heading) => heading.textContent?.trim().toLowerCase().startsWith("repquest"));
    const repQuestCardFromMarkup = repQuestHeading?.closest(".work-card");

    if (repQuestHeading) {
        repQuestHeading.textContent = "RepQuest";
    }

    if (repQuestCardFromMarkup) {
        const repQuestMeta = repQuestCardFromMarkup.querySelector(".work-card__meta span");
        const repQuestMedia = repQuestCardFromMarkup.querySelector(".work-card__media--repquest");

        if (repQuestMeta) {
            repQuestMeta.textContent = "Work in progress · TestFlight";
        }

        if (repQuestMedia) {
            repQuestMedia.setAttribute("aria-label", "Open RepQuest case study");
        }
    }

    // EloEcho is no longer part of the public portfolio.
    document.querySelector('a.more-work-card[href="case2.html"]')?.remove();

    const moreWorkDescription = document.querySelector(".more-work__intro p");
    if (moreWorkDescription?.textContent?.includes("Two smaller cases")) {
        moreWorkDescription.textContent = "A smaller interface redesign.";
    }

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
                                A small web app where you type a thought, send it into a black hole, and it disappears.
                                Nothing is saved, and there's no account or AI response.
                            </p>
                        </div>
                        <div class="work-card__meta">
                            <span>Independent product, live on the web</span>
                            <a href="vent-case.html">View Work</a>
                        </div>
                    </div>
                    <a class="work-card__media" href="vent-case.html" aria-label="Open VENT case study" style="background:#080b12;">
                        <img src="vent-black-hole.svg?v=4" alt="VENT black hole artwork" loading="lazy" style="object-fit:contain;object-position:center;width:100%;height:100%;display:block;background:#080b12;">
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
