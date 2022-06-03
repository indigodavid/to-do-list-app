import getData from './get-data.js';

const completed = (liId, completed = false) => {
  const toDoTasks = getData();
  const index = Number(liId.substring(4));
  toDoTasks[index - 1].completed = completed;
  localStorage.setItem('toDoData', JSON.stringify(toDoTasks));
};

export default completed;