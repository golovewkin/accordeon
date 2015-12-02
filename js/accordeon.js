(function ($) {

    $.fn.accordeonIconate = function (options) {

        var arrHeight = [], iconAccordeon;

        var accordeonItemContent = this.find('.prices-accordeon--item__content');
        var accordeonItem = this.find('.prices-accordeon--item');

        var settings = $.extend( {
            'timeSliding'         : 600,
            'funcSliding'         : 'easeInOutExpo',
            'effectAnimate': 'easeInOutBack',
            optionsAccordeonUp : {                 //effects from iconate.js
                from: 'fa-chevron-circle-down',
                to: 'fa-chevron-circle-right',
                animation: 'rotateClockwise'
            },
            optionsAccordeonDown : {                 //effects from iconate.js
                from: 'fa-chevron-circle-right',
                to: 'fa-chevron-circle-down',
                animation: 'rotateClockwise'
            }
        }, options);

        var initAcoordeon = function () {

//TODO добавление правильного класса и id иконки при инициализации

            accordeonItemContent.find('ul').each(function () {

                arrHeight.push($(this).height());

                if (!$(this).hasClass('open-first')) {

                    $(this).height(0)
                }
            });
        }();

        var slidingAccordeon = (function () {

            accordeonItem.on('click', function (e) {

                if (e.target.nodeName === 'SPAN') {
                    return false
                }

                var index = $(this).index() + 1;
                var itemHeight = $(this).find('ul').height();
                var item =  $(this).find('ul');

                $(this).find('.prices-accordeon--item__title').toggleClass('open-block');

                iconAccordeon = document.getElementById('accordeon-icon-' + index);

                if (itemHeight === 0) {
                    item.animate({height: arrHeight[index-1]}, settings.timeSliding, settings.funcSliding, {queue: false});
                    iconate(iconAccordeon, settings.optionsAccordeonDown);
                }else {
                    item.animate({height: 0}, settings.timeSliding, settings.funcSliding , {queue: false});
                    iconate(iconAccordeon, settings.optionsAccordeonUp);
                }
            });
        });

        return this.each(slidingAccordeon);
    };

})(jQuery);



