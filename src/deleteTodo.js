function deleteTodo(todoArray, i) {
  todoArray.splice(i, 1);
  for (let n = 0; n < todoArray.length; n++) {
    todoArray[n].id = n;
  }
}

export { deleteTodo };
