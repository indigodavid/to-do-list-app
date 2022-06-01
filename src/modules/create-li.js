const taskList = document.getElementById('task-list');

const createLi = (task) => {
  const li = document.createElement('li');
  const checkbox = document.createElement('input');
  const div = document.createElement('div');
  const button = document.createElement('button');
  const textInput = document.createElement('input');

  // Set List element id and class
  li.setAttribute('id', `task${task.index}`);
  li.classList.add('task');
  
  // Set checkbox attributes
  checkbox.checked = task.completed;
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

  button.classList.add('options');
  button.innerHTML = '<i class="fa-solid fa-ellipsis-vertical"></i>';

  li.appendChild(checkbox);
  li.appendChild(div);
  li.appendChild(textInput);
  li.appendChild(button);

  taskList.appendChild(li);

  checkbox.addEventListener('change', () => {
    div.classList.toggle('done');
  });

  div.addEventListener('click',() => {
    div.style.display = 'none';
    textInput.style.display = 'inherit';
  })

  textInput.addEventListener('change', () => {
    div.innerHTML = textInput.value;
    // edit local storage
    div.style.display = 'inherit';
    textInput.style.display = 'none';
  })

  textInput.addEventListener('focusout', () => {
    div.style.display = 'inherit';
    textInput.style.display = 'none';
  })
}

export default createLi;