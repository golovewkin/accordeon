(function ($) {

    $.fn.sliderIconate = function (options) {

        //============wow init===========================================
        new WOW().init();
        //============wow init===========================================
        var self = this;

        var settings = $.extend( {
            'delay'         : 7000,
            'effectAnimate': 'easeInOutBack',
            optionsIconate : {                 //effects from iconate.js
                from: 'fa-circle-o',
                to: 'fa-circle-o',
                animation: 'tada'
            }
        }, options);

        var sliderContent = this.find('.slider-content');// =====this
        var sliderData = this.find('.slider-data');
        var countSlide = $('.slider-data > div').length;
        var sliderDots = this.find('.slider-dots');

        var counter = 1;
        var sliderDataArr = []; // здесь будут хранится блоки с контентом

        var targetI, timerId;

        //helper function
        var changeContent = function () {

            sliderContent.html(sliderDataArr[counter]);
            if (counter >= countSlide) {
                counter = 1;
            } else {
                counter++;
            }
        };

        //autosliding
        var autosliding = function () {

            timerId = setInterval(function () {
                $('#num-' + counter).trigger('click')
            }, settings.delay);
        };
        autosliding();

        var sliding = (function () {

            for (var i = 1; i <= countSlide; i++) {
                sliderDataArr[i] = sliderData.find('.slider' + i);
                sliderDots.append('<i class="fa '+ settings.optionsIconate.from +'" id=num-' + i + '></i>')
            }

            self.css('background-image', 'url("img/slider/' + counter + '.jpg")');
            sliderContent.html(sliderDataArr[counter]);
            counter++;
            sliderDots.find('i').first().addClass('active');

            sliderDots.on('click', function (e) {

                targetI = e.target.id.slice(4);

                clearTimeout(timerId);

                if (targetI !== '') {

                    var dotSlider = document.getElementById('num-' + targetI);
                    iconate(dotSlider, settings.optionsIconate);

                    sliderDots.find('i').filter('.active').removeClass('active');
                    $('#num-' + targetI).addClass('active');

                    sliderContent.animate({right: '60%'}, 1000, settings.effectAnimate, function () {

                        changeContent(targetI);
                        self.css('background-image', 'url("img/slider/' + targetI + '.jpg")');

                        $(this).animate({right: 0}, 1000, settings.effectAnimate).stop(false, true);
                    });

                    autosliding()
                }
            });

        });

        return this.each(sliding);
    };


    //============accordeon================
    var arrHeight = [];
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

    var iconAcoordeon;
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
    //============accordeon================













})(jQuery);



