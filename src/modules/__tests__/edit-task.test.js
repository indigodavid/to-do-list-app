import getData from "../get-data.js";
import editTask from "../edit-task.js";
import document from '../__mocks__/domMock.js';
import Task from '../task.js';
import localStorage from '../__mocks__/localStorage.js'

const toDoTasks = [];
toDoTasks.push(new Task('New Taks',1,false));
localStorage.setItem('toDoData', JSON.stringify(toDoTasks));

test('LocalStorage is working', () => {
  
  expect(localStorage.getItem('toDoData')).toBeTruthy();
});

test('DOM is working', () => {
  expect(document.getElementById('task-list')).toBeTruthy();

})