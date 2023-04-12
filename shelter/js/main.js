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



// cards creating

const cardsData = [
    {
        image: 'images/ourFriendsSection/pets-katrine.png',
        name: 'Katrine',
        link: 'Learn more',// 1
        type: "Cat",
        breed: "British Shorthair",
        description: "Katrine is a beautiful girl. She is as soft as the finest velvet with a thick lush fur. Will love you until the last breath she takes as long as you are the one. She is picky about her affection. She loves cuddles and to stretch into your hands for a deeper relaxations.",
        age: "6 months",
        inoculations: ["panleukopenia"],
        diseases: ["none"],
        parasites: ["none"]
    },
    {
        image: 'images/ourFriendsSection/pets-jennifer.png',
        name: 'Jennifer',
        link: 'Learn more', // 2
        type: "Dog",
        breed: "Labrador",
        description: "Jennifer is a sweet 2 months old Labrador that is patiently waiting to find a new forever home. This girl really enjoys being able to go outside to run and play, but won't hesitate to play up a storm in the house if she has all of her favorite toys.",
        age: "2 months",
        inoculations: ["none"],
        diseases: ["none"],
        parasites: ["none"]
    },
    {
        image: 'images/ourFriendsSection/pets-woody.png',
        name: 'Woody',
        link: 'Learn more', // 3
        type: "Dog",
        breed: "Golden Retriever",
        description: "Woody is a handsome 3 1/2 year old boy. Woody does know basic commands and is a smart pup. Since he is on the stronger side, he will learn a lot from your training. Woody will be happier when he finds a new family that can spend a lot of time with him.",
        age: "3 years 6 months",
        inoculations: ["adenovirus", "distemper"],
        diseases: ["right back leg mobility reduced"],
        parasites: ["none"]
    },
    {
        image: 'images/ourFriendsSection/pets-sofia.png',
        name: 'Sophia',
        link: 'Learn more', // 4
        type: "Dog",
        breed: "Shih tzu",
        description: "Sophia here and I'm looking for my forever home to live out the best years of my life. I am full of energy. Everyday I'm learning new things, like how to walk on a leash, go potty outside, bark and play with toys and I still need some practice.",
        age: "1 month",
        inoculations: ["parvovirus"],
        diseases: ["none"],
        parasites: ["none"]
    },
    {
        image: 'images/ourFriendsSection/pets-timmy.png',
        name: 'Timmy',
        link: 'Learn more', // 5
        type: "Cat",
        breed: "British Shorthair",
        description: "Timmy is an adorable grey british shorthair male. He loves to play and snuggle. He is neutered and up to date on age appropriate vaccinations. He can be chatty and enjoys being held. Timmy has a lot to say and wants a person to share his thoughts with.",
        age: "2 years 3 months",
        inoculations: ["calicivirus", "viral rhinotracheitis"],
        diseases: ["kidney stones"],
        parasites: ["none"]
    },
    {
        image: 'images/ourFriendsSection/pets-freddie.png',
        name: 'Freddie',
        link: 'Learn more', // 6
        type: "Cat",
        breed: "British Shorthair",
        description: "Freddie is a little shy at first, but very sweet when he warms up. He likes playing with shoe strings and bottle caps. He is quick to learn the rhythms of his human’s daily life. Freddie has bounced around a lot in his life, and is looking to find his forever home.",
        age: "2 months",
        inoculations: ["rabies"],
        diseases: ["none"],
        parasites: ["none"]
    },
    {
        image: 'images/ourFriendsSection/pets-charly.png',
        name: 'Charly',
        link: 'Learn more', // 7
        type: "Dog",
        breed: "Jack Russell Terrier",
        description: "This cute boy, Charly, is three years old and he likes adults and kids. He isn’t fond of many other dogs, so he might do best in a single dog home. Charly has lots of energy, and loves to run and play. We think a fenced yard would make him very happy.",
        age: "8 years",
        inoculations: ["bordetella bronchiseptica", "leptospirosis"],
        diseases: ["deafness", "blindness"],
        parasites: ["lice", "fleas"]
    },
    {
        image: 'images/ourFriendsSection/pets-scarlet.png',
        name: 'Scarlett',
        link: 'Learn more', // 8
        type: "Dog",
        breed: "Jack Russell Terrier",
        description: "Scarlett is a happy, playful girl who will make you laugh and smile. She forms a bond quickly and will make a loyal companion and a wonderful family dog or a good companion for a single individual too since she likes to hang out and be with her human.",
        age: "3 months",
        inoculations: ["parainfluenza"],
        diseases: ["none"],
        parasites: ["none"]
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


let safeElemRight = [];
let safeElemLeft = [];



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
        carouselItems = carousel.querySelectorAll('.carousel-item');
        modalWindow();

    });


    prevButton.addEventListener('click', () => {
        carouselItems = carousel.querySelectorAll('.carousel-item');
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
        carouselItems = carousel.querySelectorAll('.carousel-item');
        modalWindow();
    });
}

