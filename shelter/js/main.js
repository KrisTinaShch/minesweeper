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

function createCards() {
    const cardsContainer = document.querySelector('.carousel-container');

    const shuffledCardsData = cardsData.sort(() => Math.random() - 0.5);

    shuffledCardsData.forEach((cardData) => {
        const card = document.createElement('div');
        card.classList.add('carousel-item');

        const cardImage = document.createElement('img');
        cardImage.setAttribute('src', `${cardData.image}`);

        const petName = document.createElement('p');
        petName.classList.add('pet-name');
        petName.textContent = cardData.name;

        const cardLink = document.createElement('a');
        cardLink.classList.add('button-border-bg');
        cardLink.textContent = cardData.name;

        card.appendChild(cardImage);
        card.appendChild(petName);
        card.appendChild(cardLink);
        cardsContainer.appendChild(card);
    });
}

createCards();


// carousel functionality
let maxVisibleItems = 3;
const carousel = document.querySelector('.carousel');
const prevButton = carousel.querySelector('.carousel-left');
const nextButton = carousel.querySelector('.carousel-right');
const container = carousel.querySelector('.carousel-container');
const carouselItems = carousel.querySelectorAll('.carousel-item');
const itemWidth = carouselItems[0].offsetWidth;

let currentIndex = 0;
let position = 0;
function swipeSlider() {

    nextButton.addEventListener('click', () => {
        currentIndex += maxVisibleItems;

        if (currentIndex == 6) {
            for (let i = 0; i < 3; i++) {
                carouselItems[i].remove();
            }
            for (let i = 0; i < 3; i++) {
                container.appendChild(carouselItems[Math.floor(Math.random() * carouselItems.length)]);
            }


            // position = position + 100;
            container.style.transform = `transition: 0.5s;`;
            currentIndex = maxVisibleItems;
        }
        else {
            position = position - 100;
            container.style.transform = `translateX(${position}%)`;
        }

        // console.log(carouselItems[Math.random() * (carouselItems.length - 1)]);
    });


    prevButton.addEventListener('click', () => {
        position = position + 100;
        container.style.transform = `translateX(${position}%)`;
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

