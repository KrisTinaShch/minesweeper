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
            if (menuBurger.classList.contains('_active')) {
                document.querySelector('body').classList.add('no-overflow');
            } else {
                document.querySelector('body').classList.remove('no-overflow');
            }
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

// const carousel = document.querySelector('.carousel');
// const container = carousel.querySelector('.carousel-container');
// const prevButton = carousel.querySelector('.carousel-left');
// const nextButton = carousel.querySelector('.carousel-right');
// const carouselItems = carousel.querySelectorAll('.carousel-item');
// const itemWidth = carouselItems[0].offsetWidth;

// let currentIndex = 0;
// let position = 0;
// let maxVisibleItems = 3;
// let carouselItemElement = 0;
// function initSlider() {
//     nextButton.addEventListener('click', () => {
//         currentIndex += maxVisibleItems;
//         position -= itemWidth * maxVisibleItems;


//         console.log(carouselItemElement);
//         if (currentIndex == carouselItems.length - 2) {
//             if (carouselItemElement < carouselItems.length) {
//                 let firstSlide = carouselItems[carouselItemElement].cloneNode(true);
//                 container.appendChild(firstSlide);
//                 carouselItemElement++;
//             }
//             else {
//                 carouselItemElement = 0;
//                 let firstSlide = carouselItems[carouselItemElement].cloneNode(true);
//                 container.appendChild(firstSlide);
//                 carouselItems[carouselItemElement].remove();
//                 carouselItemElement++;
//             }
//         }
//         if (currentIndex >= carouselItems.length) {
//             currentIndex = 0;
//             position = 0;
//             if (carouselItemElement > 0) {
//                 carouselItems[carouselItemElement - 1].remove();
//             }
//             else {
//                 carouselItems[carouselItemElement].remove();
//             }

//         }

//         container.style.transform = `translateX(${position}px)`;

//     });


// }

// initSlider();
// position -= itemWidth;
// position = Math.max(position, -itemWidth * (items.length - maxItems));
// container.style.transform = `translateX(${position}px)`;

// cards creating

const cardsData = [
    {
        image: 'images/ourFriendsSection/pets-katrine.png',
        name: 'Katrine',
        link: 'Learn more' // 1 
    },
    {
        image: 'images/ourFriendsSection/pets-jennifer.png',
        name: 'Jennifer',
        link: 'Learn more' // 2
    },
    {
        image: 'images/ourFriendsSection/pets-woody.png',
        name: 'Woody',
        link: 'Learn more' // 3
    },
    {
        image: 'images/ourFriendsSection/pets-sofia.png',
        name: 'Sophia',
        link: 'Learn more' // 4
    },
    {
        image: 'images/ourFriendsSection/pets-timmy.png',
        name: 'Timmy',
        link: 'Learn more' // 5
    },
    {
        image: 'images/ourFriendsSection/pets-freddie.png',
        name: 'Freddie',
        link: 'Learn more' // 6
    },
    {
        image: 'images/ourFriendsSection/pets-charly.png',
        name: 'Charly',
        link: 'Learn more' // 7
    },
    {
        image: 'images/ourFriendsSection/pets-scarlet.png',
        name: 'Scarlett',
        link: 'Learn more' // 8
    },
];

let maxVisibleItems;
if (window.innerWidth >= 1280) {
    maxVisibleItems = 3;
}
else if (window.innerWidth >= 768) {
    maxVisibleItems = 2;
}
else if (window.innerWidth >= 450) {
    maxVisibleItems = 1;
}

let currentArray = [];
const cardsContainer = document.querySelector('.carousel-container');

function createCards() {
    // const shuffledCardsData = cardsData.sort(() => Math.random() - 0.5);
    let copyCardsData = Array.from(cardsData);
    for (let i = 0; i < maxVisibleItems; i++) {

        let randomIndex = Math.floor(Math.random() * copyCardsData.length);
        const card = document.createElement('div');
        card.classList.add('carousel-item');

        const cardImage = document.createElement('img');
        cardImage.setAttribute('src', `${copyCardsData[randomIndex].image}`);

        const petName = document.createElement('p');
        petName.classList.add('pet-name');
        petName.textContent = copyCardsData[randomIndex].name;

        const cardLink = document.createElement('a');
        cardLink.classList.add('button-border-bg');
        cardLink.textContent = copyCardsData[randomIndex].link;

        card.appendChild(cardImage);
        card.appendChild(petName);
        card.appendChild(cardLink);
        cardsContainer.appendChild(card);

        copyCardsData.splice(randomIndex, 1);

    }

}

createCards();

// carousel functionality

const carousel = document.querySelector('.carousel');
const prevButton = carousel.querySelector('.carousel-left');
const nextButton = carousel.querySelector('.carousel-right');
const container = carousel.querySelector('.carousel-container');
let carouselItems = carousel.querySelectorAll('.carousel-item');
const itemWidth = carouselItems[0].offsetWidth;

let currentIndex = 0;
let position = 0;
let currentPrev = 0;
let clickCounts = 0;
let safeElemRight = [];
let safeElemLeft = [];

let clicks = 0;
function swipeSlider() {



    nextButton.addEventListener('click', () => {

        current = carousel.querySelectorAll('.carousel-item');
        safeElemLeft = current;


        if (safeElemRight[0] == undefined) {
            createCards();
            current.forEach(i => {
                i.remove();
            });
        }
        else {

            current.forEach(i => {
                i.remove();
            });

            safeElemRight.forEach(i => {
                container.append(i);
            });
            safeElemRight = [];
        }

    });


    prevButton.addEventListener('click', () => {
        current = carousel.querySelectorAll('.carousel-item');
        safeElemRight = current;

        if (safeElemLeft[0] == undefined) {
            createCards();
            current.forEach(i => {
                i.remove();
            });
        } else {

            current.forEach(i => {
                i.remove();
            });
            safeElemLeft.forEach(i => {
                container.append(i);
            });
            safeElemLeft = [];
        }


    });
}

swipeSlider();




// let carouselItemElement = 0;
// function initSlider() {
//     nextButton.addEventListener('click', () => {
//         currentIndex += maxVisibleItems; // scroll steps
//         position -= itemWidth * maxVisibleItems; //calc position

//         // console.log(carouselItemElement);

//         if (currentIndex == carouselItems.length - 2) {
//             if (carouselItemElement < carouselItems.length) {
//                 let firstSlide = carouselItems[carouselItemElement].cloneNode(true);
//                 container.appendChild(firstSlide);
//                 carouselItemElement++;
//             }
//             else {
//                 carouselItemElement = 0;
//                 let firstSlide = carouselItems[carouselItemElement].cloneNode(true);
//                 container.appendChild(firstSlide);
//                 carouselItems[carouselItemElement].remove();
//                 carouselItemElement++;
//             }
//         }
//         if (currentIndex >= carouselItems.length) {
//             currentIndex = 0;
//             position = 0;
//             if (carouselItemElement > 0) {
//                 carouselItems[carouselItemElement - 1].remove();
//             }
//             else {
//                 carouselItems[carouselItemElement].remove();
//             }

//         }

//         container.style.transform = `translateX(${position}px)`;

//     });


// }

// initSlider();
// position -= itemWidth;
// position = Math.max(position, -itemWidth * (items.length - maxItems));
// container.style.transform = `translateX(${position}px)`;