function modalWindow() {
    const overlayModal = document.querySelector('.overlay-modal');
    let modalButton;

    carouselItems.forEach((item) => {
        item.addEventListener('click', () => {
            let petName = item.querySelector('.pet-name').textContent;
            cardsData.forEach((cardItem) => {
                if (cardItem.name == petName) {
                    const modal = document.createElement('div');
                    modal.classList.add('modal-item');

                    const modalContainer = document.createElement('div');
                    modalContainer.classList.add('modal-container');

                    modalButton = document.createElement('div');
                    modalButton.classList.add('modal-close');

                    const modalDesk = document.createElement('div');
                    modalDesk.classList.add('modal-item-content');

                    const petName = document.createElement('h3');
                    petName.classList.add('pet-name-modal');
                    petName.textContent = cardItem.name;

                    const petType = document.createElement('p');
                    petType.classList.add('pet-type-modal');
                    petType.textContent = `${cardItem.type} - ${cardItem.breed}`;

                    const petDesk = document.createElement('p');
                    petDesk.classList.add('pet-description-modal');
                    petDesk.textContent = cardItem.description;

                    const petUl = document.createElement('ul');
                    petUl.classList.add('pet-ul-modal');

                    const petAge = document.createElement('li');
                    petAge.classList.add('pet-age');
                    petAge.innerHTML = `<b>Age</b>: ${cardItem.age}`;

                    const petInoculations = document.createElement('li');
                    petInoculations.classList.add('pet-age-inoculations');
                    petInoculations.innerHTML = `<b>Inoculations</b>: ${cardItem.inoculations}`;

                    const petDiseases = document.createElement('li');
                    petDiseases.classList.add('pet-age-diseases');
                    petDiseases.innerHTML = `<b>Diseases</b>: ${cardItem.diseases}`;

                    const petParasites = document.createElement('li');
                    petParasites.classList.add('pet-age-parasites');
                    petParasites.innerHTML = `<b>Parasites</b>: ${cardItem.parasites}`;

                    modalDesk.appendChild(petName);
                    modalDesk.appendChild(petType);
                    modalDesk.appendChild(petDesk);


                    petUl.appendChild(petAge);
                    petUl.appendChild(petInoculations);
                    petUl.appendChild(petDiseases);
                    petUl.appendChild(petParasites);

                    modalDesk.appendChild(petUl);

                    modalContainer.appendChild(modalDesk);
                  

                    modal.appendChild(modalContainer);
                    modal.appendChild(modalButton);


                    if (maxVisibleItems == 3 || maxVisibleItems == 2) {
                        const modalImage = document.createElement('img');
                        modalImage.setAttribute('src', `${cardItem.image}`);
                        modalContainer.appendChild(modalImage);
                    }
                    modalButton.addEventListener("click", function (e) {
                        carousel.removeChild(modal);
                        overlayModal.classList.remove('active');
                        document.querySelector('body').classList.remove('no-overflow');
                    })
                    carousel.appendChild(modal);
                }
                overlayModal.classList.add('active');
                document.querySelector('body').classList.add('no-overflow');
            })
        })
    });

    overlayModal.addEventListener("click", function (e) {
        overlayModal.classList.remove('active');
        document.querySelector('body').classList.remove('no-overflow');
        const modal = document.querySelector('.modal-item');
        if (modal && modal.parentNode === carousel) {
            carousel.removeChild(modal);
        }
    });

    if (overlayModal.classList.contains('active')) {
        document.querySelector('body').classList.add('no-overflow');
    } else {
        document.querySelector('body').classList.remove('no-overflow');
    }


}

swipeSlider();
modalWindow();



