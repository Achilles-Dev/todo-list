export const removeToDo = () => {
  const todos = getToDos();
  const newTodo = todos.filter((todo) => todo.completed !== true);
  newTodo.forEach((todo, index) => {
    todo.index = index + 1;
  });

  window.localStorage.setItem('todosStored', JSON.stringify(newTodo));
};