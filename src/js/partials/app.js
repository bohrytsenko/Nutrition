$( document ).ready(function() {

    // Tomato parallax

    var scene = document.getElementById('scene');
    var parallaxInstance = new Parallax(scene, {
        relativeInput: true
    });

    // Close modal

    $('.modal__close a').on('click', function () {
        $('.modal').fadeOut();
        $('.modal_bl').removeClass('modal_bl__over');
    });

    $('.modal_bl').on('click', function () {
        $('.modal').fadeOut();
        $(this).removeClass('modal_bl__over');
    });


});

