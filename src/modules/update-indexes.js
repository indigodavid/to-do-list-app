import Task from './task.js';

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

export default updateIndexes;