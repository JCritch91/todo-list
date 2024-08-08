import './style.css';
import { createTodo } from "./newTodo";
import { createProject } from "./newProject";
import { completeTodo } from "./completeTodo";
import { renderNav, renderTodo, renderFilteredTodo } from "./renderScreen";


function initiate(){

    const noteContainer = document.getElementById('noteContainer')
    const sidenav = document.getElementById('sidenav')


    const todoArray = []
    const projectArray = []


    todoArray.push(createTodo('Test1', 'Testing purposes', '07/08/24', 'Default', 'Pr1'))
    todoArray.push(createTodo('Test2', 'Testing purposes2', '07/08/24', 'Default', 'Pr2'))
    todoArray.push(createTodo('Test3', 'Testing purposes2', '07/08/24','Shopping', 'Pr3'))
    todoArray.push(createTodo('Test4', 'Testing purposes2', '07/08/24', 'Home', 'Pr1'))
    todoArray.push(createTodo('Test5', 'Testing purposes2', '07/08/24', 'Home', 'Pr1'))

    projectArray.push(createProject('Default'))
    projectArray.push(createProject('Home'))
    projectArray.push(createProject('Shopping'))

    renderNav(todoArray, projectArray)
    renderTodo(todoArray)

    noteContainer.addEventListener('click', ()=>{
        console.log(todoArray)
    })

    const newTaskDialog = document.getElementById('newTaskDialog')
    const addButton = document.querySelector('.addButton')
    const form = document.querySelector('form')

    let createTask = document.querySelector('.addTask')
    createTask.addEventListener('click', ()=>{
        for (let i=0; i<projectArray.length; i++){
            let select = document.getElementById('project')
            let option = document.createElement('option')
            option.value = projectArray[i].name
            option.text = projectArray[i].name
            select.appendChild(option)
        }

        newTaskDialog.showModal()
    })

    addButton.addEventListener('click', (event)=>{
        event.preventDefault

        const title = form.querySelector('.title').value
        const description = form.querySelector('.description').value
        const date = form.querySelector('.date').value
        const priority = form.querySelector('input[name=priority]:checked')
        todoArray.push(createTodo(title, description, date, 'Default', priority.value))
        newTaskDialog.close()
        form.reset()
        renderTodo(todoArray)
    })

    const closeDialog = document.querySelector('.closeButton')
    closeDialog.addEventListener('click', ()=>{
        newTaskDialog.close()
        form.reset
    })

}

initiate()