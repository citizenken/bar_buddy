$(document).ready(function () {
    var layout   = $('#layout'),
        menu     = $('#menu'),
        menuLink = $('#menuLink');

    menuLink.on('click', function() {
        console.log('snore')
        layout.toggleClass('active')
        menu.toggleClass('active')
        menuLink.toggleClass('active')
    })

})
