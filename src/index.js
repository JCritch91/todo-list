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
todoArray.push(createTodo('Test3', 'Testing purposes2', '07/08/24', '21:00', 'Shopping', '1'))
todoArray.push(createTodo('Test4', 'Testing purposes2', '07/08/24', '21:00', 'Home', '1'))
todoArray.push(createTodo('Test5', 'Testing purposes2', '07/08/24', '21:00', 'Home', '1'))
console.log(todoArray)

projectArray.push(createProject('Default'))
projectArray.push(createProject('Home'))
projectArray.push(createProject('Shopping'))
console.log(projectArray)

renderNav(todoArray, projectArray)
renderTodo(todoArray)
