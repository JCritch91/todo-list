import { completeTodo } from "./completeTodo";
import { expandTodo } from "./expandTodo";

function renderNav(passedTodoArray, projectArray){

    let ul, liAll

    ul = document.createElement('ul')
    liAll = document.createElement('li')
    liAll.textContent = 'All'
    liAll.addEventListener('click', () =>{
        renderTodo(passedTodoArray)
    })
    ul.appendChild(liAll)


    for (let i = 0; i<projectArray.length; i++){
        let li
        li = document.createElement('li')
        li.textContent = projectArray[i].name
        li.addEventListener('click', ()=>{
            filterTodo(passedTodoArray, projectArray[i].name)
        })
        ul.appendChild(li)
    }

    sidenav.appendChild(ul)
}

function renderTodo(passedTodoArray){

    noteContainer.replaceChildren()

    for (let i = 0; i<passedTodoArray.length; i++){

        let div, secDiv, input, pTitle, addTaskDiv, pProject, pPriority, img
        div = document.createElement('div')
        div.classList.add('task', `${passedTodoArray[i].priority}`)
        div.setAttribute('id', i)
        div.addEventListener('click', () =>{
            expandTodo(passedTodoArray, i)
        } )

        secDiv = document.createElement('div')
        secDiv.classList.add('secDiv')

        input = document.createElement('input')
        input.type ='checkbox'
        input.checked = passedTodoArray[i].completed
        input.addEventListener('click', (e)=>{
            completeTodo(input.checked, passedTodoArray, i)
        })
        secDiv.appendChild(input)

        pTitle = document.createElement('p')
        pTitle.textContent = passedTodoArray[i].title
        secDiv.appendChild(pTitle)

        img = document.createElement('div')
        img.classList.add('delete')
        img.addEventListener('click', (event)=>{
            passedTodoArray.splice(i,1)
            renderTodo(passedTodoArray)
        })
        secDiv.appendChild(img)
        div.appendChild(secDiv)
        noteContainer.appendChild(div)
        completeTodo(input.checked, passedTodoArray, i)
    }

}

function filterTodo(passedTodoArray, name ='Default'){

    let filteredArray = passedTodoArray.filter((projectName) => {
        return projectName.project == name
    })

    renderTodo(filteredArray)
}

export {renderNav, renderTodo, filterTodo}