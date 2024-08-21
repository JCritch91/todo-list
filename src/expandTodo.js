import { checkFilter } from "./renderScreen";
import { editTodo } from "./editTodo";
import { updateStorage } from "./storage";

function expandTodo(todoArray, projectArray, id) {
  let div = document.getElementById(id);
  let div3 = document.querySelector(".divThree");

  const expandDiv = (todoArray, projectArray, id) => {
    let div,
      inputDesc,
      inputDate,
      buttonDiv,
      button1,
      button2,
      button3,
      newDiv,
      select,
      option,
      selectionsDiv;

    div = document.getElementById(id);
    div.classList.add("extended");

    newDiv = document.createElement("div");
    newDiv.classList.add("divThree");

    inputDesc = document.createElement("textarea");
    inputDesc.classList.add("extendedEl", "description", "extendedDescription");
    inputDesc.value = todoArray[id].description;

    selectionsDiv = document.createElement("div");
    selectionsDiv.classList.add("selectionsDiv");

    inputDate = document.createElement("input");
    inputDate.classList.add("extendedEl", "date", "extendedDate");
    inputDate.type = "date";
    inputDate.value = todoArray[id].date;

    button1 = document.createElement("button");
    button1.textContent = "Low";
    button1.classList.add(
      "priorityButton",
      "lowButton",
      "extendedEl",
      "extendedButton",
    );

    button2 = document.createElement("button");
    button2.textContent = "Medium";
    button2.classList.add(
      "priorityButton",
      "mediumButton",
      "extendedEl",
      "extendedButton",
    );

    button3 = document.createElement("button");
    button3.textContent = "High";
    button3.classList.add(
      "priorityButton",
      "highButton",
      "extendedEl",
      "extendedButton",
    );

    let currentPriority = todoArray[id].priority;
    currentPriority == "Low"
      ? button1.classList.add("lowSelected", "selected")
      : currentPriority == "Medium"
        ? button2.classList.add("mediumSelected", "selected")
        : button3.classList.add("highSelected", "selected");

    buttonDiv = document.createElement("div");
    buttonDiv.classList.add("buttonContainer");

    select = document.createElement("select");
    select.classList.add("extendedEl", "extendedSelect");

    for (let n = 0; n < projectArray.length; n++) {
      option = document.createElement("option");
      option.value = projectArray[n].name;
      option.text = projectArray[n].name;
      if (projectArray[n].name == todoArray[id].project) {
        option.setAttribute("selected", "selected");
      }
      select.appendChild(option);
    }

    buttonDiv.appendChild(button1);
    buttonDiv.appendChild(button2);
    buttonDiv.appendChild(button3);
    selectionsDiv.appendChild(inputDate);
    selectionsDiv.appendChild(buttonDiv);
    selectionsDiv.appendChild(select);
    newDiv.appendChild(inputDesc);
    newDiv.appendChild(selectionsDiv);
    div.appendChild(newDiv);
  };

  const compressDiv = (todoArray) => {
    for (let n = 0; n < todoArray.length; n++) {
      let currentDiv = document.getElementById(todoArray[n].id);
      if (currentDiv !== null && currentDiv.classList.contains("extended")) {
        editTodo(todoArray, currentDiv.id);
        updateStorage("todoArray", todoArray);
        currentDiv.classList.remove("extended");
        currentDiv.removeChild(div3);
      }
    }
  };

  if (div.classList.contains("extended")) {
    editTodo(todoArray, id);
    updateStorage("todoArray", todoArray);
    checkFilter(todoArray, projectArray);
    div.classList.remove("extended");
    div.removeChild(div3);
  } else {
    compressDiv(todoArray);
    checkFilter(todoArray, projectArray);
    expandDiv(todoArray, projectArray, id);
  }

  document.querySelectorAll(".extendedEl").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  });

  document.querySelectorAll(".priorityButton").forEach((el) => {
    el.addEventListener("click", (e) => {
      let buttons = document.querySelectorAll(".priorityButton");
      buttons.forEach((element) => {
        element.classList.remove(
          "highSelected",
          "mediumSelected",
          "lowSelected",
          "selected",
        );
      });
      e.target.classList.contains("lowButton")
        ? e.target.classList.add("lowSelected", "selected")
        : e.target.classList.contains("mediumButton")
          ? e.target.classList.add("mediumSelected", "selected")
          : e.target.classList.add("highSelected", "selected");
    });
  });
}

export { expandTodo };
