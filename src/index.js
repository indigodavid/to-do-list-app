import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';
import './style.css';
import Task from './modules/task.js'
import createLi from './modules/create-li';
import addTaskEvent from './modules/add-task';
import getData from './modules/get-data';

getData().forEach((task) => createLi(task));

addTaskEvent();
