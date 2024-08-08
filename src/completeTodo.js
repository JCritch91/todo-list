function completeTodo(checked, passedTodoArray, i){
    const div = document.getElementById(i)

    const boxChecked = ()=> {
        div.classList.add('checkedTask')
    }

    const boxUnchecked = () => {
        div.classList.remove('checkedTask')
    }

    passedTodoArray[i].completed = checked

    checked == true? boxChecked() : boxUnchecked()
}

export{completeTodo}