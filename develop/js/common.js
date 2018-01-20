/********************************
 * FIXED HEADER ON SCROLL
 *********************************/
$(window).scroll(function(){
    if ($(window).scrollTop() >= 65) {
        $('.top-bar').addClass('top-bar--fixed');
    }
    else {
        $('.top-bar').removeClass('top-bar--fixed');
    }
});

$(window).bind('resize orientationchange load', function() {
    var ww = window.innerWidth;
    var offset = 130;


    if(ww > 1200) {
        offset = 125;
        // console.log('LOAD 1200');
    }
    else if(ww > 768 && ww < 992) {
        offset = 30;
        // console.log('LOAD 992');
    }
    else if(ww < 768) {
        offset = 20;
        // console.log('LOAD < 768');
    }
    else {
        offset = 330;
        // console.log('LOAD OTHER');
    }

    $('.theme-item').on('click',function() {
        $('html, body').animate({
            'scrollTop':  $('#header').offset().top - offset
        }, 0);
    });
});

/********************************
 * OPEN DEFAULT MODAL POPUP
 *********************************/
$('.popup-modal').magnificPopup({
    type: 'inline',
    showCloseBtn: true,
    closeOnBgClick: false,
    enableEscapeKey: false
});

/********************************
 * VALIDATION RUSSIAN LOCALIZED
 *********************************/
$.extend( $.validator.messages, {
    required: "Необходимо заполнить.",
    remote: "Пожалуйста, введите правильное значение.",
    email: "Пожалуйста, введите корректный адрес электронной почты.",
    url: "Пожалуйста, введите корректный URL.",
    date: "Пожалуйста, введите корректную дату.",
    dateISO: "Пожалуйста, введите корректную дату в формате ISO.",
    number: "Пожалуйста, введите число.",
    digits: "Пожалуйста, вводите только цифры.",
    creditcard: "Пожалуйста, введите правильный номер кредитной карты.",
    equalTo: "Пожалуйста, введите такое же значение ещё раз.",
    extension: "Пожалуйста, выберите файл с правильным расширением.",
    maxlength: $.validator.format( "Пожалуйста, введите не больше {0} символов." ),
    minlength: $.validator.format( "Пожалуйста, введите не меньше {0} символов." ),
    rangelength: $.validator.format( "Пожалуйста, введите значение длиной от {0} до {1} символов." ),
    range: $.validator.format( "Пожалуйста, введите число от {0} до {1}." ),
    max: $.validator.format( "Пожалуйста, введите число, меньшее или равное {0}." ),
    min: $.validator.format( "Пожалуйста, введите число, большее или равное {0}." )
} );

/********************************
 * INPUT MASK
 *********************************/
$("input[name='phone'], input[name='top_bar_phone']").inputmask(
    "+7 (999) 999-99-99",
{
    clearIncomplete: true,
    showMaskOnHover: false,
    "onincomplete": function () {
        $(this).removeClass('valid').addClass('error');
    }
});

$.validator.addMethod("phoneField", function(value, element) {
    return this.optional(element) || /^[0-9-+() ]+$/.test(value);
}, "Допускается ввод только телефонных символов");

$("input[name='passport_serial']").inputmask("99 99 999999",
{
    clearIncomplete: true,
    showMaskOnHover: false,
    "onincomplete": function () {
        $(this).removeClass('valid').addClass('error');
    }
});

$("input[name='treaty']").inputmask("9/9999999",
    {
        clearIncomplete: true,
        showMaskOnHover: false,
        "onincomplete": function () {
            $(this).removeClass('valid').addClass('error');
        }
    });

/********************************
 * COUNTDOWN
 *********************************/
function initTimer(count) {
    var time = new Date().getTime() + (count * 1000);
    $('#confirm_timer').countdown(time, function (event) {
        $(this).html(event.strftime('%M:%S'));
        $('.resend_code').addClass('disabled').prop('disabled', true);
    }).on('finish.countdown', function () {
        $('.resend_code').removeClass('disabled').prop('disabled', false);
    });
}


/********************************
 * Повторная отправка смс
 *********************************/
$('.resend_code').on('click', function (e) {
    e.preventDefault();

    if($(this).hasClass('disabled')) {

        return false;
    } else {
        initTimer(30);
    }

});


/********************************************
 VALIDATION SIGN IN FORM
 ********************************************/
$("#form-sign-in").validate({
    errorElement: "span",
    submitHandler: function(form) {
        //window.location.href="success.html";
        $.magnificPopup.close();

        var phone = $('input#phone_login').val();

        $('.insert-phone').text(phone);

        $.magnificPopup.open({
            items: {
                src: '#modal-sms'
            },
            type: 'inline',
            showCloseBtn: true,
            closeOnBgClick: false,
            enableEscapeKey: false,
            callbacks: {
                open: function() {
                    initTimer(30);
                }
            }
        });
    }
});

/********************************************
 VALIDATION FORM SMS
 ********************************************/
$("#form-sms").validate({
    rules: {
        sms_code: {required: true}
    },
    errorElement: "span",
    submitHandler: function(form) {
        $.magnificPopup.close();

        $.magnificPopup.open({
            items: {
                src: '#modal-repay'
            },
            type: 'inline',
            showCloseBtn: true,
            closeOnBgClick: false,
            enableEscapeKey: false
        });
    }
});


/********************************************
 VALIDATION FORM SIGN WITH PASSPORT
 ********************************************/
