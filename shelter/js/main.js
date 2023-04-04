// Burger menu 

const menuBurger = document.querySelector('.menu-burger');
const menuLinks = document.querySelectorAll('.menu__link');
const overlay = document.querySelector('.overlay');
if (menuBurger) {
    // burger menu animation
    const mobileNavMenu = document.querySelector('.nav-menu');
    menuBurger.addEventListener("click", function (e) {
        menuBurger.classList.toggle('_active');
        mobileNavMenu.classList.toggle('_active');
        if (menuBurger.classList.contains('_active')) {
            document.querySelector('body').classList.add('no-overflow');
        } else {
            document.querySelector('body').classList.remove('no-overflow');
        }
    });

    // close burger menu , when we click on link(a)
    menuLinks.forEach((menuLink) => {
        menuLink.addEventListener('click', function (e) {
            menuBurger.classList.toggle('_active');
            mobileNavMenu.classList.toggle('_active');
        });
    });


    // close burger menu, when we click on overlay
    overlay.addEventListener("click", function (e) {
        menuBurger.classList.toggle('_active');
        mobileNavMenu.classList.toggle('_active');
        if (menuBurger.classList.contains('_active')) {
            document.querySelector('body').classList.add('no-overflow');
        } else {
            document.querySelector('body').classList.remove('no-overflow');
        }
    });

}


// carousel

// const carouselOptions = {
//     infinityScroll: true,
//     maxVisibleItems: 3,
//     maxScrollItems: 3,
// }

const carousel = document.querySelector('.carousel');
const container = carousel.querySelector('.carousel-container');
const prevButton = carousel.querySelector('.carousel-left');
const nextButton = carousel.querySelector('.carousel-right');
const carouselItems = carousel.querySelectorAll('.carousel-item');
const itemWidth = carouselItems[0].offsetWidth;

let currentIndex = 1;
let position = 0;
let maxVisibleItems = 3;

// добавляем копию первого слайда в конец списка слайдов
container.appendChild(carouselItems[0].cloneNode(true));

function initSlider() {

    nextButton.addEventListener('click', () => {
        currentIndex += maxVisibleItems;
        position = position - itemWidth * maxVisibleItems;

        // если достигнут последний слайд, переходим на первый слайд
        if (currentIndex > carouselItems.length) {
            currentIndex = 1;
            position = 0;
        }

        container.style.transition = `transform 500ms ease-in-out`;
        container.style.transform = `translateX(${position}px)`;
    });
}

initSlider();
// position -= itemWidth;
// position = Math.max(position, -itemWidth * (items.length - maxItems));
// container.style.transform = `translateX(${position}px)`;