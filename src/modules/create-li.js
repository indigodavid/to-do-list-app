import completed from './completed.js';
import editTask from './edit-task.js';
import removeTask from './remove-task.js';
import updateIndexes from './update-indexes.js';

const taskList = document.getElementById('task-list');

const createLi = (task) => {
  const li = document.createElement('li');
  const checkbox = document.createElement('input');
  const div = document.createElement('div');
  const button = document.createElement('button');
  const removeButton = document.createElement('button');
  const textInput = document.createElement('input');

  // Set List element id and class
  li.setAttribute('id', `task${task.index}`);
  li.classList.add('task');
  li.setAttribute('draggable', 'true');

  // Set checkbox attributes
  checkbox.checked = task.completed;
  checkbox.classList.add('check');
  checkbox.setAttribute('type', 'checkbox');
  checkbox.setAttribute('name', `check${task.index}`);
  checkbox.setAttribute('id', `check${task.index}`);

  // Set text input attributes
  textInput.classList.add('edit');
  textInput.setAttribute('type', 'text');
  textInput.setAttribute('name', `text${task.index}`);
  textInput.setAttribute('id', `text${task.index}`);
  textInput.value = task.description;

  // Set div classes and content
  div.classList.add('text');
  div.innerHTML = task.description;
  if (checkbox.checked) {
    div.classList.add('done');
  }

  // Set options button class and content
  button.classList.add('options');
  button.innerHTML = '<i class="fa-solid fa-ellipsis-vertical"></i>';

  // Set remove button class and content
  removeButton.classList.add('remove');
  removeButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';

  // Append all elements to li in order
  li.append(checkbox, div, textInput, removeButton, button);
  taskList.appendChild(li);

  // create functions for specific behaviors

  const toggleDiv = () => {
    div.classList.toggle('done');
    completed(li.id, checkbox.checked);
  };

  const changeToInput = () => {
    div.style.display = 'none';
    textInput.style.display = 'inherit';
  };

  const changeToDiv = () => {
    div.style.display = 'inherit';
    textInput.style.display = 'none';
  };

  const editDiv = () => {
    div.innerHTML = textInput.value;
    editTask(li.id, textInput.value, checkbox.checked);
    changeToDiv();
  };

  const getElementByPosition = (position) => {
    const fixedElements = [...taskList.querySelectorAll('.task')].filter((task) => !task.classList.contains('moving'));
    const { element } = fixedElements.reduce((closest, newElement) => {
      const box = newElement.getBoundingClientRect();
      const offset = position - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset, element: newElement };
      }
      return closest;
    }, { offset: Number.NEGATIVE_INFINITY });
    return element;
  };

  // addEventlisteners to elements
  checkbox.addEventListener('change', toggleDiv);
  div.addEventListener('click', changeToInput);
  textInput.addEventListener('change', editDiv);
  textInput.addEventListener('focusout', changeToDiv);
  removeButton.addEventListener('click', () => {
    removeTask(removeButton);
  });

  li.addEventListener('dragstart', () => {
    li.classList.add('moving');
  });

  taskList.addEventListener('dragover', (e) => {
    e.preventDefault();
  });

  li.addEventListener('dragover', (e) => {
    e.preventDefault();
    const newLiPosition = getElementByPosition(e.clientY);
    const movingElement = document.querySelector('.moving');
    if (newLiPosition) {
      taskList.insertBefore(movingElement, newLiPosition);
    } else {
      taskList.appendChild(movingElement);
    }
  });

  li.addEventListener('dragend', () => {
    li.classList.remove('moving');
    updateIndexes();
  });
};

export default createLi;