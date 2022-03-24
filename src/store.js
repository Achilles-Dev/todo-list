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

export const removeToDo = () => {
  const todos = getToDos();
  const newTodo = todos.filter((todo) => todo.completed !== true);
  newTodo.forEach((todo, index) => {
    todo.index = index + 1;
  });

  window.localStorage.setItem('todosStored', JSON.stringify(newTodo));
};

export const updateToDoCompleted = (completedToDo) => {
  const todoList = completedToDo.nextElementSibling;
  const todos = getToDos();
  todos.forEach((todo) => {
    if (todo.description === todoList.textContent) {
      const completed  = todo.completed;
      todo.completed = !completed;
    }
  });
  window.localStorage.setItem('todosStored', JSON.stringify(todos));
};

export const updateToDoListDescription = (newInput, initialValue) => {
  console.log(newInput.value);
  const todos = getToDos();
  todos.forEach((todo) => {
    if (todo.description === initialValue) {
      todo.description = newInput;
    }
  });
  window.localStorage.setItem('todosStored', JSON.stringify(todos));
};