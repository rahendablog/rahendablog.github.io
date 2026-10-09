/**
 * Edition theme behaviours (vanilla JS — no jQuery, see _TODO.md Phase 6).
 */
(function () {
    "use strict";

    document.addEventListener("DOMContentLoaded", function () {

        // Mobile nav: burger toggles the full-screen overlay menu.
        var burger = document.querySelector(".gh-burger");
        if (burger) {
            burger.addEventListener("click", function (e) {
                e.preventDefault();
                document.body.classList.toggle("is-head-open");
            });
        }

        document.querySelectorAll(".gh-head-menu .nav a").forEach(function (link) {
            link.addEventListener("click", function () {
                document.body.classList.remove("is-head-open");
            });
        });

        document.addEventListener("keydown", function (e) {
            if (e.key === "Escape") {
                document.body.classList.remove("is-head-open");
            }
        });

        // Homepage hero: scroll smoothly to the content below the cover image.
        var coverArrow = document.querySelector(".cover-arrow");
        if (coverArrow) {
            coverArrow.addEventListener("click", function (e) {
                e.preventDefault();
                var target = document.querySelector(coverArrow.getAttribute("href"));
                if (target) {
                    target.scrollIntoView({behavior: "smooth", block: "start"});
                }
            });
        }

    });
})();
