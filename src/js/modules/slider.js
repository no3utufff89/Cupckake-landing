import Glide from '@glidejs/glide';

export function initReviewsSlider() {
    const prevSlide = document.querySelector('.slider-btn_prev');
    const nextSlide = document.querySelector('.slider-btn_next')
    const reviewsSlider = new Glide('.glide-slider', {
        type: 'carousel',
        startAt: 0,
        perView: 1.5,
        gap: 50,
        animationDuration: 800,
        dragThreshold: 30,
        focusAt:'center',
        breakpoints: {
            1200: {
                perView: 1,
                gap: 30,
            },
            768: {
                perView: 1,
                gap: 20,
            },
            600: {
                perView: 1,
                gap: 20,
            },
        }
    });
    function setDataIndices() {
        const slides = document.querySelectorAll('.glide__slide:not(.glide__slide--clone)');
        slides.forEach((slide, idx) => {
            slide.setAttribute('data-index', idx);
        });
    }
    reviewsSlider.on('run', () => {
        const slides = document.querySelectorAll('.glide__slide:not(.glide__slide--clone)');
        const currentIndex = reviewsSlider.index;

        slides.forEach((slide, idx) => {

            if (idx === currentIndex ) {
                slide.classList.add('glide__slide--ac');
            }
            else {
                slide.classList.remove('glide__slide--ac');
            }
        });
    });
    reviewsSlider.on('run.before', (move) => {
        const slides = document.querySelectorAll('.glide__slide:not(.glide__slide--clone)');
        const currentIndex = reviewsSlider.index;

        slides.forEach((slide, idx) => {

            if (idx === currentIndex -1) {

                slide.classList.add('glide__slide--active');
            } else {
                slide.classList.remove('glide__slide--active');
            }
        });
    });
    reviewsSlider.on('run', function() {
        console.log(`curIND`,reviewsSlider.index);
    })



    window.addEventListener('resize', () => {
        console.log('resize');
    })
    window.addEventListener('load', () => {
        reviewsSlider.mount();
        setDataIndices()
    });
    prevSlide.addEventListener('click', ()=> {
        reviewsSlider.go('<');
    })
    nextSlide.addEventListener('click', ()=> {
        reviewsSlider.go('>');
    })

}