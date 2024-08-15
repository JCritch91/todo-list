import './style.css';
import { filterTodo, renderNav, renderTodo, checkFilter } from "./renderScreen";
import { createProject, createTodo } from "./constructors"
import { storageAvailable, updateStorage } from './storage';

function initiate(){

    let todoArray = []
    let projectArray = []

    const generateDemoTodoData = () =>{
        todoArray.push(createTodo('0','Feed the dog', '1 cup full of dry food. Dont forget to give him water !', '2025-08-09', 'Pets', 'High'))
        todoArray.push(createTodo('1','Water fountain filter', 'Change cat water fountain filter. Order more if we have run out', '2026-08-09', 'Pets', 'Low'))
        todoArray.push(createTodo('2','Kitchen touchups', 'Paint the white kitchen touchups before the floor gets fitted. Clean up the mess after.', '2025-08-09','Home', 'Medium'))
        todoArray.push(createTodo('3','Eggs', 'Buy eggs', '2024-08-09', 'Shopping', 'Low'))
        todoArray.push(createTodo('4','Bread', 'Buy bread', '2024-08-09', 'Shopping', 'High'))
        todoArray.push(createTodo('5', 'Orange Juice', 'Buy orange juice. (Not from concentrate)', '2024-08-09', 'Shopping', 'Medium'))
        todoArray.push(createTodo('6','Learn Webkit', 'Get a good working understanding of using webkit for building websites and modules', '2024-08-09', 'Coding', 'High', true))
        todoArray.push(createTodo('7','Tidy up code', 'Go back over this code and try to tidy it up. Try to group more processes so the functions arent so bulky', '2024-08-18', 'Coding', 'Medium'))
    }

    const generateDemoProjectData = () =>{
        projectArray.push(createProject('Pets'))
        projectArray.push(createProject('Home'))
        projectArray.push(createProject('Shopping'))
        projectArray.push(createProject('Coding'))
    }

    if (storageAvailable("localStorage")) {
        if (!localStorage.getItem("todoArray")){
            generateDemoTodoData()
            updateStorage("todoArray", todoArray)
        }
        else{
            let storedTodoArray = JSON.parse(localStorage.getItem("todoArray"))
            todoArray = storedTodoArray
            if (todoArray.length ==0){
                generateDemoTodoData()  }
        }
        if (!localStorage.getItem("projectArray")){
            generateDemoProjectData()
            updateStorage("projectArray", todoArray)
        }
        else{
            let storedProjectArray = JSON.parse(localStorage.getItem("projectArray"))
            projectArray = storedProjectArray
            if (projectArray.length ==0){
                generateDemoProjectData()
            }
        }
      } else {
        generateDemoTodoData()
        generateDemoTodoData()
      }

    renderNav(todoArray, projectArray)
    renderTodo(todoArray, projectArray)

    const form = document.querySelector('form')
    const addButton = document.querySelector('.addButton')
    addButton.addEventListener('click', (event)=>{
        event.preventDefault()
        const title = document.querySelector('.title').value
        const description = form.querySelector('.description').value
        const date = form.querySelector('.date').value
        const buttons = form.querySelectorAll('.priorityButton')
        const project = document.getElementById('project').value
        let priority

        buttons.forEach(button => {
            if (button.classList.contains('selected')){
                priority = button.textContent
            }
        });

        todoArray.push(createTodo(todoArray.length, title, description, date, project, priority, false))
        updateStorage("todoArray", todoArray)
        newTaskDialog.close()
        form.reset()
        checkFilter(todoArray, projectArray)
    })
}

initiate()