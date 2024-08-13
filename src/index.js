import './style.css';
import { createTodo } from "./newTodo";
import { createProject } from "./newProject";
import { filterTodo, renderNav, renderTodo, newProjectButton } from "./renderScreen";


function initiate(){

    const noteContainer = document.getElementById('noteContainer')
    const sidenav = document.getElementById('sidenav')
    const newTaskDialog = document.getElementById('newTaskDialog')
    const addButton = document.querySelector('.addButton')
    const form = document.querySelector('form')
    const createTaskButton = document.querySelector('.addTask')


    const todoArray = []
    const projectArray = []


    todoArray.push(createTodo('Test1', 'Testing purposes', '2024-08-09', 'Default', 'High'))
    todoArray.push(createTodo('Test2', 'Testing purposes2', '2024-08-09', 'Default', 'Medium'))
    todoArray.push(createTodo('Test3', 'Testing purposes2', '2024-08-09','Shopping', 'Low'))
    todoArray.push(createTodo('Test4', 'Testing purposes2', '2024-08-09', 'Home', 'High'))
    todoArray.push(createTodo('Test5', 'Testing purposes2', '2024-08-09', 'Home', 'High'))

    projectArray.push(createProject('Default'))
    projectArray.push(createProject('Home'))
    projectArray.push(createProject('Shopping'))

    renderNav(todoArray, projectArray)
    renderTodo(todoArray, projectArray)

    createTaskButton.addEventListener('click', ()=>{
        for (let i=0; i<projectArray.length; i++){
            let select = document.getElementById('project')
            let option = document.createElement('option')
            option.value = projectArray[i].name
            option.text = projectArray[i].name
            select.appendChild(option)
        }
        newTaskDialog.showModal()
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


    addButton.addEventListener('click', (event)=>{
        event.preventDefault()

        const title = form.querySelector('.title').value
        const description = form.querySelector('.description').value
        const date = form.querySelector('.date').value
        const buttons = form.querySelectorAll('.priorityButton')
        let priority

        buttons.forEach(button => {
            if (button.classList.contains('selected')){
                priority = button.textContent
            }
        });

        todoArray.push(createTodo(title, description, date, 'Default', priority))
        newTaskDialog.close()
        form.reset()
        renderTodo(todoArray, projectArray)
    })

    const closeDialog = document.querySelector('.closeButton')
    closeDialog.addEventListener('click', ()=>{
        newTaskDialog.close()
        form.reset
    })

}

initiate()