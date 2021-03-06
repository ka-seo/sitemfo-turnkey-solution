$(document).ready(function(){
    /********************************
     * INPUT FOCUS
     *********************************/
    $('.form__input').on('focus', function() {
        var $wrap = $(this).closest('.form__field');
        $wrap.addClass('active');
    }).on('blur', function() {
        var $wrap = $(this).closest('.form__field'),
            val = $(this).val();

        if(val) {
            $wrap.addClass('active');
        }
        else {
            $wrap.removeClass('active');
        }
    }).trigger('blur');



    /********************************
     * SYNC ADDRESSES
     *********************************/
    function syncAddress() {

        var $address = $('#sync');

        $($address).on('change', function () {
            if ($(this).prop('checked')) {
                $('#address-sync').slideUp();
            }
            else {
                $('#address-sync').slideDown();
            }
        });
    }
    syncAddress();



    /********************************************
     * GET CURRENT AGE
     ********************************************/
    //возраст считает по дате рождения
    //dateString - дата рождения в формате '10.05.1990'
    function getAge(dateString) {
        var day = parseInt(dateString.substring(0,2));
        var month = parseInt(dateString.substring(3,5));
        var year = parseInt(dateString.substring(6,10));

        var today = new Date();
        var birthDate = new Date(year, month, day);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }



    /********************************
     * INPUT MASK
     *********************************/
    $("input[name='phone']").inputmask(
        "+7 (999) 999-99-99",
        {
            clearIncomplete: true,
            showMaskOnHover: false,
            "onincomplete": function () {
                $(this).removeClass('valid').addClass('error');
            }
        });
    $("input[name='passport_serial']").inputmask("99 99 999999",
        {
            clearIncomplete: true,
            showMaskOnHover: false,
            "onincomplete": function () {
                $(this).removeClass('valid').addClass('error');
            }
        });
    $("input[name='subdivision_code']").inputmask(
        "999-999",
        {
            clearIncomplete: true,
            showMaskOnHover: false,
            "onincomplete": function () {
                $(this).removeClass('valid').addClass('error');
            }
        });

    var dateFields = 'input[name="birth"], input[name="passport_date"]';

    $(dateFields).inputmask(
        "99.99.9999",
        {
            "placeholder": "дд.мм.гггг",
            clearIncomplete: true,
            showMaskOnHover: false,
            "onincomplete": function () {
                $(this).removeClass('valid').addClass('error');
            }
        });

    $(dateFields).on('change', function () {

        var day = parseInt($(this).val().substring(0,2));
        var month = parseInt($(this).val().substring(3,5));
        var year = parseInt($(this).val().substring(6,10));
        var id = $(this).attr('name');
        var today = new Date();

        if (day > 31 || month > 12 || year > today.getFullYear()) {
            console.log('Error!', '#' + id + '-error');

            if($(this).length > 1) {
                $(this)
                    .removeClass('valid')
                    .addClass('error')
                    .attr('aria-required', 'true')
                    .attr('aria-describedby', id+'-error')
                    .after('<span id="'+id+'-error" class="error">Указана некорректная дата.</span>');
                return false;
            }
        }
    });


    /********************************
     * ADD NEW METHODS
     *********************************/
    $.validator.addMethod("russian", function(value, element) {
        return this.optional(element) || /^[а-яА-ЯёЁ ]+$/.test(value);
    }, "Допускается ввод только русских букв");

    $.validator.addMethod("phoneField", function(value, element) {
        return this.optional(element) || /^[0-9-+() ]+$/.test(value);
    }, "Допускается ввод только телефонных символов");

    $.validator.addMethod("FirstLetterUp", function(value, element) {
        return this.optional(element) || /^[А-ЯЁ ]+$/.test(value[0]);
    }, "Первая буква должна быть заглавной");

    $.validator.addMethod("age", function() {
        var choiseDate = $('input[name="birth"]');
        var age = getAge(choiseDate.val());
        // console.log('Ваш возраст: ' + age);
        if(age >= 18 && age <= 70) return true;

    }, "Указана некорректная дата.");


    /********************************
     * TEST
     *********************************/
    // $('.form__input').prop('required', false);


    /********************************
     * VALIDATION QUESTIONNAIRE FORM
     *********************************/
    $('#form').validate({
        rules: {
          birth: {
              age: true
          }
        },
        errorElement: 'span',
        submitHandler: function(form) {
            // location.href='success.html';

            var phone = $('input[name="phone"]').val();

            $('.insert-phone').text(phone);

            $.magnificPopup.open({
                items: {
                    src: '#modal-sms-anketa'
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
     VALIDATION CONFIRM FORM
     ********************************************/
    $("#form-sms-anketa").validate({
        rules: {
            sms_code: {required: true}
        },
        errorElement: "span",
        submitHandler: function(form) {
            //window.location.href="success.html";
            $.magnificPopup.close();

            $.magnificPopup.open({
                items: {
                    src: '#modal-success'
                },
                type: 'inline',
                showCloseBtn: false,
                closeOnBgClick: false,
                enableEscapeKey: false,
            });
            //form.submit();
        }
    });


});
