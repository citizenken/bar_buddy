$(document).ready(function () {
    var layout   = $('#layout'),
        menu     = $('#menu'),
        menuLink = $('#menuLink');

    menuLink.on('click', function() {
        layout.toggleClass('active')
        menu.toggleClass('active')
        menuLink.toggleClass('active')
    })

})
