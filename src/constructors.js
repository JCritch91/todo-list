function createProject(name){

    class Project {
        constructor(name) {
            this.name = name
        }
    }

    let newProject = new Project(name)

    return newProject
}


function createTodo(id, title, description, date, project, priority, completed){

    class Todo {
        constructor(id, title, description, date, project, priority, completed = false){
            this.id = id
            this.title = title
            this.description = description
            this.date = date
            this.project = project
            this.priority = priority
            this.completed = completed
        }
    }

    let newItem = new Todo(id, title, description, date, project, priority, completed)

    return newItem 
}

export {createProject, createTodo}