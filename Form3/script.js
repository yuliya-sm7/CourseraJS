'use strict';

// Код валидации формы

function validateForm(args) {
    const form = document.getElementById(args.formId)

    form.addEventListener("submit", function(event) { 
        event.preventDefault()

        for (const input of Array.from(this.querySelectorAll("input"))) {
            validateInput.call(input, event);
        }
        
        const hasInvalidInput = Array.from(this.querySelectorAll("input")).reduce((res, input) => {
            if (input.classList.contains(args.inputErrorClass)) {
                return res || true;
            } else return res;
        }, false)
        
        if (hasInvalidInput) {
            this.classList.remove(args.formValidClass)
            this.classList.add(args.formInvalidClass)
        } else {
            this.classList.remove(args.formInvalidClass)
            this.classList.add(args.formValidClass)
        }
        
        
    })

    form.addEventListener("blur", function(event) {
        const target = event.target
        if (target.tagName === "INPUT") {
            validateInput.call(target, event)
        }
    }, true)

    form.addEventListener("focus", function(event) {
        const target = event.target
        if (target.tagName === "INPUT") {
            target.classList.remove(args.inputErrorClass)
        }
    }, true)

    function validateInput(event) {

        if (this.value) {
            if (this.dataset.validator === "letters" && !this.value.match(/^[a-zA-Z\u0400-\u04ff]+$/)) {
                this.classList.add(args.inputErrorClass)
            } 
    
            if (this.dataset.validator === "number") {
                if (!this.value.match(/^-?\d*$/)) {
                    this.classList.add(args.inputErrorClass)
                } else if (parseInt(this.dataset.validatorMin) > parseInt(this.value)) {
                    this.classList.add(args.inputErrorClass)
                } else if (parseInt(this.dataset.validatorMax) < parseInt(this.value)) {
                    this.classList.add(args.inputErrorClass)
                }
            }
            
            if (this.dataset.validator === "regexp")
                if (this.value && !this.value.match(new RegExp(String.raw`${this.dataset.validatorPattern}`))) {
                    this.classList.add(args.inputErrorClass)
                }

        } else {
            if (this.dataset.hasOwnProperty('required'))
                this.classList.add(args.inputErrorClass)
        }


    }
}