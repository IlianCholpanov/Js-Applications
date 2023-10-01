import { html, render } from "../node_modules/lit-html/lit-html.js";

document.getElementById('btnLoadTowns').addEventListener('click', getTowns);

const listTemplate = (towns) => html`
<ul>
    ${towns.map(town => html`<li>${town}</li>`)}
</ul>
`

function getTowns(e) {
    if (document.getElementById('towns').value != '') {
        e.preventDefault();

        const root = document.getElementById('root');
        const input = document.getElementById('towns').value.split(', ');

        const result = listTemplate(input);

        render(result, root);

        document.getElementById('towns').value = '';
    }

}
