/*! Responsive menu (slide panel) with jQuery
 * AUTHOR: ANDREW KLIMOV
 * WWW: KASEO.RU
*/
var speed = 150;

//open menu
$(".menu-trigger").on('click', function(){
    var panel = $(this).attr('data-menu'),
        offset = $("#" + panel).attr('data-offset');

    $("#" + panel).animate({
        'right':'0'
    }, speed);
    return false;
});

// close menu
$('.navmenu .close-btn').on('click', function () {
    var panel = $(this).attr('data-menu'),
        offset = $("#" + panel).attr('data-offset');


    $("#" + panel).animate({
        'right':'-' + offset + 'px'
    }, speed);
});

// Close menu outside the area
$(document).mouseup(function (e) {
    var panel = $('.navmenu');
    if(e.target != panel[0] && !panel.has(e.target).length){
        panel.animate({
            'right':'-260px'
        }, speed);
    }
});