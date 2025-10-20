const sliderList = document.querySelector('.resources .slider__slider-list');
const sliderTrack = document.querySelector('.resources .slider__slider-track');
const pips = [...document.querySelectorAll('.resources .slider__pip')];
const rightButton = document.querySelector('.resources .slider__right-button');
const leftButton = document.querySelector('.resources .slider__left-button');

let swipeInitCords;
let swipePos1Cords;
let swipePos2Cords;

let slideWidth = sliderList.getBoundingClientRect().width;

let currentSlide = 0;





function prevSlide(){
    currentSlide++;
    setSlide();
}
function nextSlide(){
    currentSlide--;
    setSlide();
}

// Returns evt.touches on touch event and the same evt object on mouse event
function getEvent(evt){
    return evt.type.search('touch') !== -1 ? evt.touches[0] : evt;
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
    
    sliderTrack.style.transition = 'transform 0.2s ease';
    sliderTrack.style.transform = 'translateX(' + (currentSlide * slideWidth) + 'px)';
    
    updatePips();
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
}

// moves slider-track depending on user drag
function swipeMove(evt){
    const event = getEvent(evt);
    swipePos2Cords = swipePos1Cords - event.clientX;
    swipePos1Cords = event.clientX;
    
    sliderTrack.style.transition = 'none';
    sliderTrack.style.transform = 'translateX(' + ((currentSlide * slideWidth) + (swipePos1Cords - swipeInitCords)) + 'px)';
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
}

function onResize(){
    setSlide();
    slideWidth = sliderList.getBoundingClientRect().width;
}

// Event listeners
if (sliderList && sliderTrack){
    sliderList.addEventListener('mousedown', swipeInit);
    sliderList.addEventListener('touch', swipeInit);
}

if(leftButton && rightButton){
    leftButton.addEventListener('click', prevSlide);
    rightButton.addEventListener('click', nextSlide);
}

window.addEventListener('resize', onResize);