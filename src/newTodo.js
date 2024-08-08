function createTodo(title, description, date, project, priority, completed){

    console.log(title + description + date + project + priority + completed)

    class Todo {
        constructor(title, description, date, project, priority, completed){
            this.title = title
            this.description = description
            this.date = date
            this.project = project
            this.priority = priority
            this.completed = completed
        }
    }

    let newItem = new Todo(title, description, date, project, priority, completed = false)

    return newItem
}

export {createTodo}