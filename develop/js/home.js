
(function ($, root, undefined) {
    $(function () {
        'use strict';

        /********************************************
         TABS
         ********************************************/
        $('#tabs-loan').easytabs({
            animationSpeed: 100,
            collapsedByDefault: true,
            updateHash: false
        });

        /********************************************
         LOAN CALCULATE: DEFAULT
         ********************************************/
        var percent = 2;

        var sum_request = {
            el: $('#money_range'),
            min: 1000,
            max: 15000,
            step: 1000,
            from: 5000
        };
        var term_request = {
            el: $('#term_range'),
            min: 1,
            max: 30,
            step: 1,
            from: 10
        };

        var current_percent = percent;

        function format(val) {
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        }

        function calculate() {
            //set default value
            sum_request.el.attr('value', sum_request.from);
            term_request.el.attr('value', term_request.from);

            var amount = parseInt(sum_request.el.val()),
                period = parseInt(term_request.el.val()),
                percent = current_percent / 100,
                now = new Date;

            var total = amount * period * percent + amount;

            var payDate = new Date;

            payDate.setDate(now.getDate() + parseInt(period));
            var month = [
                'янв', 'фев', 'мар', 'апр',
                'мая', 'июн', 'июл', 'авг',
                'сен', 'окт', 'ноя', 'дек'
            ][payDate.getMonth()];

            var monthFull = [
                'января', 'февраля', 'марта', 'апреля',
                'мая', 'июня', 'июля', 'августа',
                'сентября', 'октября', 'ноября', 'декабря'
            ][payDate.getMonth()];

            $('.loan-sum').text(format(amount));
            $('.loan-term').text(format(period));
            $('.loan-percent').text(format(current_percent));
            $('.loan-back-money').text(format(total));
            $('.loan-back-date').text(payDate.getDate() + ' ' + month);
        }
        calculate();

        sum_request.el.ionRangeSlider({
            type: "single",
            min: sum_request.min,
            max: sum_request.max,
            step: sum_request.step,
            from: sum_request.from,
            postfix:' <span>₽</span>',
            onChange: function (data) {
                calculate();
            }
        });

        term_request.el.ionRangeSlider({
            type: "single",
            min: term_request.min,
            max: term_request.max,
            step: term_request.step,
            from: term_request.from,
            postfix:' <span>дн.</span>',
            onChange: function (data) {
                calculate();
            }
        });


        /********************************************
         LOAN CALCULATE: ON BAIL
         ********************************************/
        var percent_bail = 2;

        var sum_request_bail = {
            el: $('#money_range_on_bail'),
            min: 5000,
            max: 30000,
            step: 1000,
            from: 15000
        };
        var term_request_bail = {
            el: $('#term_range_on_bail'),
            min: 1,
            max: 60,
            step: 1,
            from: 10
        };

        var current_percent_bail = percent;

        function format(val) {
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        }

        function calculate_bail() {
            //set default value
            sum_request_bail.el.attr('value', sum_request_bail.from);
            term_request_bail.el.attr('value', term_request_bail.from);

            var amount = parseInt(sum_request_bail.el.val()),
                period = parseInt(term_request_bail.el.val()),
                percent = current_percent / 100,
                now = new Date;

            var total = amount * period * percent + amount;

            var payDate = new Date;

            payDate.setDate(now.getDate() + parseInt(period));
            var month = [
                'янв', 'фев', 'мар', 'апр',
                'мая', 'июн', 'июл', 'авг',
                'сен', 'окт', 'ноя', 'дек'
            ][payDate.getMonth()];

            var monthFull = [
                'января', 'февраля', 'марта', 'апреля',
                'мая', 'июня', 'июля', 'августа',
                'сентября', 'октября', 'ноября', 'декабря'
            ][payDate.getMonth()];

            $('.loan-sum_on-bail').text(format(amount));
            $('.loan-term_on-bail').text(format(period));
            $('.loan-percent_on-bail').text(format(current_percent_bail));
            $('.loan-back-money_on-bail').text(format(total));
            $('.loan-back-date_on-bail').text(payDate.getDate() + ' ' + month);
        }
        calculate_bail();

        sum_request_bail.el.ionRangeSlider({
            type: "single",
            min: sum_request_bail.min,
            max: sum_request_bail.max,
            step: sum_request_bail.step,
            from: sum_request_bail.from,
            postfix:' <span>₽</span>',
            onChange: function (data) {
                calculate_bail();
            }
        });

        term_request_bail.el.ionRangeSlider({
            type: "single",
            min: term_request_bail.min,
            max: term_request_bail.max,
            step: term_request_bail.step,
            from: term_request_bail.from,
            postfix:' <span>дн.</span>',
            onChange: function (data) {
                calculate_bail();
            }
        });
    });
})(jQuery, this);