import { html, render } from "../node_modules/lit-html/lit-html.js";
import { towns } from "./towns.js"


const searchTemplate = (towns, match) => html`
   <article>
         <div id="towns">
         <ul>
            ${towns.map(t => itemTemplate(t, match))};
         </ul>
         </div>
      <input type="text" id="searchText" />
      <button @click=${search}>Search</button>
      <div id="result">${countMatches(towns, match)}</div>
   </article>              
`;

const itemTemplate = (name, matc) => html`
<li class = ${(matc && name.toLowerCase().includes(matc.toLowerCase()) ? "active" : '')}>${name}</li>
`;

const main = document.body;
update();

function update(pair = '') {
   const result = searchTemplate(towns, pair);
   render(result, main);

}

function search() {
   const input = document.getElementById('searchText');
   const valuedInput = input.value;
   update(valuedInput);
}

function countMatches(towns, duplicate) {
   const matches = towns.filter(c => duplicate && c.toLowerCase().includes(duplicate.toLowerCase())).length;
   console.log(towns);
   return matches ? `${duplicate} matches found.` : ''
}
