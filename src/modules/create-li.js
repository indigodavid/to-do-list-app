const taskList = document.getElementById('task-list');

const createLi = (task) => {
  const li = document.createElement('li');
  const input = document.createElement('input');
  const div = document.createElement('div');
  const button = document.createElement('button');

  li.setAttribute('id', `task${task.index}`);
  li.classList.add('task');

  input.checked = task.completed;
  input.setAttribute('type', 'checkbox');
  input.setAttribute('name', `check${task.index}`);
  input.setAttribute('id', `check${task.index}`);

  div.classList.add('text');
  div.innerHTML = task.description;
  if (input.checked) {
    div.classList.add('done');
  }

  button.classList.add('options');
  button.innerHTML = '<i class="fa-solid fa-ellipsis-vertical"></i>';

  li.appendChild(input);
  li.appendChild(div);
  li.appendChild(button);

  taskList.appendChild(li);

  input.addEventListener('change', () => {
    div.classList.toggle('done');
  });
}

export default createLi;