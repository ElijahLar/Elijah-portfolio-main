(() => {
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
