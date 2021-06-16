// define UI variables
const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');
const taskList = document.querySelector('ul.collection');
const clearBtn = document.querySelector('a.clear-tasks');
const filter = document.querySelector('#filter');

//load all event listeners
function loadEventListeners() {
  form.addEventListener('submit', addTask);
}
loadEventListeners();

//add new task function
function addTask(e) {
  //check for value in input
  if (taskInput.value === '') {
    alert('Add a task!');
    return;
  }
  //create list item for task, add materialize classname
  const li = document.createElement('li');
  li.className = 'collection-item';
  //create delete icon for list item
  const link = document.createElement('a');
  link.className = 'delete-item secondary-content';
  link.innerHTML = '<i class="fa fa-remove"></i>';
  //append text and icon to li
  li.appendChild(document.createTextNode(taskInput.value));
  li.appendChild(link);
  //append li to ul.collection
  taskList.appendChild(li);
  //clear out input
  taskList.value = '';

  e.preventDefault();
}
