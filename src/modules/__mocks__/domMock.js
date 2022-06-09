const jsdom = require('jsdom');

const { JSDOM } = jsdom;

const dom = new JSDOM(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>To-Do List App</title>
</head>
<body>
  <main>
    <h1>To-Do List App</h1>
    <div class="box">
      <div class="head">
        <h2>Today's To Do</h2>
        <button id="refresh" type="button"><i class="fa-solid fa-arrows-rotate"></i></button>
      </div>
      <div id="new-wrapper">
        <div id="alert"></div>
        <input type="text" name="new-task" id="new-task" placeholder="Add to your list...">
        <button id="add-task" type="button"><i class="fa-solid fa-arrow-turn-down"></i></button>
      </div>
      <div id="list-wrapper">
        <ul id="task-list">
          <!-- Generated via index.js -->
        </ul>
        <button id="clear" type="button">Clear all completed</button>
      </div>
    </div>
  </main>
</body>
</html>
`);

const document = dom.window.document;

module.exports = document;