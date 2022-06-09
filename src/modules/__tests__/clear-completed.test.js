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

const removeTask = (target) => {
  target.parentElement.remove();
  updateIndexes();
};

const clearTasks = () => {
  const tasks = document.querySelectorAll('.task');
  const tasksToBeRemoved = [...tasks].filter((task) => {
    const checkbox = task.querySelector('.check');
    return checkbox.checked;
  });
  tasksToBeRemoved.forEach((task) => {
    const removeButton = task.querySelector('.remove');
    removeTask(removeButton);
  });
};

updateIndexes();

const check3 = document.getElementById('check3');
const check5 = document.getElementById('check5');

check3.checked = true;
check5.checked = true;

describe('Clear completed tasks tests', () => {
  test('Check the number of lis', () => {
    expect(document.querySelectorAll('.task').length).toBe(5);
  });

  test('Check the new number of completed tasks', () => {
    clearTasks();
    updateIndexes();
    expect(document.querySelectorAll('.task').length).toBe(3);
  });

  test('Check updated order in local storage', () => {
    const toDoTasks = getData();
    toDoTasks.forEach((task, idx) => {
      expect(task.index).toBe(idx + 1);
    });
  });
});