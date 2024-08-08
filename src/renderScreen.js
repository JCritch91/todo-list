function renderNav(projectArray){

    let ul, li

    ul = document.createElement('ul')

    for (let i = 0; i<projectArray.length; i++){
        li = document.createElement('li')
        li.textContent = projectArray[i].name
        ul.appendChild(li)
    }

    sidenav.appendChild(ul)
}

function renderTodo(todoArray){

    let div, input, pTitle, pDate, pProject, pPriority

    for (let i = 0; i<todoArray.length; i++){
        div = document.createElement('div')
        div.classList.add('task')

        
        input = document.createElement('input')
        input.type ='checkbox'
        input.checked = todoArray[i].completed
        div.appendChild(input)

        pTitle = document.createElement('p')
        pTitle.textContent = todoArray[i].title
        div.appendChild(pTitle)
    }

    noteContainer.appendChild(div)

}











export {renderNav, renderTodo}