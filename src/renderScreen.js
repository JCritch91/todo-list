import { completeTodo } from "./completeTodo";
import { expandTodo } from "./expandTodo";
import { createProject } from "./newProject"
import { deleteProject } from "./deleteProject";

function clearTemp(todoArray, projectArray){
    const sidenav = document.querySelector('.projectList')
    const liTempDiv = document.querySelector('.liTempDiv')
    const currentSelected = document.querySelector('.active').id
    console.log(currentSelected)
    sidenav.replaceChildren()
    renderNav(todoArray, projectArray)
    let project = document.querySelectorAll('li')
    project.forEach(el => {
        el.classList.remove('active')
    })
    console.log(currentSelected)
    let select = document.getElementById(`${currentSelected}`)
    select.classList.add('active')
}

function renderNav(todoArray, projectArray){
    let ul, liAdd, liAll, project

    ul = document.querySelector('.projectList')
    liAll = document.createElement('li')
    liAdd = document.createElement('div')
    liAdd.classList.add('addProject')
    liAdd.addEventListener('click', ()=>{
        newProjectButton(todoArray, projectArray)
    })
    ul.appendChild(liAdd)
    liAll.textContent = 'All'
    liAll.classList.add('active')
    liAll.setAttribute('id', 'projectAll')
    liAll.addEventListener('click', () =>{
        renderTodo(todoArray, projectArray)
        project = document.querySelectorAll('li')
        project.forEach(el => {
            el.classList.remove('active')
        })
        liAll.classList.add('active')
    })
    ul.appendChild(liAll)


    for (let i = 0; i<projectArray.length; i++){
        let li, img, liDiv
        liDiv = document.createElement('div')
        liDiv.classList.add('liDiv')
        img = document.createElement('div')
        img.classList.add('deleteProject')
        img.addEventListener('click', ()=>{
            deleteProject(projectArray, todoArray, i, projectArray[i].name)
            clearTemp(todoArray, projectArray)
        })
        li = document.createElement('li')
        li.textContent = projectArray[i].name
        li.setAttribute('id', `project${projectArray[i].name}`)
        li.addEventListener('click', ()=>{
            filterTodo(todoArray, projectArray[i].name, projectArray)
            project = document.querySelectorAll('li')
            project.forEach(el => {
                el.classList.remove('active')
            })
            li.classList.add('active')
        })
        liDiv.appendChild(li)
        liDiv.appendChild(img)
        ul.appendChild(liDiv)
    }
    sidenav.appendChild(ul)
}

function renderTodo(todoArray, projectArray, name =''){

    noteContainer.replaceChildren()

    console.log(`Rendered todo`)
    console.log(todoArray)

    for (let i = 0; i<todoArray.length; i++){

        let div, secDiv, input, pTitle, addTaskDiv, pProject, pPriority, img
        div = document.createElement('div')
        div.classList.add('task', `${todoArray[i].priority}`)
        div.setAttribute('id', i)
        div.addEventListener('click', () =>{
            expandTodo(todoArray, projectArray, i, name)
        } )

        secDiv = document.createElement('div')
        secDiv.classList.add('secDiv')

        input = document.createElement('input')
        input.classList.add('checkbox')
        input.type ='checkbox'
        input.checked = todoArray[i].completed
        input.addEventListener('click', (e)=>{
            e.stopPropagation()
            completeTodo(input.checked, todoArray, i)
        })
        secDiv.appendChild(input)

        pTitle = document.createElement('p')
        pTitle.textContent = todoArray[i].title
        pTitle.classList.add('taskTitle')
        secDiv.appendChild(pTitle)

        img = document.createElement('div')
        img.classList.add('delete')
        img.addEventListener('click', (event)=>{
            event.stopPropagation()
            todoArray.splice(i,1)
            renderTodo(todoArray, projectArray)
        })
        secDiv.appendChild(img)
        div.appendChild(secDiv)
        noteContainer.appendChild(div)
        completeTodo(input.checked, todoArray, i)
    }

}

function filterTodo(todoArray, name, projectArray){

    let filteredArray = todoArray.filter((projectName) => {
        return projectName.project == name
    })
    console.log(`Filtered Array`)
    console.log(filteredArray)
    renderTodo(filteredArray, projectArray, name)
}

function newProjectButton(todoArray, projectArray){
    let temp = document.querySelector('.addProject')
    if (temp.classList.contains('temp')){
        return
    }

    const addProjectButton = document.querySelector('.addProject').classList.add('temp')

    let liDiv, newLi, buttonDiv, completeButton, cancelButton, sidenav

    sidenav = document.querySelector('.projectList')

    newLi = document.createElement('input')
    liDiv = document.createElement('div')
    buttonDiv = document.createElement('div')
    completeButton = document.createElement('button')
    cancelButton = document.createElement('button')

    liDiv.classList.add('liTempDiv')
    buttonDiv.classList.add('liTempButtonDiv')
    newLi.classList.add('tempInput')
    completeButton.classList.add('complete')

    completeButton.textContent= 'Create'
    cancelButton.textContent = 'Cancel'

    buttonDiv.appendChild(completeButton)
    buttonDiv.appendChild(cancelButton)
    liDiv.appendChild(newLi)
    liDiv.appendChild(buttonDiv)
    sidenav.appendChild(liDiv)

    const completeButtonRendered = document.querySelector('.complete')



    cancelButton.addEventListener('click', () =>{
        clearTemp(todoArray, projectArray)
    })

    completeButton.addEventListener('click', ()=>{
        const tempInput = document.querySelector('.tempInput')
        let dup = false
        if (tempInput.value !== ''){
            for (let i=0; i<projectArray.length; i++){
                if (projectArray[i].name == tempInput.value){
                    dup = true
                    alert(`"${tempInput.value}" already exists`)
                    clearTemp(todoArray,projectArray)
                    newProjectButton(todoArray, projectArray)
                }
                else{
                    dup = false
                }
            }
            if (dup == false){
                projectArray.push(createProject(tempInput.value))
               console.log(projectArray)
               clearTemp(todoArray, projectArray)
           }
        }
    })

}

export {renderNav, renderTodo, filterTodo, newProjectButton}