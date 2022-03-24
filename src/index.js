import './style.css';
import kebabMenu from './kebab-menu.svg';
import enterIcon from './enter-icon.svg';
import refreshIcon from './Refresh_icon.svg';
import {
  addToDo,
  getToDos
} from '../modules/store.js';
import {
  updateToDoCompleted,
  updateToDoListDescription
} from '../modules/edit.js';
import {
  removeToDo
} from '../modules/clear.js';

const form = document.querySelector('.input-form');

const addList = document.querySelector('.enter-icon');

const listItems = document.querySelector('.list-items');

const clearButton = document.querySelector('.clear');

const refreshImg = document.querySelector('.refresh-icon');
refreshImg.src = refreshIcon;

const enterImg = document.querySelector('.enter-icon');
enterImg.src = enterIcon;

// Get Initial value of Label;
let initialValue;

const createTodo = (list) => {
  const listItem = document.createElement('li');
  listItem.className = 'list-item';
  listItem.innerHTML = ` 
      <div class="list-container">
        <input type="checkbox" class="checkbox">
        <label class="todo-list">${list}</label>
      </div>
      <img src="${kebabMenu}" alt="Kebab-menu" class="kebab-icon">
    `;
  listItems.appendChild(listItem);
};

const addTodoItem = () => {
  const list = form.elements.description.value;
  createTodo(list);
  addToDo(list);
  form.elements.description.value = '';
};

const removeToDoItem = () => {
  const listItemArray = [...listItems.childNodes];
  listItemArray.forEach((listItem) => {
    const listItemChild = listItem.firstElementChild;
    if (listItemChild.classList.contains('completed')) {
      listItem.remove();
      removeToDo(listItemChild);
    }
  });
};

const updateToDoListCompleted = (completedToDo) => {
  updateToDoCompleted(completedToDo);
  const listCompleted = completedToDo.parentNode;
  console.log(listCompleted);
  if (completedToDo.checked === true) {
    listCompleted.classList.add('completed');
  } else if (completedToDo.checked === false) {
    listCompleted.classList.remove('completed');
  }
};

const updateToDoList = (e) => {
  if (e.target.value.length > 0 && (e.key === 'Enter' || e.type === 'click')) {
    const label = document.createElement('label');
    label.className = 'todo-list';
    label.textContent = e.target.value;
    e.target.replaceWith(label);
    updateToDoListDescription(e.target.value, initialValue);
  } else if (e.target.value.length === 0 && (e.key === 'Enter' || e.type === 'click')) {
    const label = document.createElement('label');
    label.className = 'todo-list';
    label.textContent = initialValue;
    e.target.replaceWith(label);
  }
};

const editToDoList = (e) => {
  const item = e.target.innerHTML;
  initialValue = item;
  const itemInput = document.createElement('input');
  itemInput.type = 'text';
  itemInput.value = item;
  itemInput.classList.add('todo-edit');
  itemInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      updateToDoList(e);
    }
  });
  itemInput.addEventListener('click', updateToDoList);
  e.target.replaceWith(itemInput);
  itemInput.select();
};

const populateLists = () => {
  const todos = getToDos();
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
  if (e.key === 'Enter') {
    e.preventDefault();
    addTodoItem();
  }
});

document.addEventListener('click', (e) => {
  if (e.target.type === 'checkbox') {
    updateToDoListCompleted(e.target);
  } else if (e.target.classList.contains('todo-edit')) {
    updateToDoList(e);
  }
});

document.addEventListener('dblclick', (e) => {
  if (e.target.classList.contains('todo-list')) {
    editToDoList(e);
  }
});

clearButton.addEventListener('click', removeToDoItem);
