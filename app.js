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

  //create event listener on document DOMContentLoaded, run getTasksFromLocalStorage
  document.addEventListener('DOMContentLoaded', getTasksFromLocalStorage);
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

    //remove task from LS, pass event target to function
    removeTaskFromLocalStorage(e.target.parentElement.parentElement);
  }
}

function clearTasks() {
  while(taskList.firstChild) {
    taskList.firstChild.remove();
  }

  //clearLocalStorage
  clearLocalStorage();
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

//store task in local storage
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

//get tasks from local storage
function getTasksFromLocalStorage() {
  if (!localStorage.getItem('tasks')) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task) {
    //create list item for task, add materialize classname
    const li = document.createElement('li');
    li.className = 'collection-item';
    //create delete icon for list item
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //append text and icon to li
    li.appendChild(document.createTextNode(task));
    li.appendChild(link);
    //append li to ul.collection
    taskList.appendChild(li);
  })
}

//remove from local storage
function removeTaskFromLocalStorage(task) {
  const taskText = (task.textContent);
  //get all tasks from LS
  if (!localStorage.getItem('tasks')) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task, index) {
    if (task === taskText) {
      //delete task
      tasks.splice(index, 1);
    }
  })
  localStorage.setItem('tasks', JSON.stringify(tasks));
  
}

//create function: clearLocalStorage
function clearLocalStorage() {
  localStorage.removeItem('tasks');
}
