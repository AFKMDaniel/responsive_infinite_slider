const sliderItems = document.querySelectorAll('.slider-item');
const sliderContent = document.querySelector('.slider-content');
const leftButton = document.querySelector('#left');
const rightButton = document.querySelector('#right');
let nextSlide = 1;
let previousSlide = sliderItems.length-1;
let canSlide = true;

sliderItems.forEach((el,i) => {
    if(i > 1) el.remove();
})

sliderContent.insertBefore(sliderItems[sliderItems.length-1].cloneNode(true),sliderContent.firstChild);
sliderContent.style.transform = 'translateX(calc(-100%/3))';

const moveSliderRight = () => {
    const renderedSlide = document.querySelector('.slider-item');
    nextSlide++;
    previousSlide++;
    if (nextSlide > sliderItems.length-1) nextSlide = 0;
    if (previousSlide > sliderItems.length-1) previousSlide = 0;
    rightButton.setAttribute('disabled','true');
    sliderContent.style.transitionDuration = '0.3s';
    sliderContent.style.transform = 'translateX(calc(-100%/3*2))';
    canSlide = false;
    setTimeout(() => {
        sliderContent.style.transitionDuration = '0s';
        sliderContent.style.transform = 'translateX(calc(-100%/3))';
        sliderContent.appendChild(sliderItems[nextSlide].cloneNode(true));
        renderedSlide.remove();
        rightButton.removeAttribute('disabled');
        canSlide = true;
    },300)
}

const moveSliderLeft = () => {
    const renderedSlides = document.querySelectorAll('.slider-item');
    previousSlide--;
    nextSlide--;
    if (previousSlide < 0) previousSlide = sliderItems.length-1
    if (nextSlide < 0) nextSlide = sliderItems.length-1;
    leftButton.setAttribute('disabled','true');
    sliderContent.style.transitionDuration = '0.3s';
    sliderContent.style.transform = 'translateX(0)';
    canSlide = false;
    setTimeout(() => {
        sliderContent.style.transitionDuration = '0s';
        sliderContent.style.transform = 'translateX(calc(-100%/3))';
        sliderContent.insertBefore(sliderItems[previousSlide].cloneNode(true),sliderContent.firstChild);
        renderedSlides[renderedSlides.length-1].remove();
        leftButton.removeAttribute('disabled');
        canSlide = true;
    },300)
}

rightButton.addEventListener('click', moveSliderRight);

leftButton.addEventListener('click', moveSliderLeft);

const slider = document.querySelector('.slider');

let startX;
let x;
let isDown = false;

const mouseDownHandle = (e) => {
    isDown = true;
    startX = e.clientX;
    x = e.clientX;
}

const mouseMoveHandle = (e) => {
    if (!isDown) return;
    x = e.clientX;
    sliderContent.style.transform = `translateX(calc(-100%/3 - ${(startX-x)/2}px))`;
    if (Math.abs(startX - x) > slider.offsetWidth/2) mouseUpHandle() ;
}

const mouseUpHandle = () => {
    if (!isDown) return;
    isDown = false;
    if (startX - x > 0 && canSlide) moveSliderRight();
    else if(startX - x < 0 && canSlide) moveSliderLeft();
}

slider.addEventListener('mousedown', mouseDownHandle);
document.documentElement.addEventListener('mousemove', mouseMoveHandle);
document.documentElement.addEventListener('mouseup', mouseUpHandle);

slider.addEventListener('touchstart', e => mouseDownHandle(e.changedTouches[0]));
document.documentElement.addEventListener('touchmove', e => mouseMoveHandle(e.changedTouches[0]));
document.documentElement.addEventListener('touchend', e => mouseUpHandle(e.changedTouches[0]));

