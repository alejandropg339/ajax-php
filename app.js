let verifyEdit = false;

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

const taskForm = document.querySelector('#task-form');

function taskSend() {
    const buttonTaskForm = document.querySelector('#button-task-form');
    const dataName = document.querySelector('#name');
    const dataDescription = document.querySelector('#description');
    const dataId = document.querySelector('#taskId');
    console.log(dataId.value);
    buttonTaskForm.addEventListener('click', e => {
        e.preventDefault();

        const postData = {
            name: dataName.value,
            description: dataDescription.value,
            id: dataId.value
        }
        //console.log(JSON.stringify(postData));
        postTask(postData);

    });
}

async function postTask(postData) {

    try {
        const formData = new FormData();
        formData.append('name', postData.name);
        formData.append('description', postData.description);
        formData.append('id', postData.id);
        const respuestaServer = await fetch("http://localhost:80/php-ajax/TASK-APP/task-add.php", {
            method: 'POST',
            body: formData
        });

        console.log(postData.name + " / " + postData.description);
        let respuestaFinal = await respuestaServer.text();
        console.log(respuestaFinal);
        
        let idInput = document.querySelector('#taskId');
        idInput.value = "";

        let form = document.querySelector('#task-form');
        form.reset();
        fetchTask();
        
    } catch (error) {
        console.error(error);
    }
}

async function fetchTask(){
    const queryInfo = await fetch("http://localhost:80/php-ajax/TASK-APP/task-list.php");
    if (queryInfo.status == 200) {
        //console.log("succes connection");
        const requestServer = await queryInfo.json();
        //console.log(requestServer);
        const requestJson = JSON.parse(requestServer);
        let template = '';
        requestJson.forEach(task => {
            template += `
                <tr TaskId="${task.id}">
                    <td>${task.id}</td>
                    <td>
                        <a href="#" class="task-item">${task.name}</a>
                    </td>
                    <td>${task.desription}</td>
                    <td><button class="btn btn-danger task-delete">Delete</button></td>
                </tr>
            `
        });
        
        let innerTable =  document.querySelector('#task');
        innerTable.innerHTML = template;
    }

    deleteTasks();
    edit();
}


function deleteTasks(){
    const botonEliminar = document.querySelectorAll('.task-delete');
    for(let i = 0; i < botonEliminar.length; i++){
        botonEliminar[i].addEventListener('click',e=>{
            if(confirm('Are you sure you want to delete it?')){
            console.log("Putas mamadas las tuyas wey este es el boton "+[i]);
            //const pruebita =botonEliminar[i].parentElement.parentElement.querySelector('.task-id');
            const idDelete = botonEliminar[i].parentElement.parentElement.getAttribute('TaskId');
            console.log(idDelete);

            removeTask(idDelete);
            fetchTask();
        }});
    }
}; 

async function removeTask(idDelete) {
    const transformId = "id="+idDelete;
    const respuestaHTTP = await fetch('http://localhost:80/php-ajax/TASK-APP/task-delete.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: transformId
    });

    const result = await respuestaHTTP.text();
    console.log(result);
}


function edit(){
    const editTask = document.querySelectorAll('.task-item');
    for(let i=0; i<editTask.length; i++){
        editTask[i].addEventListener('click', e =>{
            //console.log('Esta funcionando');
            const element = editTask[i].parentElement.parentElement.getAttribute('TaskId');
            console.log(element);
            queryReturn(element);
            verifyEdit = true;
        });
        
    }
}

async function queryReturn(id){
    let nameInput = document.querySelector('#name');
    let descriptionInput = document.querySelector('#description');
    let idInput = document.querySelector('#taskId');
    let transformId = "id="+id;
    const respuestaHTTP = await fetch('http://localhost:80/php-ajax/TASK-APP/task-single.php',{
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: transformId
    });
    const result = await respuestaHTTP.json();
    nameInput.value = result.name;
    descriptionInput.value = result.description;
    idInput.value = result.id;
    console.log(result);
    
}
captura();
taskSend();
fetchTask();
edit();

//deleteTasks();