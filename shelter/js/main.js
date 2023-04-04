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