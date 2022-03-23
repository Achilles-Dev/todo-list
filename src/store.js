
export const getToDos = () => {
  let todos;
  if (localStorage.getItem('todosStored') === null) {
    todos = [];
  } else {
    todos = JSON.parse(window.localStorage.getItem('todosStored'));
  }
  return todos;
}

export const addToDo = (description) => {
  const todos = getToDos();
  let index = todos.length + 1;
  let completed = false
  let todo = {
    description,
    completed,
    index
  }
  todos.push(todo);
  window.localStorage.setItem('todosStored', JSON.stringify(todos));
}

