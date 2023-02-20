function slider ({
    container,
    slide,
    nextArrow,
    prevArrow,
    totalCounter,
    currentCounter,
    wrapper,
    field
}) {
    const slides = document.querySelectorAll(slide),
        slider = document.querySelector(container),
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        total = document.querySelector(totalCounter),
        current = document.querySelector(currentCounter),
        slidesWrapper = document.querySelector(wrapper),
        width = window.getComputedStyle(slidesWrapper).width,
        slidesField = document.querySelector(field); // граница размеров 

    const dots = [];
    const indicators = document.createElement('ol');        // точки

    let slideIndex = 1;
    let offset = 0;

    slides.forEach(slide => {
        slide.style.width = width;
    });

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';
    slidesWrapper.style.overflow = 'hidden';

    slider.style.position = 'relative';
    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;

    slider.append(indicators);

    for (let i = 0; i < slides.length; i++ ) {

        const dot = document.createElement('li');

        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;

        if ( i == 0 ) {
            dot.style.opacity = 1;
        }

        indicators.append(dot);
        dots.push(dot);
    }

    next.addEventListener('click', () => {

        if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {      // сравниваем offset с размерами ширины набора картинок width * кол-во картинок, например "500px"
             offset = 0;
        }
        else {
            offset += +width.slice(0, width.length - 2);
        }

        slidesField.style.transform = `translateX(-${offset}px`;
        
        if (slideIndex == slides.length) {
            slideIndex = 1;
        }
        else {
            slideIndex ++;
        }
        
        addZero();

        // dots modify

        dotOpacity();

    });

    prev.addEventListener('click', () => {

        if (offset == 0) {      // сравниваем offset с размерами ширины набора картинок width * кол-во картинок, например "500px"
             offset = +width.slice(0, width.length - 2) * (slides.length - 1);
        }
        else {
            offset -= +width.slice(0, width.length - 2);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        }
        else {
            slideIndex --;
        }

        addZero();

        // dots modify

        dotOpacity();

    });

    const addZero = function () {                                   // добавление 0 до 10 числа индексам 
        if (slideIndex < 10 ) {
            total.textContent = `0${slides.length}`;
            current.textContent = `0${slideIndex}`;
        }
        else {
            total.textContent = `0${slides.length}`;
            current.textContent = slideIndex;
        }
    };

    const dotOpacity = function () {                               // переключение прозрачности точек 
        dots.forEach (dot => dot.style.opacity = '0.5');
        dots[slideIndex - 1].style.opacity = 1;
    };

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;

            offset = +width.slice(0, width.length - 2) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;

            addZero();

            dotOpacity();
        });
    });
}

export default slider;