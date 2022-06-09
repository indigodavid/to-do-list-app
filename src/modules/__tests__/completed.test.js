import Task from '../task.js';
import { localStorage } from '../__mocks__/localStorage.js';
import document from '../__mocks__/domMock.js';

const updateIndexes = () => {
  const allLis = document.querySelectorAll('.task');
  const newToDoList = [];
  allLis.forEach((li, index) => {
    // Change the li id
    const newIndex = index + 1;
    li.setAttribute('id', `task${newIndex}`);

    // Obtain the elements of the current li
    const checkbox = li.querySelector('.check');
    const div = li.querySelector('.text');
    const textInput = li.querySelector('.edit');

    // Change the unique attributes of the elements
    checkbox.setAttribute('name', `check${newIndex}`);
    checkbox.setAttribute('id', `check${newIndex}`);

    textInput.setAttribute('name', `text${newIndex}`);
    textInput.setAttribute('id', `text${newIndex}`);

    newToDoList.push(new Task(div.innerHTML, newIndex, checkbox.checked));
  });
  localStorage.setItem('toDoData', JSON.stringify(newToDoList));
};

const getData = () => {
  const data = localStorage.getItem('toDoData');
  if (data) {
    return JSON.parse(data);
  }
  return [];
};

const completed = (liId, completed = false) => {
  const toDoTasks = getData();
  const index = Number(liId.substring(4));
  toDoTasks[index - 1].completed = completed;
  localStorage.setItem('toDoData', JSON.stringify(toDoTasks));
};

updateIndexes();

const li = document.getElementById('task2');
const checkbox = document.getElementById('check2');

describe('Edit task tests', () => {
  test('Check checkbox current value', () => {
    expect(checkbox.checked).toBeFalsy();
  });

  test('Completed task after checkbox checked', () => {
    checkbox.checked = true;
    completed(li.id, checkbox.checked);
    const toDoTasks = getData();
    expect(toDoTasks[1].completed).toBeTruthy();
  });
});