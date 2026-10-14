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
