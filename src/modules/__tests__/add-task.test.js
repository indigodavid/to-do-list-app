// const addTask = require('../add-task.js');

import Task from '../task.js';

const jsdom = require('jsdom');

const { JSDOM } = jsdom;
// Storage Mock
function storageMock() {
  const storage = {};

  return {
    setItem(key, value) {
      storage[key] = value || '';
    },
    getItem(key) {
      return key in storage ? storage[key] : null;
    },
    removeItem(key) {
      delete storage[key];
    },
    get length() {
      return Object.keys(storage).length;
    },
    key(i) {
      const keys = Object.keys(storage);
      return keys[i] || null;
    },
  };
}

const localStorage = storageMock();

const dom = new JSDOM(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>To-Do List App</title>
</head>
<body>
  <main>
    <h1>To-Do List App</h1>
    <div class="box">
      <div class="head">
        <h2>Today's To Do</h2>
        <button id="refresh" type="button"><i class="fa-solid fa-arrows-rotate"></i></button>
      </div>
      <div id="new-wrapper">
        <div id="alert"></div>
        <input type="text" name="new-task" id="new-task" placeholder="Add to your list...">
        <button id="add-task" type="button"><i class="fa-solid fa-arrow-turn-down"></i></button>
      </div>
      <div id="list-wrapper">
        <ul id="task-list">
          <!-- Generated via index.js -->
        </ul>
        <button id="clear" type="button">Clear all completed</button>
      </div>
    </div>
  </main>
</body>
</html>
`);

const taskList = dom.window.document.getElementById('task-list');

const createLi = jest.fn((task) => {
  const li = dom.window.document.createElement('li');
  const checkbox = dom.window.document.createElement('input');
  const div = dom.window.document.createElement('div');
  const button = dom.window.document.createElement('button');
  const removeButton = dom.window.document.createElement('button');
  const textInput = dom.window.document.createElement('input');

  // Set List element id and class
  li.setAttribute('id', `task${task.index}`);
  li.classList.add('task');
  li.setAttribute('draggable', 'true');

  // Set checkbox attributes
  checkbox.checked = task.completed;
  checkbox.classList.add('check');
  checkbox.setAttribute('type', 'checkbox');
  checkbox.setAttribute('name', `check${task.index}`);
  checkbox.setAttribute('id', `check${task.index}`);

  // Set text input attributes
  textInput.classList.add('edit');
  textInput.setAttribute('type', 'text');
  textInput.setAttribute('name', `text${task.index}`);
  textInput.setAttribute('id', `text${task.index}`);
  textInput.value = task.description;

  // Set div classes and content
  div.classList.add('text');
  div.innerHTML = task.description;
  if (checkbox.checked) {
    div.classList.add('done');
  }

  // Set options button class and content
  button.classList.add('options');
  button.innerHTML = '<i class="fa-solid fa-ellipsis-vertical"></i>';

  // Set remove button class and content
  removeButton.classList.add('remove');
  removeButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';

  // Append all elements to li in order
  li.append(checkbox, div, textInput, removeButton, button);
  taskList.appendChild(li);
});

// jest.mocks('../__mocks__/create-li');
const input = dom.window.document.getElementById('new-task');
const alert = dom.window.document.getElementById('alert');
input.value = 'New task';
const toDoTasks = [];

const addTask = () => {
  if (input.value) {
    const task = new Task(input.value, toDoTasks.length + 1);
    createLi(task);
    toDoTasks.push(task);
    localStorage.setItem('toDoData', JSON.stringify(toDoTasks));
    input.value = '';
  } else {
    alert.innerHTML = 'Task field is empty! Please try again';
    alert.style.display = 'block';
    setTimeout(() => {
      alert.style.display = 'none';
    }, 3000);
  }
};

addTask();

describe('Add Task tests', () => {
  test('Check if input is empty after the adding the task', () => {
    expect(input.value).toBe('');
  });

  test('Check if new task has been added', () => {
    expect(toDoTasks.length).toBe(1);
  });

  test('Check the content of the new task', () => {
    expect(toDoTasks[0].description).toBe('New task');
  });

  test('Check that a new li has been added', () => {
    expect(dom.window.document.querySelector('.task')).toBeTruthy();
  });
});
