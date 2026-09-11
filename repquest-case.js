(() => {
    const heroCopy = document.querySelector(".project-hero__copy");
    const heroIntro = document.querySelector(".project-intro");
    const heroEyebrow = document.querySelector(".project-eyebrow");
    const statusValue = document.querySelector(".project-status div:first-child dd");
    const closingCopy = document.querySelector(".closing-summary__lead p");

    if (heroEyebrow) {
        heroEyebrow.textContent = "Independent product / Work in progress / 2026";
    }

    if (statusValue) {
        statusValue.textContent = "Work in progress · TestFlight build";
    }

    if (heroCopy && heroIntro && !document.querySelector(".repquest-wip-note")) {
        heroIntro.insertAdjacentHTML(
            "afterend",
            `
                <div class="repquest-wip-note" role="note" aria-label="Work in progress note">
                    <strong>Work in progress.</strong>
                    <span>RepQuest is a working title. The product, visual identity, game systems, and feature set are still being developed and may change before release.</span>
                </div>
            `
        );

        const style = document.createElement("style");
        style.textContent = `
            .repquest-wip-note {
                display: grid;
                gap: 0.35rem;
                max-width: 36rem;
                margin-top: 1.35rem;
                padding: 0.9rem 1rem;
                border: 1px solid rgba(255, 255, 255, 0.14);
                border-radius: 14px;
                background: rgba(255, 255, 255, 0.055);
                color: rgba(246, 249, 255, 0.76);
                font-size: 0.88rem;
                line-height: 1.55;
                backdrop-filter: blur(10px);
            }

            .repquest-wip-note strong {
                color: #f7f9ff;
                font-family: "Outfit", sans-serif;
                font-size: 0.78rem;
                font-weight: 700;
                letter-spacing: 0.08em;
                text-transform: uppercase;
            }
        `;
        document.head.appendChild(style);
    }

    if (closingCopy) {
        closingCopy.textContent = "RepQuest is the most complete product I have built so far, but it is still actively evolving. I designed the fitness experience, progression, and battle systems, then developed the iOS app in Flutter. RepQuest is currently a working title, and both the product and its identity may change before release.";
    }

    const demos = Array.from(document.querySelectorAll(".product-demo"));

    if (demos.length === 0) {
        return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let observer;

    const pauseDemos = () => {
        demos.forEach((demo) => demo.pause());
    };

    const playDemo = (demo) => {
        demo.play().catch(() => {
            // The poster remains visible when a browser blocks playback.
        });
    };

    const syncPlayback = () => {
        observer?.disconnect();
        pauseDemos();

        if (reducedMotion.matches || document.hidden) {
            return;
        }

        if (!("IntersectionObserver" in window)) {
            demos.forEach(playDemo);
            return;
        }

        observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    playDemo(entry.target);
                } else {
                    entry.target.pause();
                }
            });
        }, {
            rootMargin: "160px 0px",
            threshold: 0.2
        });

        demos.forEach((demo) => observer.observe(demo));
    };

    document.addEventListener("visibilitychange", syncPlayback);

    if (typeof reducedMotion.addEventListener === "function") {
        reducedMotion.addEventListener("change", syncPlayback);
    } else {
        reducedMotion.addListener(syncPlayback);
    }

    syncPlayback();
})();
