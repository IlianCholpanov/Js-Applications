function loadRepos() {
   let button = document.querySelector('button');
   button.addEventListener('click', eventHandler);

   function eventHandler() {
      let url = 'https://api.github.com/users/testnakov/repos';
      const httpRequest = new XMLHttpRequest();
      httpRequest.addEventListener('readystatechange', eventHandler2);

      function eventHandler2() {
         if (httpRequest.readyState == 4 && httpRequest.status == 200) {
            document.getElementById("res").textContent = httpRequest.responseText;
         }
      }
      httpRequest.open('GET', url);
      httpRequest.send();
   }
}