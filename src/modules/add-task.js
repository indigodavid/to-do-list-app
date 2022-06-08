import Task from './task.js';
import createLi from './create-li.js';
import getData from './get-data.js';

const input = document.getElementById('new-task');
const button = document.getElementById('add-task');
const alert = document.getElementById('alert');

const addTask = () => {
  const toDoTasks = getData();
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

const addTaskEvent = () => {
  button.addEventListener('click', addTask);
};

export default addTaskEvent;

export { addTask };