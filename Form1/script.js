'use strict';

// Код валидации формы


function validateForm(obj) {
	let form = document.querySelector(`#${obj.formId}`),
		input = form.querySelectorAll('input');
	//сброс отправки формы
	form.addEventListener('submit', (e) => {
		e.preventDefault();

		for (let i = 0; i < input.length; i++) {
			if(input[i].dataset.required == '') {
				if(input[i].value == ''){
					input[i].classList.add(obj.inputErrorClass)
				}
			}

			if (input[i].classList.contains(obj.inputErrorClass)) {
				form.classList.add(obj.formInvalidClass)
				form.classList.remove(obj.formValidClass)
				return true;
			} else {
				form.classList.remove(obj.formInvalidClass)
				form.classList.add(obj.formValidClass)
			}
		}
	});

	function addErrClass(e) {
		if (!e.classList.contains(obj.inputErrorClass)) {
			e.classList.add(obj.inputErrorClass);
			console.log(`добавили класс ошибки на ${e}`)
		}
	}

	function removeErrClass(e) {
		if (e.classList.contains(obj.inputErrorClass)) {
			e.classList.remove(obj.inputErrorClass);
			console.log(`удалили класс ошибки на ${e}`)
		}
	}

	function checkLetters(input) {
		let re = /^[a-zA-Z\u0400-\u04ff]+$/;
		let ok = input.value.match(re);
		if (!ok) {
			addErrClass(input);
		}
	}

	function checkNumber(input) {
		let re = /^-?\d*$/;
		let ok = input.value.match(re);
		if (!ok) {
			addErrClass(input);
		}
		if (input.dataset.validatorMin > +input.value || +input.value > input.dataset.validatorMax) {
			addErrClass(input);
		}
	}

	function checkPhone(input) {
		let re = new RegExp(input.dataset.validatorPattern);
		let ok = input.value.match(re);
		if (!ok) {
			addErrClass(input);
		}
	}
	// Сбросс класса шибки при фокусе
	for (let i = 0; i < input.length; i++) {
		input[i].addEventListener('focus', function (e) {
			removeErrClass(e.target);
		})
	}
	// Обработчки событий на проверку при blur
	for (let i = 0; i < input.length; i++) {

		input[i].addEventListener('blur', function (e) {
			let dataset = e.target.dataset.validator;
			//проверка letters
			if (dataset == 'letters') {
				checkLetters(e.target);
			}
			if (dataset == 'number') {
				checkNumber(e.target);
			}
			if (dataset == 'regexp') {
				checkPhone(e.target);
			}

		})
	}
}