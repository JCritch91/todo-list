
function editTodo(todoArray, i){
    
    const div = document.getElementById(i)
    const completed = div.querySelector('.checkbox').checked
    const title = div.querySelector('.taskTitle').textContent
    const description = div.querySelector('.extendedDescription').value
    const date = div.querySelector('.extendedDate').value
    const buttons = div.querySelectorAll('.extendedButton')
    const project = div.querySelector('.extendedSelect').value
    let priority 

    buttons.forEach(button => {
        if (button.classList.contains('selected')){
            priority = button.textContent
        }
    })

    todoArray[i].title = title
    todoArray[i].description = description
    todoArray[i].date = date
    todoArray[i].priority = priority
    todoArray[i].project = project
    todoArray[i].completed = completed

}

export {editTodo}