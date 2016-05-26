$(function() {
    $(".contact-form__form").submit(function(event){
        event.preventDefault();

        var $form = $(this).closest(".contact-form__form");

        var $nameInput = $form.find("input[name=name]");
        var $phoneInput = $form.find("input[name=phone]");

        var name = $nameInput.val();
        var phone = $phoneInput.val();

        $.post("submit.php", {name: name, phone: phone})
            .done(function(data) {
                $nameInput.val("");
                $phoneInput.val("");

                $form.find(".contact-form__message-failure").hide();
                bounce($form.find(".contact-form__message-success"));
            })
            .fail(function() {
                $form.find(".contact-form__message-success").hide();
                bounce($form.find(".contact-form__message-failure"));
            });
    });

    $('#flexslider').flexslider({
        slideshow: true,
        slideshowSpeed: 7000,
        animationSpeed: 600,
        animation: "slide",
        animationLoop: true,
        pauseOnHover: true,
        useCSS: true,
        touch: true,
        controlsContainer: $(".custom-controls-container"),
        customDirectionNav: $(".custom-navigation a")
    });

    smoothScroll.init();

    function bounce(element) {
        var opacity = 0;
        var times = 3;
        var damping = 0.2;
        var initialDistance = 10;

        element.css({'opacity': opacity});
        element.show();
        for(var i = 1; i <= times; i++){
            var an = (100 - Math.pow(-1, i) * initialDistance / (i * damping)) + "%";
            opacity = (i / times);
            $(element).animate({'top': an, 'opacity': opacity}, 100);
        }
        $(element).animate({'top': '100%', 'opacity': '100%'}, 100);
    }
});