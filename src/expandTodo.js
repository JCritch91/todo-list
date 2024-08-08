function expandTodo(todoArray, i){

    let div = document.getElementById(i)
    let div2 = document.querySelector('.divThree')


    
    const expandDiv = (todoArray, i) =>{
    
        let div, descP, dateP, priorityP, projectP, newDiv

        div = document.getElementById(i)
        div.classList.add('extended')

        newDiv = document.createElement('div')
        newDiv.classList.add('divThree')

        descP = document.createElement('p')
        descP.textContent = todoArray[i].description
        newDiv.appendChild(descP)

        dateP = document.createElement('p')
        dateP.textContent = todoArray[i].date
        newDiv.appendChild(dateP)

        priorityP = document.createElement('p')
        priorityP.textContent = todoArray[i].priority
        newDiv.appendChild(priorityP)

        projectP = document.createElement('p')
        projectP.textContent = todoArray[i].project
        newDiv.appendChild(projectP)

        div.appendChild(newDiv)
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
        div.classList.remove('extended')
        div.removeChild(div2)
    }
    else{
    compressDiv(todoArray, i)
    expandDiv(todoArray, i)
    }
}

export{expandTodo}