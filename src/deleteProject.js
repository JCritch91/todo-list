function deleteProject(projectArray, todoArray, id, name){
    for (let i=0; i<todoArray.length; i++){
        if (todoArray[i].project == name){
            todoArray[i].project = ''
        }
    }
    for (let i=0; i<projectArray.length; i++){
        if (projectArray[i].name == name){
        projectArray.splice(i,1)
        }
    }

}

export {deleteProject}