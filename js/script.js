"use strict"
//slider
const sliderImages = document.querySelectorAll('.slider__image-block');
const sliderArrows = document.querySelectorAll('.inspirations__arrow');
const slider = document.querySelector('.inspirations__slider');
let sliderMainImageIndex;
let transitionTime = 700;
const sliderLeftChange = 428;

//points

let pointsBlock = document.querySelector('.inspirations__points');
sliderImages.forEach(() => {
    pointsBlock.appendChild(document.createElement('div'));
    for (var i = 0; i < pointsBlock.children.length; i++) {
        pointsBlock.children[i].classList.add('inspirations__point');
    }
});

let points = document.querySelectorAll('.inspirations__point');
document.addEventListener('DOMContentLoaded', () => {
    sliderImages.forEach((img, i) => {
        if (img.classList.contains('slider__main-image')) {
            sliderMainImageIndex = i;
        }
    });
    points.forEach((point, i) => {
        if (i === sliderMainImageIndex) {
            point.classList.add('_onHover');
        }
    });
    
});

//sliderArrowLogic

sliderArrows.forEach((arrow) => {
    arrow.addEventListener('click', (clickedArrow) => {
        slider.style.pointerEvents = 'none';
        arrow.style.pointerEvents = 'none';
        let initialLeft = parseFloat(window.getComputedStyle(slider).left);
        if(clickedArrow.target.closest('button').classList.contains('inspirations__arrow-left')) {
            let sliderMainImage = document.querySelector('.slider__main-image');
            if(sliderMainImage.previousElementSibling) {
                let nextElement = sliderMainImage.nextElementSibling
                slider.style.left = `${initialLeft + sliderLeftChange}px`;
                sliderMainImage.previousElementSibling.classList.add('slider__main-image')
                if(nextElement && nextElement.classList.contains('slider__viewed') || nextElement && sliderMainImage.classList.contains('slider__viewed')) {
                    nextElement.classList.remove('slider__viewed');
                    sliderMainImage.classList.remove('slider__viewed');
                }
                sliderMainImage.classList.remove('slider__main-image');
            }
        }
        else {
            let sliderMainImage = document.querySelector('.slider__main-image');
            if(sliderMainImage.nextElementSibling) {
                slider.style.left = `${initialLeft - sliderLeftChange}px`;
                sliderMainImage.nextElementSibling.classList.add('slider__main-image')
                sliderMainImage.classList.replace('slider__main-image', 'slider__viewed');
            }
        }
        //slide delay
        setTimeout(() => {
            arrow.style.pointerEvents = 'auto';
        }, transitionTime);
        setTimeout(() => {
            slider.style.pointerEvents = 'auto';
        }, transitionTime);

        //sliderPoints

        //removing _onHover from previous main point
        let pointOnHover = document.querySelector('.inspirations__point._onHover');
        pointOnHover.classList.remove('_onHover');
        //adding _onHover to new main point
        sliderImages.forEach((img, i) => {
            if (img.classList.contains('slider__main-image')) {
                sliderMainImageIndex = i;
            }
        });
        points.forEach((point, i) => {
            if (i === sliderMainImageIndex) {
                point.classList.add('_onHover');
            }
        });
    });
})

//sliderGrabbingFunction

const sliderImagesBlock = document.querySelector('.slider__images');
slider.addEventListener("click", sliderClick)
function sliderClick (e) {
    slider.style.pointerEvents = 'none';
    sliderArrows.forEach((arrow) => {
        arrow.style.pointerEvents = 'none'
        setTimeout(() => {
            arrow.style.pointerEvents = 'auto';
            slider.style.pointerEvents = 'auto';
        }, transitionTime);
    });
    let sliderMainImage = document.querySelector('.slider__main-image');
    let mainImageWidth = sliderMainImage.offsetWidth;
    let cursorX = e.clientX;
    let mainImageRectLeft = sliderMainImage.getBoundingClientRect().left;
    
    if (cursorX < mainImageRectLeft + (mainImageWidth / 2)) {
        if(sliderMainImage.previousElementSibling) {
            let nextElement = sliderMainImage.nextElementSibling
            let initialLeft = parseFloat(window.getComputedStyle(slider).left);
            slider.style.left = `${initialLeft + sliderLeftChange}px`;
            sliderMainImage.previousElementSibling.classList.add('slider__main-image')
            if(nextElement && nextElement.classList.contains('slider__viewed') || nextElement && sliderMainImage.classList.contains('slider__viewed')) {
                nextElement.classList.remove('slider__viewed');
                sliderMainImage.classList.remove('slider__viewed');
            }
            sliderMainImage.classList.remove('slider__main-image');
        }
    }
    else if (cursorX > mainImageRectLeft + (mainImageWidth / 2)) {
        if(sliderMainImage.nextElementSibling) {
            let initialLeft = parseFloat(window.getComputedStyle(slider).left);
            slider.style.left = `${initialLeft - sliderLeftChange}px`;
            sliderMainImage.nextElementSibling.classList.add('slider__main-image')
            sliderMainImage.classList.replace('slider__main-image', 'slider__viewed');
        }
    };
    //sliderPoints
    //removing _onHover from previous main point
    let pointOnHover = document.querySelector('.inspirations__point._onHover');
    pointOnHover.classList.remove('_onHover');
    //adding _onHover to new main point
    sliderImages.forEach((img, i) => {
        if (img.classList.contains('slider__main-image')) {
            sliderMainImageIndex = i;
        }
    });
    points.forEach((point, i) => {
        if (i === sliderMainImageIndex) {
            point.classList.add('_onHover');
        }
    });
        
}


//form-posting

const forms = document.forms;
if(forms.length) {
    for(const form of forms) {
        const email = form.querySelector('input[type="file"]');
        file ? file.addEventListener('change', formAddFile) : null;
        form.addEventListener('submit', formSubmitAction);
    }
}
function formAddFile(e) {
    const formInputFile = e.target;
    console.log(formInputFile)
    const formFiles = formInputFile.files;
    const fileName = formFiles.length ? formFiles[0].name : '';
    formInputFile.parentElement.nextElementSibling.innerHTML = fileName;
}
async function formSubmitAction(e) {
    e.preventDefault();
    const form = e.target;
    const formAction = form.getAttribute('action') ? form.getAttribute('action').trim() : "#";
    const formMethod = form.getAttribute('method') ? form.getAttribute('method').trim() : "GET";
    const formData = new FormData(form);

    form.classList.add('form-sending');


    const response = await fetch(formAction, {
        method: formMethod,
        body: formData
    })
    if (response.ok) {
        alert('form sent!');
        form.classList.remove('form-sending');
        
        const formInputFile = form.querySelector('input[type="file"]');
        formInputFile ? formInputFile.parentElement.nextElementSibling.innerHTML = '' : null;
        form.reset();
    }
    else{
        alert('Form not sent')
        form.classList.remove('form-sending');
    }
}

