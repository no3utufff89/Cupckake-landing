import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
export function swiperSlider() {
    const swiper = new Swiper('.swiper', {
        // Optional parameters
        modules:[Navigation],
        direction: 'horizontal',
        loop: true,
        slidesPerView:1,
        centeredSlides: true,
        spaceBetween: 10,
        autoHeight: false,
        navigation: {
            nextEl: '.slider-btn_next',
            prevEl: '.slider-btn_prev',
        },
        breakpoints: {
            320: {
                slidesPerView:1,
            },
            768: {
                slidesPerView:1,
            },
            950: {
              slidesPerView:1.5
            },
            1200: {
                slidesPerView: 1.5,
            },

        }

    });
    swiper.init()
}
