import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';
import './style.css';
import createLi from './modules/create-li.js';
import addTaskEvent from './modules/add-task.js';
import getData from './modules/get-data.js';
import updateIndexes from './modules/update-indexes.js'

getData().forEach((task) => createLi(task));


addTaskEvent();
