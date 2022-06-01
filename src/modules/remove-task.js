import getData from "./get-data"

const removeTask = (index) => {
  const li = document.getElementById(`task${index}`);
  let toDoTasks = getData();
  toDoTasks = toDoTasks.filter(task => task.index !== index);
  toDoTasks.forEach((task,index) => {
    task.index = index + 1;
  });
  localStorage.setItem('toDoData', JSON.stringify(toDoTasks));
  li.remove();
}

export default removeTask;