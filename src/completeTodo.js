function completeTodo(checked, todoArray, i){

    const div = document.getElementById(todoArray[i].id)

    const boxChecked = ()=> {
        div.classList.add('checkedTask')
    }

    const boxUnchecked = () => {
        div.classList.remove('checkedTask')
    }
    todoArray[i].completed = checked

    checked == true? boxChecked() : boxUnchecked()
}

export{completeTodo}