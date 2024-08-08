function createProject(name){

    class Project {
        constructor(name) {
            this.name = name
        }
    }

    let newProject = new Project(name)

    return newProject
}

export {createProject}