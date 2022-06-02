import getData from './get-data.js';

const editTask = (index, description = '', completed = false) => {
  
  const toDoTasks = getData();
  if (description) {
    toDoTasks[index - 1].description = description;
  }
  toDoTasks[index - 1].completed = completed;
  localStorage.setItem('toDoData', JSON.stringify(toDoTasks));
};

export default editTask;