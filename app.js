function captura() {
    const busqueda = document.querySelector('#search');
    busqueda.addEventListener('input', (e) => {
        //console.log(e.target.value);
        if (e.target.value) {
            let chars = "search=" + e.target.value;
            search(chars);
        } else {
            chars = "";
            search(chars);
        }
    });

}



async function search(chars) {
    if (chars != "") {
        const respuestaHTTP = await fetch('http://localhost:80/php-ajax/TASK-APP/task-search.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: chars
        });
        //console.log(chars);
        let respusetaBusqueda = await respuestaHTTP.json();
        let template = '';
        respusetaBusqueda.forEach(task => {
            //console.log(task.name);
            template += `<li>
            ${task.name}
        </li>`
        });
        const ocult = document.querySelector('#task-result');
        const cardOcult = document.querySelector('#card-ocult');

        ocult.classList.remove("hide-elements");
        cardOcult.classList.remove("hide-elements");

        let showResult = document.querySelector('#container');
        showResult.innerHTML = template;
    } else {
        let showResult = document.querySelector('#container');
        const ocult = document.querySelector('#task-result');
        const cardOcult = document.querySelector('#card-ocult');
        
        ocult.classList.add("hide-elements");
        cardOcult.classList.add("hide-elements");
        showResult.innerHTML = '';
    }
}

captura();