import updateIndexes from './update-indexes.js';

const removeTask = (target) => {
  target.parentElement.remove();
  updateIndexes();
};

export default removeTask;