$("#form-passport").validate({
    errorElement: "span",
    submitHandler: function(form) {
        $.magnificPopup.close();
        $.magnificPopup.open({
            items: {
                src: '#modal-repay'
            },
            type: 'inline',
            showCloseBtn: true,
            closeOnBgClick: false,
            enableEscapeKey: false
        });
    }
});



/********************************************
 TOP PANEL DEMO
 ********************************************/
if($('body').find('.top-panel').length > 0 || $('body').find('.top-bar').length > 0) {
    $('body').addClass('demo-mode');
}

 $('.top-panel__trigger').on('click', function (e) {
     e.preventDefault();
     var thisTrigger = this,
        parent = $(thisTrigger).parent('.top-panel');

    $('.top-panel__inner').slideToggle('fast', function () {
        $(parent).toggleClass('active');
        
        if(parent.hasClass('active')) {
            $(thisTrigger).find('.text').text('Свернуть выбор темы');
        } else {
            $(thisTrigger).find('.text').text('Выбрать другую тему');
        }
    });
 });

 $('.top-bar__text--mobile').on('click', function (e) {
     e.preventDefault();

    $('.top-bar__form').slideDown('fast');
     $('body').addClass('body--fixed');
 });

 $('.top-bar__form_close').on('click', function (e) {
     e.preventDefault();
     $('body').removeClass('body--fixed');
     $('.top-bar__form').slideUp('fast');
 });





/********************************************
 VALIDATION TOP DEMO FORM
 ********************************************/
function formSend(form, icon) {
    var sent = $(form).find('.sent'),
        defaulting = $(form).find('.default'),
        loading = $(form).find('.loading'),
        errorElem = $(form).find('.error-send'),
        pathObj_1 = {
            "sent-1": {
                "strokepath": [{
                    "path": "M26.395 14.319A13.025 13.025 0 0 1 4.928 23.37 13.023 13.023 0 0 1 13.398.454a12.98 12.98 0 0 1 5.009.998m-11.024 9.02l6.01 7.012 11.345-11.8",
                    "duration": 1000
                }],
                "dimensions": {
                    "width": 30,
                    "height": 30
                }
            }
        },
        pathObj_2 = {
            "sent-2": {
                "strokepath": [{
                    "path": "M26.395 14.319A13.025 13.025 0 0 1 4.928 23.37 13.023 13.023 0 0 1 13.398.454a12.98 12.98 0 0 1 5.009.998m-11.024 9.02l6.01 7.012 11.345-11.8",
                    "duration": 1000
                }],
                "dimensions": {
                    "width": 30,
                    "height": 30
                }
            }
        };


    setTimeout(function () {
        sent.hide();
        errorElem.hide();
        defaulting.fadeIn();

        $('.top-bar__form').hide();
        $('body').removeClass('body--fixed');
        $(form).find(':input').prop('readonly', false);
        $(form).find(':button').prop('disabled', false);
        $(form)[0].reset();
    }, 3000);

    // на экран сообщение с данными, присланными сервером.
    $.ajax({
        type: "POST",
        url: 'send.php',
        data: $(form).serializeArray(),
        beforeSend: function beforeSend() {
            console.log('Try sending the form...');

            $(form).find(':input').prop('readonly', true);
            $(form).find(':button').prop('disabled', true);
            //$(form).find('select').prop('disabled', true);

            defaulting.hide();
            loading.show();

        },
        success: function success(response) {
            console.info('Got response success');

            if (response == 'success') {
                console.log('Form was sent success');
                loading.hide();
                defaulting.hide();
                errorElem.hide();
                sent.fadeIn();

                $('#sent-1').lazylinepainter({
                    "svgData": pathObj_1,
                    "strokeWidth": 2,
                    "strokeColor": "#fff"
                }).lazylinepainter('paint');

                $('#sent-2').lazylinepainter({
                    "svgData": pathObj_2,
                    "strokeWidth": 2,
                    "strokeColor": "#fff"
                }).lazylinepainter('paint');

                setTimeout(function () {
                    sent.hide();
                    loading.hide();
                    errorElem.hide();
                    defaulting.fadeIn();

                    $('.top-bar__form').hide();
                    $('body').removeClass('panel-open');
                    $(form).find(':input').prop('readonly', false);
                    $(form).find(':button').prop('disabled', false);
                    $(form)[0].reset();
                }, 3000);
            }

            if (response == 'error') {
                console.error('Form was sent error');
                console.log(response);
                loading.hide();
                defaulting.hide();
                sent.hide();
                errorElem.fadeIn();

                setTimeout(function () {
                    loading.hide();
                    defaulting.hide();
                    sent.hide();
                    defaulting.fadeIn();

                    $(form).find(':input').prop('readonly', false);
                    $(form).find(':button').prop('disabled', false);
                    //$(form).find('select').prop('disabled', false);
                    $(form)[0].reset();
                }, 4000);
                alert('К сожалению, по какой-то причине ваше письмо не отправлено. Пожалуйста, повторите попытку.');
            }
        },
        error: function error(response) {
            console.error('Error sending form.');
            console.log(response);
            loading.hide();
            defaulting.hide();
            sent.hide();
            errorElem.fadeIn();

            setTimeout(function () {
                loading.hide();
                sent.hide();
                errorElem.hide();
                defaulting.fadeIn();

                $(form).find(':input').prop('readonly', false);
                $(form).find(':button').prop('disabled', false);
                $(form)[0].reset();
            }, 4000);
        }
    });
}


/********************************************
 VALIDATION TOP DEMO FORM
 ********************************************/
$("#top-bar-form").validate({
    errorElement: "span",
    submitHandler: function(form) {
        formSend(form, 'sent-1')
    }
});