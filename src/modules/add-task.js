import Task from "./task.js";
import createLi from "./create-li.js";

const input = document.getElementById('new-task');
const button = document.getElementById('add-task');

const addTaskEvent = () => {
  button.addEventListener('click', () => {
    if (input.value) {
      const task = new Task(input.value, 3);
      createLi(task);
    } else {
      alert('Task field is empty! Please try again');
    }
  });
};

export default addTaskEvent;