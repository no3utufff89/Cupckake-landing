import IMask from 'imask';

export class OrderForm {
    constructor(modalManager) {
        this.modalManager = modalManager;
        this.init();
    }

    init() {
        // 1. Обрабатываем обычную форму на странице
        const mainForm = document.querySelector('.order-form');
        if (mainForm && !mainForm.closest('.order-modal')) {
            this.setupForm(mainForm, false, 'success');
        }

        // 2. Обрабатываем формы в модалках
        this.setupModalForm('order', 'success');
        this.setupModalForm('question', 'question-success');
    }

    setupModalForm(modalId, successModalId) {
        // Сохраняем оригинальный метод open
        const originalOpen = this.modalManager.open.bind(this.modalManager);
        const self = this;

        // Переопределяем метод open, чтобы добавить обработку формы
        this.modalManager.open = function(id) {
            originalOpen(id);

            // Если открыли нужную модалку с формой
            if (id === modalId) {
                // Ждём появления формы в DOM
                setTimeout(() => {
                    const modalForm = document.querySelector('.modal-order-form, .order-modal form');
                    if (modalForm && !modalForm.hasAttribute(`data-${modalId}-initialized`)) {
                        modalForm.setAttribute(`data-${modalId}-initialized`, 'true');
                        self.setupForm(modalForm, true, successModalId);
                    }
                }, 50);
            }
        };
    }

    setupForm(form, isModal = false, successModalId = 'success') {
        const phoneInput = form.querySelector('input[type="tel"]');
        const checkbox = form.querySelector('input[type="checkbox"]');

        if (!phoneInput) return;

        // Добавляем атрибут для маски, если его нет
        if (!phoneInput.hasAttribute('data-phone-mask')) {
            phoneInput.setAttribute('data-phone-mask', '');
        }

        // Инициализируем маску телефона
        const mask = this.initPhoneMask(phoneInput);

        // Валидация при вводе
        phoneInput.addEventListener('input', () => this.validatePhone(phoneInput));

        if (checkbox) {
            checkbox.addEventListener('change', () => this.validateCheckbox(checkbox));
        }

        // Обработка отправки
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit(form, mask, isModal, successModalId);
        });
    }

    initPhoneMask(input) {
        const maskOptions = {
            mask: '+{7} (000) 000-00-00',
            lazy: false,
            placeholderChar: '_'
        };
        return IMask(input, maskOptions);
    }

    validatePhone(phoneInput) {
        const phoneDigits = phoneInput.value.replace(/\D/g, '');
        const isValid = phoneDigits.length === 11; // +7 + 10 цифр = 11 цифр

        if (isValid) {
            phoneInput.classList.remove('error');
            phoneInput.classList.add('valid');
        } else {
            phoneInput.classList.remove('valid');
            if (phoneDigits.length > 0) {
                phoneInput.classList.add('error');
            } else {
                phoneInput.classList.remove('error');
            }
        }

        return isValid;
    }

    validateCheckbox(checkbox) {
        const isValid = checkbox.checked;

        if (isValid) {
            checkbox.classList.remove('error');
        } else {
            checkbox.classList.add('error');
        }

        return isValid;
    }

    validateForm(form) {
        const phoneInput = form.querySelector('input[type="tel"]');
        const checkbox = form.querySelector('input[type="checkbox"]');

        const isPhoneValid = this.validatePhone(phoneInput);
        const isCheckboxValid = checkbox ? this.validateCheckbox(checkbox) : true;

        return isPhoneValid && isCheckboxValid;
    }

    handleSubmit(form, mask, isModal, successModalId) {
        if (!this.validateForm(form)) {
            return;
        }

        // Открываем нужную модалку успеха
        this.modalManager.open(successModalId);

        // Очищаем форму
        form.reset();

        // Сбрасываем маску
        if (mask) {
            mask.updateValue();
        }

        // Сбрасываем классы валидации
        const phoneInput = form.querySelector('input[type="tel"]');
        const checkbox = form.querySelector('input[type="checkbox"]');

        if (phoneInput) {
            phoneInput.classList.remove('valid', 'error');
        }
        if (checkbox) {
            checkbox.classList.remove('error');
        }
    }
}