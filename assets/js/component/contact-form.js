import {isElement} from '../utilities/document.js';
import {isArray, isEmptyObject, isObject} from '../utilities/collections.js';
import {validateUrl} from '../utilities/urls.js';
import {isEmptyString, isString} from '../utilities/strings.js';

class ContactForm {
    static rootSelector = '.jsContactFormRoot';
    static formSelector = '.jsContactFormForm';
    static submitSelector = '.jsContactFormSubmit';
    static responseSelector = '.jsContactFormResponse';
    static inputSelector = '.jsContactFormInput';

    static successAttribute = 'data-message-success';
    static failureAttribute = 'data-message-failure';
    static sendingAttribute = 'data-message-sending';

    static successClass = 'isSuccess';
    static failureClass = 'isFailure';
    static sendingClass = 'isSending';

    #rootElement = null;
    #formElement = null;
    #submitElement = null;
    #responseElement = null;
    #inputElements = null;

    #successMessage = null;
    #failureMessage = null;
    #sendingMessage = null;

    #formUrl = null;

    #formSending = false;

    constructor() {
        this.#initiateInstance();
    }

    #initiateInstance() {
        this.#rootElement = document.querySelector(this.constructor.rootSelector);

        if (!isElement(this.#rootElement)) {
            return;
        }

        this.#formElement = document.querySelector(this.constructor.formSelector);
        this.#submitElement = document.querySelector(this.constructor.submitSelector);
        this.#responseElement = document.querySelector(this.constructor.responseSelector);
        this.#inputElements = Array.from(document.querySelectorAll(this.constructor.inputSelector));

        if (!isElement(this.#rootElement, this.#formElement, this.#submitElement, this.#responseElement) || !isArray(this.#inputElements)) {
            throw new Error('Invalid elements.');
        }

        const formUrl = this.#formElement?.action?.trim();

        if (!validateUrl(formUrl)) {
            throw new Error(`Invalid URL.`);
        }

        const successMessage = this.#rootElement.getAttribute(this.constructor.successAttribute)?.trim();
        const failureMessage = this.#rootElement.getAttribute(this.constructor.failureAttribute)?.trim();
        const sendingMessage = this.#rootElement.getAttribute(this.constructor.sendingAttribute)?.trim();

        if (!successMessage || !failureMessage || !sendingMessage) {
            throw new Error(`Missing messages.`);
        }

        this.#successMessage = successMessage;
        this.#failureMessage = failureMessage;
        this.#sendingMessage = sendingMessage;

        this.listenFormSubmit = this.listenFormSubmit.bind(this);

        this.#formUrl = formUrl;
        this.#formElement.addEventListener('submit', this.listenFormSubmit, false);
    }



    listenFormSubmit(event) {
        event.preventDefault();

        if (this.#formSending === true) {
            console.log(111);
            return;
        }

        const values = this.#getFormValues();

        if (!isObject(values) || isEmptyObject(values)) {
            console.log(111);
            return;
        }

        const parameters = new FormData();
        for (const key in values) {
            parameters.append(key, values[key]);
        }

        this.#resetResponseState();
        this.#resetMessageClasses();

        this.#showMessageSending();

        fetch(this.#formUrl, {
            method: 'POST',
            body: parameters,
        }).then(response => {
            if (response.ok) {
                this.#showMessageSuccess();
            } else {
                this.#showMessageFailure();
            }

            this.#formElement.reset();
        }).catch(error => {
            console.error('Fetch error:', error);
        });
    }



    #resetMessageClasses() {
        this.#responseElement.classList.remove(this.constructor.successClass);
        this.#responseElement.classList.remove(this.constructor.failureClass);
        this.#responseElement.classList.remove(this.constructor.sendingClass);
    }

    #resetResponseState() {
        this.#responseElement.innerHTML = '';
        this.#responseElement.hidden = true;
        this.#submitElement.hidden = false;
    }

    #showMessageSending() {
        this.#submitElement.hidden = true;
        this.#responseElement.hidden = false;
        this.#responseElement.textContent = this.#sendingMessage;
    }

    #showMessageSuccess() {
        this.#submitElement.hidden = true;
        this.#responseElement.hidden = false;
        this.#responseElement.textContent = this.#successMessage;
        this.#responseElement.classList.add(this.constructor.successClass);
    }

    #showMessageFailure() {
        this.#submitElement.hidden = true;
        this.#responseElement.hidden = false;
        this.#responseElement.textContent = this.#failureMessage;
        this.#responseElement.classList.add(this.constructor.failureClass);
    }



    #getFormValues() {
        const result = {};

        for (const inputElement of this.#inputElements) {
            if (!isElement(inputElement)) {
                continue;
            }

            const inputTag = inputElement?.tagName;
            const inputType = inputElement?.type;
            const inputName = inputElement?.name?.trim();

            if (!isString(inputName) || isEmptyString(inputName)) {
                continue;
            }

            if (inputTag === 'INPUT') {
                if (inputType === 'checkbox') {
                    result[inputName] = inputElement.checked === true;
                } else {
                    result[inputName] = inputElement.value || inputElement.placeholder;
                }
            } else if (inputTag === 'SELECT') {
                result[inputName] = inputElement.options[inputElement.selectedIndex].value;
            } else if (inputTag === 'TEXTAREA') {
                result[inputName] = inputElement.value;
            }
        }

        return result;
    }
}

new ContactForm();
