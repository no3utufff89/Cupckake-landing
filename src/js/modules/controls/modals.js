export class ModalManager {
    constructor() {
        this.overlay = document.querySelector('[data-modal-overlay]');
        this.contentContainer = document.querySelector('[data-modal-content]');
        this.activeModalId = null;

        this.init();
    }

    init() {
        if (!this.overlay) return;

        // Закрытие по клику на оверлей
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) {
                this.close();
            }
        });

        // Закрытие по Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen()) {
                this.close();
            }
        });

        // Открытие модалок по data-modal атрибуту
        this.bindTriggers();
    }

    bindTriggers() {
        const triggers = document.querySelectorAll('[data-modal]');

        triggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                const modalId = trigger.getAttribute('data-modal');
                this.open(modalId);
            });
        });
    }

    open(modalId) {
        if (!modalId) return;

        // Находим шаблон модалки
        const modalTemplate = document.querySelector(`[data-modal-template="${modalId}"]`);

        if (!modalTemplate) {
            console.warn(`Modal template "${modalId}" not found`);
            return;
        }
        this.clearContent();
        // Клонируем содержимое модалки
        const modalContent = modalTemplate.content.cloneNode(true);

        // Очищаем контейнер и вставляем новое содержимое
        this.contentContainer.innerHTML = '';
        this.contentContainer.appendChild(modalContent);

        // Добавляем кнопку закрытия, если её нет в шаблоне
        if (!this.contentContainer.querySelector('.modal-close')) {
            const closeBtn = document.createElement('button');
            closeBtn.className = 'modal-close';
            closeBtn.innerHTML = '×';
            closeBtn.setAttribute('aria-label', 'Закрыть');
            closeBtn.addEventListener('click', () => this.close());
            this.contentContainer.appendChild(closeBtn);
        }

        // Добавляем обработчик закрытия для кнопок с data-modal-close
        const closeButtons = this.contentContainer.querySelectorAll('[data-modal-close]');
        closeButtons.forEach(btn => {
            btn.addEventListener('click', () => this.close());
        });

        this.activeModalId = modalId;
        this.overlay.classList.add('is-active');
        document.body.style.overflow = 'hidden'; // Блокируем скролл тела
    }
    clearContent() {
        this.contentContainer.innerHTML = '';
    }

    close() {
        this.overlay.classList.remove('is-active');
        this.activeModalId = null;
        document.body.style.overflow = '';
        this.clearContent();
    }

    isOpen() {
        return this.overlay.classList.contains('is-active');
    }
}

