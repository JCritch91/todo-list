function renderNav(todoArray, projectArray){

    let ul, li

    ul = document.createElement('ul')

    for (let i = 0; i<projectArray.length; i++){
        li = document.createElement('li')
        li.textContent = projectArray[i].name
        li.addEventListener('click', ()=>{
            renderTodo(todoArray, projectArray[i].name)
        })
        ul.appendChild(li)
    }

    sidenav.appendChild(ul)
}

function renderTodo(todoArray, name ='Default'){

    noteContainer.replaceChildren()

    let filteredArray = todoArray.filter((projectName) => {
        return projectName.project == name
    })

    for (let i = 0; i<filteredArray.length; i++){

        let div, input, pTitle, pDate, pProject, pPriority
        div = document.createElement('div')
        div.classList.add('task')


        input = document.createElement('input')
        input.type ='checkbox'
        input.checked = filteredArray[i].completed
        div.appendChild(input)

        pTitle = document.createElement('p')
        pTitle.textContent = filteredArray[i].title
        div.appendChild(pTitle)
        noteContainer.appendChild(div)
    }

}











export {renderNav, renderTodo}