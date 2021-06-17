// define UI variables
const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');
const taskList = document.querySelector('ul.collection');
const clearBtn = document.querySelector('a.clear-tasks');
const filter = document.querySelector('#filter');

//load all event listeners
function loadEventListeners() {
  form.addEventListener('submit', addTask);

  //remove task event and removeTask function
  //this uses event delagation. event is tied to parent and uses a conditional.
  taskList.addEventListener('click', removeTask);

  //clear all tasks event and clearTasks function
  clearBtn.addEventListener('click', clearTasks);

  //filter tasks
  filter.addEventListener('keyup', filterTasks);

  //create event listener on document DOMContentLoaded, function -> getTasksFromLocalStorage
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

  //store task to local storage
  storeTaskInLocalStorage(taskInput.value);

  //clear out input
  taskInput.value = '';

  e.preventDefault();
}

function removeTask(e) {
  if (e.target.classList.contains('fa-remove')) {
    e.target.parentElement.parentElement.remove();

    //run removeTaskFromLocalStorage()
  }
}

function clearTasks() {
  while(taskList.firstChild) {
    taskList.firstChild.remove();
  }

  //run clearLocalStorage
}

function filterTasks(e) {
  const filterText = e.target.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach(function(task) {
    const taskText = task.textContent.toLocaleLowerCase();
    if (taskText.indexOf(filterText) === -1) {
      task.style.display = 'none';
    } else {
      task.style.display = 'block';
    }
  })  
}

//create function: storeTaskInLocalStorage()
function storeTaskInLocalStorage(task) {
  let tasks;
  if (!localStorage.getItem('tasks')) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//create function: getTasksFromLocalStorage()

//create function: removeTasksFromLocalStorage()

//create function: clearLocalStorage
