import { Fancybox } from '@fancyapps/ui';


// Инициализация галереи
export function initGallery() {
    Fancybox.bind('[data-fancybox="gallery"]', {
        // Основные настройки
        Toolbar: {
            display: {
                left: [],
                middle: [],
                right: ['close'],
            },
        },

        Thumbs: {
            showOnStart: false,
        },

        // Закрытие по клику на фон
        clickOutside: 'close',
        // Анимация
        animationEffect: 'zoom-in-out',
        // Кнопки навигации

    });
}

// Запуск по кнопкам
export function fancyControl() {
    const btns = document.querySelectorAll('.results-list__btn');

    btns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const parent = btn.closest('.results-list__item');
            const link = parent.querySelector('a');

            if (link) {
                link.click(); // Эмулируем клик по ссылке
            }
        });
    });
}

// Автоматический запуск при загрузке
document.addEventListener('DOMContentLoaded', () => {
    initGallery();
    fancyControl();
});