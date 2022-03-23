
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

export const removeToDo = () => {
  const todos = getToDos();
  const newTodo = todos.filter((todo) => todo.completed !== true);
  newTodo.forEach((todo, index) => todo.index = index + 1);
  console.log(newTodo);
  window.localStorage.setItem('todosStored', JSON.stringify(newTodo));  
}

export const updateToDo = (completedToDo) => {
  const todoList = completedToDo.nextElementSibling;
  
  let todos = getToDos();
  todos.forEach((todo) => {
    if (todo.description === todoList.value){
      let completed = todo.completed;
      todo.completed = !completed;
    }
  });
  window.localStorage.setItem('todosStored', JSON.stringify(todos));
}
