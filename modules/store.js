export const getToDos = () => {
  let todos;
  if (localStorage.getItem('todosStored') === null) {
    todos = [];
  } else {
    todos = JSON.parse(window.localStorage.getItem('todosStored'));
  }
  return todos;
};

export const addToDo = (description) => {
  const todos = getToDos();
  const index = todos.length + 1;
  const completed = false;
  const todo = {
    description,
    completed,
    index,
  };
  todos.push(todo);
  window.localStorage.setItem('todosStored', JSON.stringify(todos));
};
