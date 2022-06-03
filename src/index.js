import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';
import './style.css';
import createLi from './modules/create-li.js';
import addTaskEvent from './modules/add-task.js';
import getData from './modules/get-data.js';
import clearCompleted from './modules/clear-completed.js';

getData().forEach((task) => createLi(task));
clearCompleted();
addTaskEvent();
