const chart = document.querySelector('.chart');
const tooltip = document.querySelector('.chart__tooltip');
const points = [...document.querySelectorAll('.chart__point')];
const pips = document.querySelectorAll('.chart__pip');

const CHART_TOOLTIP_CHANGE_TIME = 5000;

let currentTooltipPos = 0;

// checks if points and tooltip were found
if(!points == [] && tooltip){
    updateTooltip();
}

function updateTooltip(){
    updatePips();

    // Set tooltip to new position
    tooltip.style.opacity = 1;

    tooltip.style.left = points[currentTooltipPos].getBoundingClientRect().left - chart.getBoundingClientRect().left + 'px';
    tooltip.style.left = points[currentTooltipPos].getBoundingClientRect().left - chart.getBoundingClientRect().left - 54 + 'px';
    tooltip.style.top = points[currentTooltipPos].getBoundingClientRect().top - chart.getBoundingClientRect().top - tooltip.offsetHeight + 50 +'px';
    
    currentTooltipPos++;
    if(currentTooltipPos >= points.length){
        currentTooltipPos = 0;
    }

    // turns of opacity and resets tooltip on transition end
    setTimeout(()=> {
        tooltip.addEventListener('transitionend', onTooltipTransitionEnd);
        tooltip.style.opacity = 0;
    }, CHART_TOOLTIP_CHANGE_TIME);


}

function onTooltipTransitionEnd(){
    tooltip.removeEventListener('transitionend', onTooltipTransitionEnd);
    updateTooltip();
}


function updatePips(){
    if(pips == []){
        return;
    }

    // turns on the right pip
    pips.forEach((pip)=> {
        pip.classList.remove('pips__pip--active');
    })
    pips[currentTooltipPos].classList.add('pips__pip--active');
}