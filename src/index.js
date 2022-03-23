import './style.css';
import kebabMenu from './kebab-menu.svg';
import enterIcon from './enter-icon.svg';
import refreshIcon from './Refresh_icon.svg';
import { 
  addToDo, 
  getToDos, 
  removeToDo, 
  updateToDo,
 } from './store';

const form = document.querySelector('.input-form');

const addList = document.querySelector('.enter-icon');

const listItems = document.querySelector('.list-items');

const clearButton = document.querySelector('.clear');

const refreshImg = document.querySelector('.refresh-icon');
refreshImg.src = refreshIcon;

const enterImg = document.querySelector('.enter-icon');
enterImg.src = enterIcon;

const createTodo = (list) => {
  const listItem = document.createElement('li');
    listItem.className = 'list-item';
    listItem.innerHTML = 
    ` 
      <div class="list-container">
        <input type="checkbox" class="checkbox">
        <input type="text" value="${list}" class="todo-list">
      </div>
      <img src="${kebabMenu}" alt="Kebab-menu" class="kebab-icon">
    `;
    listItems.appendChild(listItem);
}

const addTodoItem = () => {
  const list = form.elements.description.value;
  createTodo(list);
  addToDo(list);
  form.elements.description.value = '';
}

const removeToDoItem = () => {
  let listItemArray = [...listItems.childNodes];
  listItemArray.forEach((listItem) => {
    let listItemChild = listItem.firstElementChild;
    if (listItemChild.classList.contains('completed')){
      listItem.remove();
      removeToDo(listItemChild);
    }
  })
}

const updateToDoListCompleted = (completedToDo) => {
  updateToDo(completedToDo);
  let listCompleted = completedToDo.parentNode;
  if (completedToDo.checked === true){
    listCompleted.classList.add('completed');
  } else if (completedToDo.checked === false){
    listCompleted.classList.remove('completed');
  }
}

const populateLists = () => {
  let todos = getToDos();
  todos.forEach((list) => {
    createTodo(list.description);
    list.completed = false;
  });
  window.localStorage.setItem('todosStored', JSON.stringify(todos));
};


document.addEventListener('DOMContentLoaded', () => {
  populateLists();
});

addList.addEventListener('click', addTodoItem);

document.querySelector('.input-form input').addEventListener('keypress', (e) => {
  if (e.key === 'Enter'){
    e.preventDefault();
    addTodoItem();
  }
});

document.addEventListener('click', (e) => {
  if (e.target.type === 'checkbox') {
    let completedToDo = e.target;
    updateToDoListCompleted(completedToDo);
  } 
});

clearButton.addEventListener('click', removeToDoItem);

