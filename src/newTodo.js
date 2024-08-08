function createTodo(title, description, date, time, project, priority, completed){

    class Todo {
        constructor(title, description, date, time, project, priority, completed){
            this.title = title
            this.description = description
            this.date = date
            this.time = time
            this.project = project
            this.priority = priority
            this.completed = completed
        }
    }

    let newItem = new Todo(title, description, date, time, project, priority, completed = false)

    return newItem
}

export {createTodo}