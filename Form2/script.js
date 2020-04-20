'use strict';

// Код валидации формы

function validateForm (paramsForm) {  

	function checkValid(elem) {
		if (elem.dataset.hasOwnProperty('required') && elem.value === '') {
            return false
        }

        if (elem.dataset.validator == 'letters' && checkLetters(elem.value) === true ) {
            return false
        }

        if (elem.dataset.validator =='number' && checkNumbers(elem.value) === false ) {
            return false
        }

        if (elem.dataset.validator ==='regexp') {
            var reg = new RegExp(elem.dataset.validatorPattern);

            if (reg.test(elem.value) ===false) {
                return false
            }
        }
         if (elem.dataset.validatorMin || elem.dataset.validatorMax )   {
             if (parseInt(elem.value)<= parseInt(elem.dataset.validatorMin) || parseInt(elem.value) > parseInt(elem.dataset.validatorMax)) {
                  return false
              }
         }
         return true
	}

	function checkLetters(elem) {
		return (new RegExp("[^A-zА-я\s]+")).test(elem);
	}

	function checkNumbers(elem) {
		if (Number.isInteger(+elem) && elem >= 0 && elem <= 100) {
			return true
		} 
		return false
	}

	let form = document.querySelector('form');
	let name = document.querySelector('#profile-name');
	let age = document.querySelector('#profile-age');
	let phone = document.querySelector('#profile-phone');
	let number = document.querySelector('#profile-number');

	form.addEventListener('submit', (event) => {
		event.preventDefault();

		if (form.classList.contains(arguments[0].formInvalidClass) || form.classList.contains(arguments[0].formValidClass)) {
	            form.classList.remove(arguments[0].formInvalidClass);
	            form.classList.remove(arguments[0].formValidClass);
	        }

	        if (checkValid(name) && checkValid(age) && checkValid(phone) && checkValid(number)) {
	        	form.classList.add(arguments[0].formValidClass);
        	} else {
            	form.classList.add(arguments[0].formInvalidClass);
	        }
	})

	name.addEventListener('blur', (event) => {
		if (checkValid(name) === false) {
			name.classList.add(arguments[0].inputErrorClass)
		}

	}, true);

	age.addEventListener('blur', (event) => {
		if (checkValid(age) === false) {
			age.classList.add(arguments[0].inputErrorClass)
		}

	}, true);

	phone.addEventListener('blur', (event) => {
		if (checkValid(phone) === false) {
			phone.classList.add(arguments[0].inputErrorClass)
		}

	}, true);

	number.addEventListener('blur', (event) => {
		if (checkValid(number) === false) {
			number.classList.add(arguments[0].inputErrorClass)
		}

	}, true);


	name.addEventListener('focus', (event) => {
		if (name.classList.contains(arguments[0].inputErrorClass)) {
			name.classList.remove(arguments[0].inputErrorClass)
		}
	});

	age.addEventListener('focus', (event) => {
		if (age.classList.contains(arguments[0].inputErrorClass)) {
			age.classList.remove(arguments[0].inputErrorClass)
		}
	});

	phone.addEventListener('focus', (event) => {
		if (phone.classList.contains(arguments[0].inputErrorClass)) {
			phone.classList.remove(arguments[0].inputErrorClass)
		}
	});

	number.addEventListener('focus', (event) => {
		if (number.classList.contains(arguments[0].inputErrorClass)) {
			number.classList.remove(arguments[0].inputErrorClass)
		}
	});
}
