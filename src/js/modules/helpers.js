export function loadingControl() {
    // Только для изображений, которые реально нужно контролировать
    const lazyImages = document.querySelectorAll('img, img[data-src]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const img = entry.target;

                    // Если есть data-src - загружаем
                    if (img.dataset.src) {
                        img.src = img.dataset.src;

                        // Для picture
                        const picture = img.closest('picture');
                        if (picture) {
                            const sources = picture.querySelectorAll('source');
                            sources.forEach(source => {
                                if (source.dataset.srcset) {
                                    source.srcset = source.dataset.srcset;
                                }
                            });
                        }
                    }

                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '200px'
        });

        lazyImages.forEach((img) => {
            // Если у img нет loading="lazy" - добавляем
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }

            // Сохраняем оригинальные пути
            if (img.src && !img.dataset.src && !img.complete) {
                img.dataset.src = img.src;
                img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="380" height="245"%3E%3C/svg%3E';
            }

            imageObserver.observe(img);
        });
    } else {
        // Fallback
        lazyImages.forEach((img) => {
            img.loading = 'lazy';
        });
    }
}