(function ($) {

    $.fn.accordeonIconate = function (options) {

        var self = this;

        //var settings = $.extend( {
        //    'delay'         : 7000,
        //    'effectAnimate': 'easeInOutBack',
        //    optionsIconate : {                 //effects from iconate.js
        //        from: 'fa-circle-o',
        //        to: 'fa-circle-o',
        //        animation: 'tada'
        //    }
        //}, options);

        var arrHeight = [], iconAcoordeon;
        var accordeonItemContent = $('.prices-accordeon--item__content');
        var accordeonItem = $('.prices-accordeon--item');

        var initAcoordeon = function () {

            accordeonItemContent.find('ul').each(function () {

                arrHeight.push($(this).height());

                if (!$(this).hasClass('open-first')) {

                    $(this).height(0)
                }
            });

        }();


        var slidingAccordeon = (function () {

            var optionsAccordeonUp = {
                from: 'fa-chevron-circle-down',
                to: 'fa-chevron-circle-right',
                animation: 'rotateClockwise'
            };

            var optionsAccordeonDown = {
                from: 'fa-chevron-circle-right',
                to: 'fa-chevron-circle-down',
                animation: 'rotateClockwise'
            };

            accordeonItem.on('click', function (e) {

                if (e.target.nodeName === 'SPAN') {
                    return false
                }

                var index = $(this).index() + 1;
                var itemHeight = $(this).find('ul').height();
                var item =  $(this).find('ul');

                $(this).find('.prices-accordeon--item__title').toggleClass('open-block');

                iconAcoordeon = document.getElementById('accordeon-icon-' + index);

                if (itemHeight === 0) {
                    item.animate({height: arrHeight[index-1]}, 600, 'easeInOutExpo', {queue: false});
                    iconate(iconAcoordeon, optionsAccordeonDown);
                }else {
                    item.animate({height: 0}, 600, 'easeInOutExpo' , {queue: false});
                    iconate(iconAcoordeon, optionsAccordeonUp);
                }

            });
        });

        return this.each(slidingAccordeon);
    };

})(jQuery);



