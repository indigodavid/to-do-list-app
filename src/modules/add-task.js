import Task from "./task.js";
import createLi from "./create-li.js";
import getData from "./get-data.js";

const input = document.getElementById('new-task');
const button = document.getElementById('add-task');
const toDoTasks = getData();

const addTaskEvent = () => {
  button.addEventListener('click', () => {
    if (input.value) {
      const task = new Task(input.value, toDoTasks.length + 1);
      createLi(task);
      toDoTasks.push(task);
      localStorage.setItem('toDoData', JSON.stringify(toDoTasks));
      input.value = '';
    } else {
      alert('Task field is empty! Please try again'); // Modify HTML to show custom alert
    }
  });
};

export default addTaskEvent;