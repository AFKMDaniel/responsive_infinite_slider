const sliderItems = document.querySelectorAll('.slider-item');
const sliderContent = document.querySelector('.slider-content');
const leftButton = document.querySelector('#left');
const rightButton = document.querySelector('#right');
let nextSlide = 1;
let previousSlide = sliderItems.length-1;

sliderItems.forEach((el,i) => {
    if(i > 1) el.remove();
})

sliderContent.insertBefore(sliderItems[sliderItems.length-1].cloneNode(true),sliderContent.firstChild);
sliderContent.style.transform = 'translateX(calc(-100%/3))';

rightButton.addEventListener('click', () => {
    const renderedSlide = document.querySelector('.slider-item');
    nextSlide++;
    previousSlide++;
    if (nextSlide > sliderItems.length-1) nextSlide = 0;
    if (previousSlide > sliderItems.length-1) previousSlide = 0;
    rightButton.setAttribute('disabled','true');
    sliderContent.style.transitionDuration = '0.3s';
    sliderContent.style.transform = 'translateX(calc(-100%/3*2))';
    setTimeout(() => {
        sliderContent.style.transitionDuration = '0s';
        sliderContent.style.transform = 'translateX(calc(-100%/3))';
        sliderContent.appendChild(sliderItems[nextSlide].cloneNode(true));
        renderedSlide.remove();
        rightButton.removeAttribute('disabled');
    },300)
});

leftButton.addEventListener('click',() => {
    const renderedSlides = document.querySelectorAll('.slider-item');
    previousSlide--;
    nextSlide--;
    if (previousSlide < 0) previousSlide = sliderItems.length-1
    if (nextSlide < 0) nextSlide = sliderItems.length-1;
    leftButton.setAttribute('disabled','true');
    sliderContent.style.transitionDuration = '0.3s';
    sliderContent.style.transform = 'translateX(0)';
    setTimeout(() => {
        sliderContent.style.transitionDuration = '0s';
        sliderContent.style.transform = 'translateX(calc(-100%/3))';
        sliderContent.insertBefore(sliderItems[previousSlide].cloneNode(true),sliderContent.firstChild);
        renderedSlides[renderedSlides.length-1].remove();
        leftButton.removeAttribute('disabled');
    },300)
})

