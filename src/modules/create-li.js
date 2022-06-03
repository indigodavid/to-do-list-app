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
  li.appendChild(checkbox);
  li.appendChild(div);
  li.appendChild(textInput);
  li.appendChild(removeButton);
  li.appendChild(button);

  taskList.appendChild(li);

  // create functions for specific behaviors

  const toggleDiv = () => {
    div.classList.toggle('done');
    editTask(li.id, '', checkbox.checked);
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

  // addEventlisteners to elements
  checkbox.addEventListener('change', toggleDiv);
  div.addEventListener('click', changeToInput);
  textInput.addEventListener('change', editDiv);
  textInput.addEventListener('focusout', changeToDiv);
  removeButton.addEventListener('click', () => {
    removeTask(removeButton);
  });

  li.addEventListener('dragstart', (e) => {
    li.style.backgroundColor = '#fff';
    //li.style.boxShadow = '2px 2px 2px #444';
    
    localStorage.setItem('draggedItem', JSON.stringify(li.id));

    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', document.getElementById(li.id).innerHTML);

  });

  li.addEventListener('dragover', (e) => {
    e.preventDefault();
    li.style.border = '#000 solid 1px';
  });

  li.addEventListener('dragleave', () => {
    li.style.border = 'none';
  })

  li.addEventListener('drop', (e) => {
    e.preventDefault();
    e.stopPropagation();
    li.style.border = 'none';
    if(li.id !== JSON.parse(localStorage.getItem('draggedItem'))) {
      const thisItem = document.getElementById(li.id);
      const movedItem = document.getElementById(JSON.parse(localStorage.getItem('draggedItem')));
      const thisInnerHTML = thisItem.innerHTML
      thisItem.innerHTML = e.dataTransfer.getData('text/html');
      movedItem.innerHTML = thisInnerHTML;
      updateIndexes();
    }
  })
};

export default createLi;