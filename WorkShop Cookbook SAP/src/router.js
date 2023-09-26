import { renderHome } from "./home.js";
import { renderLogin } from "./login.js";
import { renderRegister } from "./register.js";
import { renderLogOut } from "./logout.js";
import { renderCreate } from "./create.js";
import { renderError } from "./404.js";


const pages = {
    '/': renderHome,
    '/login': renderLogin,
    '/register': renderRegister,
    '/logout': renderLogOut,
    '/create': renderCreate
}

export function router(path) {
    hideContent();

    const render = pages[path] || renderError;
    render();
}

function hideContent() {
    const mainContent = document.querySelector('.main-content');
    for (const section of mainContent.children) {
        section.style.display = 'none';
    }
}