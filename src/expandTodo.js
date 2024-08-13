import { filterTodo, renderTodo } from "./renderScreen"
import { editTodo } from "./editTodo";

function expandTodo(todoArray, projectArray, i, name){

    let div = document.getElementById(i)
    let div2 = document.querySelector('.divThree')


    const expandDiv = (todoArray, projectArray, i) =>{

    
        let div, inputDesc, inputDate, buttonDiv, button1, button2, button3, newDiv, select, option, selectionsDiv

        div = document.getElementById(i)
        div.classList.add('extended')

        newDiv = document.createElement('div')
        newDiv.classList.add('divThree')

        inputDesc = document.createElement('textarea')
        inputDesc.classList.add('extendedEl', 'description', 'extendedDescription')
        inputDesc.value = todoArray[i].description
        newDiv.appendChild(inputDesc)

        selectionsDiv = document.createElement('div')
        selectionsDiv.classList.add('selectionsDiv')

        inputDate = document.createElement('input')
        inputDate.classList.add('extendedEl', 'date', 'extendedDate')
        inputDate.type ='date'
        inputDate.value = todoArray[i].date
        selectionsDiv.appendChild(inputDate)

        button1 = document.createElement('button')
        button1.textContent = 'Low'
        button1.classList.add('priorityButton', 'lowButton', 'extendedEl', 'extendedButton')

        button2 = document.createElement('button')
        button2.textContent = 'Medium'
        button2.classList.add('priorityButton', 'mediumButton', 'extendedEl', 'extendedButton')

        button3 = document.createElement('button')
        button3.textContent = 'High'
        button3.classList.add('priorityButton', 'highButton', 'extendedEl', 'extendedButton')
        
        let currentPriority = todoArray[i].priority
        currentPriority == 'Low'? button1.classList.add('lowSelected', 'selected'):
        currentPriority == 'Medium'? button2.classList.add('mediumSelected', 'selected'):
        button3.classList.add('highSelected', 'selected')

        buttonDiv=document.createElement('div')
        buttonDiv.classList.add('buttonContainer')
        buttonDiv.appendChild(button1)
        buttonDiv.appendChild(button2)
        buttonDiv.appendChild(button3)
        selectionsDiv.appendChild(buttonDiv)

        select = document.createElement('select')
        select.classList.add('extendedEl', 'extendedSelect')

        for (let n=0; n<projectArray.length; n++){
            option = document.createElement('option')
            option.value = projectArray[n].name
            option.text = projectArray[n].name
            if (projectArray[n].name == todoArray[i].project){
                option.setAttribute('selected', 'selected')
            }
            select.appendChild(option)
        }
        select.addEventListener('click', (e)=>{
            e.stopPropagation()
        })
        selectionsDiv.appendChild(select)
        newDiv.appendChild(selectionsDiv)
        div.appendChild(newDiv)
        document.querySelectorAll('.extendedEl').forEach(el =>{
            el.addEventListener('click', (e)=>{
                e.stopPropagation()
            })
        })

        document.querySelectorAll('.priorityButton').forEach(el=>{
            el.addEventListener('click', (e)=>{
                let buttons = document.querySelectorAll('.priorityButton')
                    buttons.forEach(element => {
                    element.classList.remove('highSelected', 'mediumSelected', 'lowSelected', 'selected')
                });
                e.target.classList.contains('lowButton')? e.target.classList.add('lowSelected', 'selected'):
                e.target.classList.contains('mediumButton')? e.target.classList.add('mediumSelected', 'selected'):
                e.target.classList.add('highSelected','selected')
            })
        })
        
    }

     const compressDiv = (todoArray, i) => {
        for (i = 0; i< todoArray.length; i++){
            let div = document.getElementById(i)
            let div2 = document.querySelector('.divThree')
            if (div.classList.contains('extended')){

                div.classList.remove('extended')
                div.removeChild(div2)
            }
        }
    }

    if (div.classList.contains('extended')){
        editTodo(todoArray, i)
            if (name == ''){ 
                console.log('After Edit')
                console.log(todoArray)
                renderTodo(todoArray, projectArray)
            }
            else{ 
                filterTodo(todoArray, name, projectArray) 
            }
        div.classList.remove('extended')
        div.removeChild(div2)
    }
    else{
    compressDiv(todoArray, i)
    expandDiv(todoArray, projectArray, i)
    }
}

export{expandTodo}