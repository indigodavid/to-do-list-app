import getData from './get-data.js';

const editTask = (liId, description = '', completed = false) => {
  const toDoTasks = getData();
  const index = Number(liId.substring(4));
  if (description) {
    toDoTasks[index - 1].description = description;
  }
  toDoTasks[index - 1].completed = completed;
  localStorage.setItem('toDoData', JSON.stringify(toDoTasks));
};

export default editTask;