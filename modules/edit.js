export const updateToDoCompleted = (completedToDo) => {
  const todoList = completedToDo.nextElementSibling;
  const todos = getToDos();
  todos.forEach((todo) => {
    if (todo.description === todoList.textContent) {
      let todoCompleted = todo.completed;
      todo.completed = !todoCompleted;
    }
  });
  window.localStorage.setItem('todosStored', JSON.stringify(todos));
};

export const updateToDoListDescription = (newInput, initialValue) => {
  const todos = getToDos();
  todos.forEach((todo) => {
    if (todo.description === initialValue) {
      todo.description = newInput;
    }
  });
  window.localStorage.setItem('todosStored', JSON.stringify(todos));
};