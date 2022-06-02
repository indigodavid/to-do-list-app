import getData from './get-data.js';

const editTask = (index, description = '', completed = false) => {
  if (description) {
    const toDoTasks = getData();
    toDoTasks[index - 1].description = description;
    toDoTasks[index - 1].completed = completed;
    localStorage.setItem('toDoData', JSON.stringify(toDoTasks));
  }
};

export default editTask;