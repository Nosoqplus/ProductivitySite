const sliderList = document.querySelector('.testimonials .slider__slider-list');
const sliderTrack = document.querySelector('.testimonials .slider__slider-track');
const slides = [...sliderTrack.querySelectorAll('.slide')];
const pips = [...document.querySelectorAll('.testimonials .slider__pip')];

let swipeInitCords;
let swipePos1Cords;
let swipePos2Cords;
let userSwiped = false;

let slideWidth = sliderList.getBoundingClientRect().width;
let gap = Number(window.getComputedStyle(sliderTrack).gap.replace('px', ''));

let currentSlide = 0;

const SLIDE_AUTOCHANGE = 5000;
const NEXT_SLIDE_APPEAR_TIMEOUT = 1000;


// Utitlities
function removeClasses(element, classes){
    classes.forEach( classString => {
        element.classList.remove(classString);
    });
}

// Returns evt.touches on touch event and the same evt object on mouse event
function getEvent(evt){
    return evt.type.search('touch') !== -1 ? evt.touches[0] : evt;
}


function prevSlide(){
    currentSlide++;
    setSlide();
}

function nextSlide(){
    currentSlide--;
    setSlide();
}

function executeSlideChange(){
    if(userSwiped){
        return;
    }

    if(currentSlide === - (sliderTrack.children.length - 1) ){
        currentSlide = 0;
        setSlide();
        sliderTrack.style.transition = 'transform 1s ease';
    }else{
        nextSlide();
    }
}


function changeSlidesStates(){
    slides.forEach(slide => {
        slide.classList.add('testimonials__slide--off');
    });

    const currSlideEl = slides[Math.abs(currentSlide)];
    removeClasses(currSlideEl, ['testimonials__slide--off', 'testimonials__slide--next']);
    
    setTimeout( () => {
    const nextSlideEl = slides[Math.abs(currentSlide) + 1];
    if(nextSlideEl){
        nextSlideEl.classList.remove('testimonials__slide--off');
        nextSlideEl.classList.add('testimonials__slide--next');
    }
    }, NEXT_SLIDE_APPEAR_TIMEOUT);
}

// Sets slider to new position depending on currentSlide value
function setSlide(){
    // Border values check
    if(currentSlide > 0){
        currentSlide = 0;
    }
    if(currentSlide < - (sliderTrack.children.length - 1)){
        currentSlide = - (sliderTrack.children.length - 1);
    }
    
    sliderTrack.style.transition = 'transform 2s ease';
    sliderTrack.style.transform = 'translateX(' + ((currentSlide * slideWidth) + (currentSlide * gap)) + 'px)';
    
    updatePips();
    changeSlidesStates();
}

function updatePips(){
    if(pips != []){
        pips.forEach( pip => {
            pip.classList.remove('pips__pip--active');
        });
        pips[Math.abs(currentSlide)].classList.add('pips__pip--active');
    }
}

// initialises "move" and "up" listeners, saves initial values
function swipeInit(evt){
    
    const event = getEvent(evt);
    
    swipeInitCords = event.clientX;
    swipePos1Cords = event.clientX;
    
    window.addEventListener('mousemove', swipeMove);
    window.addEventListener('touchmove', swipeMove);
    
    window.addEventListener('mouseup', swipeEnd);
    window.addEventListener('touchend', swipeEnd);

    // Tracks if user swiped recently
    userSwiped = true;
}

// moves slider-track depending on user drag
function swipeMove(evt){
    const event = getEvent(evt);
    swipePos2Cords = swipePos1Cords - event.clientX;
    swipePos1Cords = event.clientX;
    
    sliderTrack.style.transition = 'none';
    sliderTrack.style.transform = 'translateX(' + ((currentSlide * slideWidth) + (currentSlide * gap) + (swipePos1Cords - swipeInitCords) / 4) + 'px)';
}

// checks if user tried to change slides and changes it itself
// also finished all the events created in swipeInit
function swipeEnd(){
    if(swipePos1Cords - swipeInitCords >= slideWidth / 3){
        prevSlide();
    }else if(swipePos1Cords - swipeInitCords <= - (slideWidth / 3)){
        nextSlide();
    }
    setSlide();
    
    
    window.removeEventListener('mousemove', swipeMove);
    window.removeEventListener('touchmove', swipeMove);
    
    window.removeEventListener('mouseup', swipeEnd);
    window.removeEventListener('touchend', swipeEnd);
    
    // Tracks if user swiped recently
    setTimeout(() => userSwiped = false, SLIDE_AUTOCHANGE);
}

function onResize(){
    setSlide();
    slideWidth = sliderList.getBoundingClientRect().width;
}

// on Load
if (sliderList && sliderTrack && slides != []){
    sliderList.addEventListener('mousedown', swipeInit);
    sliderList.addEventListener('touch', swipeInit);
}

window.addEventListener('resize', onResize);

changeSlidesStates();

setInterval(executeSlideChange, 5000);