export default class Task {
  constructor(description, index, completed = false) {
    this.description = description;
    this.completed = completed;
    this.index = index;
  }
}