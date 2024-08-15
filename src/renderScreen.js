import { completeTodo } from "./completeTodo";
import { expandTodo } from "./expandTodo";
import { createProject, createTodo } from "./constructors"
import { deleteProject } from "./deleteProject";
import { deleteTodo } from "./deleteTodo";
import { storageAvailable, updateStorage } from './storage';



function clearTemp(todoArray, projectArray){

    const sidenav = document.querySelector('.projectList')
    let currentSelected = document.querySelector('.active').id

    sidenav.replaceChildren()
    renderNav(todoArray, projectArray)

    let project = document.querySelectorAll('li')
    project.forEach(el => {
        el.classList.remove('active')
    })
    console.log(currentSelected)
    if (!projectArray.includes(currentSelected)){
                    currentSelected = 'projectAll'
    }
    let select = document.getElementById(`${currentSelected}`)
    select.classList.add('active')
    checkFilter(todoArray, projectArray)
}



function renderNav(todoArray, projectArray){

    let ul, liAdd, liAll

    ul = document.querySelector('.projectList')

    liAdd = document.createElement('div')
    liAdd.classList.add('addProject')
    liAdd.addEventListener('click', ()=>{
        newProjectButton(todoArray, projectArray)
    })

    liAll = document.createElement('li')
    liAll.classList.add('active')
    liAll.textContent = 'All'
    liAll.setAttribute('id', 'projectAll')
    liAll.addEventListener('click', (e) =>{
        renderTodo(todoArray, projectArray)
    })

    ul.appendChild(liAdd)
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
        })

        liDiv.appendChild(li)
        liDiv.appendChild(img)
        ul.appendChild(liDiv)
    }

    sidenav.appendChild(ul)

    const project = document.querySelectorAll('li')
    project.forEach(el => {
        el.addEventListener('click', (e)=>{
            project.forEach(element =>{
                element.classList.remove('active')
            })
            e.target.classList.add('active')
        })
    })
}



function renderTodo(todoArray, projectArray, name ='', unfilteredArray = todoArray){

    noteContainer.replaceChildren()

    for (let i = 0; i<todoArray.length; i++){

        let div, secDiv, input, pTitle, img
        div = document.createElement('div')
        div.classList.add('task', `${todoArray[i].priority}`)
        div.setAttribute('id', todoArray[i].id)
        div.addEventListener('click', () =>{
            expandTodo(unfilteredArray, projectArray, todoArray[i].id, name)
        } )

        secDiv = document.createElement('div')
        secDiv.classList.add('secDiv')

        input = document.createElement('input')
        input.classList.add('checkbox')
        input.type = 'checkbox'
        input.checked = todoArray[i].completed
        input.addEventListener('click', (e)=>{
            e.stopPropagation()
            completeTodo(input.checked, unfilteredArray, todoArray[i].id)
            updateStorage("todoArray", unfilteredArray)
        })

        pTitle = document.createElement('p')
        pTitle.classList.add('taskTitle')
        pTitle.textContent = todoArray[i].title

        img = document.createElement('div')
        img.classList.add('delete')
        img.addEventListener('click', (e)=>{
            e.stopPropagation()
            deleteTodo(unfilteredArray, todoArray[i].id)
            updateStorage("todoArray", unfilteredArray)
            checkFilter(unfilteredArray, projectArray)
        })

        secDiv.appendChild(input)
        secDiv.appendChild(pTitle)
        secDiv.appendChild(img)
        div.appendChild(secDiv)
        noteContainer.appendChild(div)

        completeTodo(input.checked, todoArray, i)
    }

    const newTaskDialog = document.getElementById('newTaskDialog')
    const createTaskButton = document.querySelector('.addTask').addEventListener('click', ()=>{
        let optionRemove = document.getElementById('project').replaceChildren()
        for (let i=0; i<projectArray.length; i++){

            let select = document.getElementById('project')
            let option = document.createElement('option')
            option.value = projectArray[i].name
            option.text = projectArray[i].name
            select.appendChild(option)
        }
        newTaskDialog.showModal()
    })

    const form = document.getElementById('newTaskForm')
    const closeDialog = document.querySelector('.closeButton')
    closeDialog.addEventListener('click', ()=>{
        newTaskDialog.close()
        form.reset
    })

    document.querySelectorAll('.priorityButton').forEach(el=>{
        el.addEventListener('click', (e)=>{
            let buttons = document.querySelectorAll('.priorityButton')
                buttons.forEach(element => {
                element.classList.remove('highSelected', 'mediumSelected', 'lowSelected', 'selected')
            });
            e.target.classList.contains('lowButton')? e.target.classList.add('lowSelected', 'selected'):
            e.target.classList.contains('mediumButton')? e.target.classList.add('mediumSelected', 'selected'):
            e.target.classList.add('highSelected','selected')
        })
    })

}



function filterTodo(todoArray, name, projectArray){

    let filteredArray = todoArray.filter((projectName) => {
        return projectName.project == name
    })

    renderTodo(filteredArray, projectArray, name, todoArray)
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
    newLi.classList.add('tempInput')

    liDiv = document.createElement('div')
    liDiv.classList.add('liTempDiv')

    buttonDiv = document.createElement('div')
    buttonDiv.classList.add('liTempButtonDiv')

    completeButton = document.createElement('button')
    completeButton.classList.add('complete')
    completeButton.textContent= 'Create'
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
                updateStorage("projectArray", projectArray)
               clearTemp(todoArray, projectArray)
           }
        }
    })

    cancelButton = document.createElement('button')
    cancelButton.textContent = 'Cancel'
    cancelButton.addEventListener('click', () =>{
        clearTemp(todoArray, projectArray)
    })

    buttonDiv.appendChild(completeButton)
    buttonDiv.appendChild(cancelButton)
    liDiv.appendChild(newLi)
    liDiv.appendChild(buttonDiv)
    sidenav.appendChild(liDiv)
    
}

function checkFilter(todoArray, projectArray){
    const currentSelected = document.querySelector('.active')
    if (currentSelected.id == 'projectAll'){
        renderTodo(todoArray, projectArray, todoArray)
    } 
    else{
        filterTodo(todoArray, currentSelected.textContent, projectArray)
    }
}


export {renderNav, renderTodo, filterTodo, newProjectButton, checkFilter}