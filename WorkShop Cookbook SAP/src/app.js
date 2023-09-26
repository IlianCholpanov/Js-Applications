import { router } from "./router.js";
import { updateAuth } from "./auth.js";


const navigationElement = document.querySelector('.navigation');
const guestNavigation = document.querySelector('#guest');
const userNavigation = document.querySelector('#user');

userNavigation.style.display = 'inline';
guestNavigation.style.display = 'inline';

router('/');
updateAuth();

navigationElement.addEventListener('click', (e) => {
    e.preventDefault();

    if (e.target.tagName == 'A') {
        let url = new URL(e.target.href);

        document.querySelector('.active').classList.remove('active');
        e.target.classList.add('active');
        router(url.pathname);

    }
});
