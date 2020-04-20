'use strict';
(function () {
    window.validateForm = function (param) {
        const form = document.getElementById(param.formId);
        const inputs = Array.from(form.getElementsByTagName('input'));

        inputs.forEach((elem) => {
            elem.addEventListener('focus', () => {
                elem.classList.remove(param.inputErrorClass);
            });
            elem.addEventListener('blur', () => {
                if (!checkInput(elem)) {
                    elem.classList.add(param.inputErrorClass);
                }
            });
        });

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            form.classList.remove(param.formInvalidClass);
            form.classList.add(param.formValidClass);

            inputs.forEach((elem) => {
                if (!checkInput(elem)) {
                    elem.classList.add(param.inputErrorClass);
                    form.classList.remove(param.formValidClass);
                    form.classList.add(param.formInvalidClass);
                }
            })
        });
    };

    function checkInput(input) {
        const value = input.value;
        const dataset = input.dataset;

        if (!value) {
            if (dataset.hasOwnProperty('required')) { return false; }
            return true;
        }

        switch (dataset.validator) {
            case 'number':
                return validNumbers(value, dataset.validatorMin, dataset.validatorMax);
            case 'letters':
                return validRegexp(value, '^[a-zа-яё]+$', 'i');
            case 'regexp':
                return validRegexp(value, dataset.validatorPattern);
            default:
                return true;
        }
    }

    function validNumbers(value, min, max) {
        value = parseInt(value);
        if (isNaN(value)) { return false; }
        if (min && (parseInt(min) > value)) { return false; }
        if (max && (parseInt(max) < value)) { return false; }
        return true;
    }

    function validRegexp(value, pattern, flags) {        
        const re = new RegExp(pattern, flags);
        return re.test(value);
    }
}());
