import { loadingControl } from './modules/helpers.js';
import { ModalManager } from './modules/controls/modals.js';
import { OrderForm } from './modules/controls/form.js';
import { ReviewsHandler } from './modules/controls/reviews.js';
import { swiperSlider } from './modules/slider_swiper.js';




document.addEventListener('DOMContentLoaded', () => {
    loadingControl()
    swiperSlider()
    const modalManager = new ModalManager();
    const orderForm = new OrderForm(modalManager);
    const reviewsHandler = new ReviewsHandler(modalManager);


})
