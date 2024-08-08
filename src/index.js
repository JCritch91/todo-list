import './style.css';
import { createTodo } from "./newTodo";
import { createProject } from "./newProject";
import { completeTodo } from "./completeTodo";
import { renderNav } from "./renderScreen";
import { renderTodo } from "./renderScreen";



const noteContainer = document.getElementById('noteCollector')
const sidenav = document.getElementById('sidenav')


const todoArray = []
const projectArray = []


todoArray.push(createTodo('Test1', 'Testing purposes', '07/08/24', '21:00', 'Default', '1'))
todoArray.push(createTodo('Test2', 'Testing purposes2', '07/08/24', '21:00', 'Default', '1'))
console.log(todoArray)

projectArray.push(createProject('Default'))
projectArray.push(createProject('Home'))
projectArray.push(createProject('Shopping'))
console.log(projectArray)

renderNav(projectArray)
renderTodo(todoArray)




