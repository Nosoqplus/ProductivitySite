
const accords = document.querySelectorAll('.accord');

function disableAccordions(){
    // Turns off every accordion within page
    accords.forEach(el =>  el.querySelector('.accord__content').style.maxHeight = null);
    accords.forEach(el => el.classList.remove('accord--active'));
}

accords.forEach(accord => {
    // Gets clickable title and content of the accordion
    const button = accord.querySelector('.accord__button');
    const content = accord.querySelector('.accord__content');

    
    button.addEventListener('click', () => {
        // Checks if content has maxHeight value. If so, it means it has been opened
        if(content.style.maxHeight){
            // User clicked on opened accordion => user wants it to be closed.
            // For better readability this code turns every accord off
            disableAccordions();
        }else{
            // Turns off every accordion
            disableAccordions();
            // And turns on the clicked one
            content.style.maxHeight = content.scrollHeight + 'px';
            accord.classList.add('accord--active');
        }
    });
});
