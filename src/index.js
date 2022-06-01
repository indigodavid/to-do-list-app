import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';
import './style.css';
import Task from './modules/task.js'
import createLi from './modules/create-li';
import addTaskEvent from './modules/add-task';

const toDoTasks = [
    new Task('Do the dishes', 0),
    new Task('Study JS', 1),
    new Task('Complete the project', 2),
];

toDoTasks.forEach((task) => createLi(task));

addTaskEvent();
