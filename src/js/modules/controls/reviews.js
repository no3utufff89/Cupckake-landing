export class ReviewsHandler {
    constructor(modalManager) {
        this.modalManager = modalManager;
        this.init();
    }

    init() {
        this.bindReadReviewButtons();
    }

    bindReadReviewButtons() {
        const readReviewButtons = document.querySelectorAll('[data-read-review]');

        readReviewButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();

                // Находим родительский отзыв
                const reviewItem = button.closest('[data-review-title]');

                if (!reviewItem) return;

                // Собираем данные из data-атрибутов
                const title = reviewItem.dataset.reviewTitle;
                const fullText = reviewItem.dataset.reviewFulltext;
                const authorName = reviewItem.dataset.reviewAuthor;
                const authorCity = reviewItem.dataset.reviewCity;
                const authorImage = reviewItem.dataset.reviewImage;

                // Открываем модалку
                this.modalManager.open('review-full');

                // Заполняем данные (таймаут нужен, чтобы DOM успел создаться)
                setTimeout(() => {
                    this.fillModalData(title, fullText, authorName, authorCity, authorImage);
                }, 50);
            });
        });
    }

    fillModalData(title, fullText, authorName, authorCity, authorImage) {
        const modalTitle = document.getElementById('modal-review-title');
        const modalText = document.getElementById('modal-review-text');
        const modalAuthorName = document.getElementById('modal-author-name');
        const modalAuthorCity = document.getElementById('modal-author-city');
        const modalAuthorImg = document.getElementById('modal-author-img');

        if (modalTitle) modalTitle.textContent = title;
        if (modalText) modalText.innerHTML = `<p>${fullText}</p>`;
        if (modalAuthorName) modalAuthorName.textContent = authorName;
        if (modalAuthorCity) modalAuthorCity.textContent = authorCity;
        if (modalAuthorImg && authorImage) modalAuthorImg.src = authorImage;
    }
}