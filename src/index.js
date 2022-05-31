import _ from 'lodash';
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';
import './style.css';

const toDoTasks = [
  {
    description: 'Do the dishes',
    completed: false,
    index: 1,
  },
  {
    description: 'Study JS',
    completed: true,
    index: 2,
  },
  {
    description: 'Correct project',
    completed: false,
    index: 3,
  },
];

const taskList = document.getElementById('task-list');

toDoTasks.forEach((task) => {
  const li = document.createElement('li');
  const input = document.createElement('input');
  const div = document.createElement('div');
  const button = document.createElement('button');

  li.setAttribute('id', `task${task.index}`);
  li.classList.add('task');

  input.checked = task.completed;
  input.setAttribute('type', 'checkbox');
  input.setAttribute('name', `check${task.index}`);
  input.setAttribute('id', `check${task.index}`);
  
  div.classList.add('text');
  div.innerHTML = task.description;
  if(input.checked) {
    div.classList.add('done');
  }

  button.classList.add('options');
  button.innerHTML = '<i class="fa-solid fa-ellipsis-vertical"></i>'

  li.appendChild(input);
  li.appendChild(div);
  li.appendChild(button);

  taskList.appendChild(li);

  input.addEventListener('change', ()=> {
    div.classList.toggle('done');
  })
});
