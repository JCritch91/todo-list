import { updateStorage } from "./storage";

function deleteProject(projectArray, todoArray, id, name) {
  for (let i = 0; i < todoArray.length; i++) {
    if (todoArray[i].project == name) {
      todoArray[i].project = "";
    }
    updateStorage("todoArray", todoArray);
  }
  for (let i = 0; i < projectArray.length; i++) {
    if (projectArray[i].name == name) {
      projectArray.splice(i, 1);
    }
    updateStorage("projectArray", projectArray);
  }
}

export { deleteProject };
