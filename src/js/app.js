import Gallery from './gallery/index.js';

const gallery = new Gallery;

document.addEventListener('DOMContentLoaded', () => startApp());

function startApp(){
    gallery.createGallery();
    scrollNav();
    fixedNav();
}

function scrollNav(){
    const links = document.querySelectorAll('.main-navegation a');
    
    links.forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();

            const sectionName = event.target.attributes.href.value;
            const section = document.querySelector(sectionName)

            section.scrollIntoView({behavior: "smooth"});
        })
    })
}

function fixedNav(){
    const body = document.querySelector('body'); 
    const bar = document.querySelector('.header');
    const aboutFestival = document.querySelector('.about-festival');

    window.addEventListener('scroll', () => {
        if(aboutFestival.getBoundingClientRect().top < 0){
            bar.classList.add('fixed')
            body.classList.add('body-scroll');
        } else{
            bar.classList.remove('fixed');
            body.classList.remove('body-scroll');
        }
    })
}