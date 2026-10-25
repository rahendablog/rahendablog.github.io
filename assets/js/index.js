/**
 * Main JS file for Casper behaviours
 */

/* globals jQuery, document */
(function ($, undefined) {
    "use strict";

    var $document = $(document);

    $document.ready(function () {

        var $postContent = $(".post-content");
        $postContent.fitVids();

        $(".scroll-down").arctic_scroll();

        $(".menu-button, .nav-cover, .nav-close").on("click", function(e){
            e.preventDefault();
            $("body").toggleClass("nav-opened nav-closed");
        });

        $(".rotating-subtitle").each(function () {
            var $el = $(this),
                phrases = $el.data("phrases");

            if (!phrases || phrases.length < 2) {
                return;
            }

            var index = 0,
                charIndex = 0,
                deleting = false,
                pauseAtFull = parseInt($el.data("interval"), 10) || 3000,
                pauseAtEmpty = 500,
                typeSpeed = 60,
                deleteSpeed = 30;

            $el.text("").addClass("is-visible");

            function tick() {
                var word = phrases[index];

                if (!deleting) {
                    charIndex += 1;
                    $el.text(word.substring(0, charIndex));

                    if (charIndex < word.length) {
                        setTimeout(tick, typeSpeed);
                    } else {
                        deleting = true;
                        setTimeout(tick, pauseAtFull);
                    }
                    return;
                }

                charIndex -= 1;
                $el.text(word.substring(0, charIndex));

                if (charIndex > 0) {
                    setTimeout(tick, deleteSpeed);
                } else {
                    deleting = false;
                    index = (index + 1) % phrases.length;
                    setTimeout(tick, pauseAtEmpty);
                }
            }

            tick();
        });

        // Copy button on the "Ask an AI" prompt. The text comes from the
        // element the button points at, so the markup stays the single source
        // and nothing is duplicated into a data attribute. On success the box
        // swaps itself for the confirmation message it already contains.
        $(".ask-ai-copy").on("click", function (e) {
            e.preventDefault();

            var $button = $(this),
                $box = $button.closest(".ask-ai-box"),
                $source = $($button.data("copy-target")),
                text = $.trim($source.text());

            if (!text) {
                return;
            }

            // The box fades its contents out and the confirmation in; the
            // CSS owns the animation, this only flips the class and puts it
            // back a few seconds later.
            function confirmCopy() {
                $box.addClass("is-copied");
                clearTimeout($box.data("reset-timer"));
                $box.data("reset-timer", setTimeout(function () {
                    $box.removeClass("is-copied");
                }, 2800));
            }

            // execCommand is the fallback for browsers without the async
            // clipboard API, and for any page not served over HTTPS, where
            // navigator.clipboard is undefined.
            function legacyCopy() {
                var $scratch = $("<textarea/>")
                    .css({position: "fixed", top: 0, left: "-9999px"})
                    .val(text)
                    .appendTo("body");

                $scratch[0].select();

                try {
                    if (document.execCommand("copy")) {
                        confirmCopy();
                    }
                } catch (err) {
                    // Nothing else to try: the prompt is on the page and the
                    // reader can still select it by hand.
                }

                $scratch.remove();
            }

            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(text).then(confirmCopy, legacyCopy);
            } else {
                legacyCopy();
            }
        });

    });

    // Arctic Scroll by Paul Adam Davis
    // https://github.com/PaulAdamDavis/Arctic-Scroll
    $.fn.arctic_scroll = function (options) {

        var defaults = {
            elem: $(this),
            speed: 500
        },

        allOptions = $.extend(defaults, options);

        allOptions.elem.click(function (event) {
            event.preventDefault();
            var $this = $(this),
                $htmlBody = $('html, body'),
                offset = ($this.attr('data-offset')) ? $this.attr('data-offset') : false,
                position = ($this.attr('data-position')) ? $this.attr('data-position') : false,
                toMove;

            if (offset) {
                toMove = parseInt(offset);
                $htmlBody.stop(true, false).animate({scrollTop: ($(this.hash).offset().top + toMove) }, allOptions.speed);
            } else if (position) {
                toMove = parseInt(position);
                $htmlBody.stop(true, false).animate({scrollTop: toMove }, allOptions.speed);
            } else {
                $htmlBody.stop(true, false).animate({scrollTop: ($(this.hash).offset().top) }, allOptions.speed);
            }
        });

    };
})(jQuery);
