 // Select the elements
const todoInput = document.querySelector('#todo-input');
const addBtn = document.querySelector('#add-btn');
const todoList = document.querySelector('#todo-list');

// Initialize the todos array
let todos = [];

// Check if there are todos in local storage
if(localStorage.getItem('todos')) {
  // Parse the JSON string and store the todos in the array
  todos = JSON.parse(localStorage.getItem('todos'));
  // Display the todos
  displayTodos();
}

// Event listeners
addBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', handleTodoClick);

function addTodo() {
  // Get the value of the input field
  const todoText = todoInput.value;
//If a todo is not added to the input section , it returns an alert
  if(!todoText) {
    alert("please fill out the tasks");
      return;  
 }

  if(todoText) {
    // Create a new todo object
    const todo = {
      id: Date.now(),
      text: todoText,
      completed: false
    };
    // Add the todo object to the todos array
    todos.push(todo);
    // Save the todos array to local storage
    localStorage.setItem('todos', JSON.stringify(todos));
    // Display the todos
    displayTodos();
    // Clear the input field
    todoInput.value = '';
  }
}

function displayTodos() {
  // Create an empty string to store the HTML
  let html = '';
  // Loop through the todos array and generate the HTML
  todos.forEach(todo => {
    html += `
      <li id="${todo.id}">
        <span>${todo.text}</span>
        <button class="delete-btn">Delete</button>
        <button class="edit-btn">Edit</button>
      </li>
    `;
  });
  // Set the HTML of the todo list element
  todoList.innerHTML = html;
}

function handleTodoClick(e) {
  if(e.target.classList.contains('delete-btn')) {
    // Get the id of the todo to delete
    const todoId = e.target.parentNode.id;
    // Remove the todo from the todos array
    todos = todos.filter(todo => todo.id !== parseInt(todoId));
    // Save the todos array to local storage
    localStorage.setItem('todos', JSON.stringify(todos));
    // Display the todos
    displayTodos();
  }
  if(e.target.classList.contains('edit-btn')) {
    // Get the id of the todo to edit
    const todoId = e.target.parentNode.id;
    // Find the todo object in the todos array
    const todo = todos.find(todo => todo.id === parseInt(todoId));
    // Get the current text of the todo
    const currentText = todo.text;
    // Prompt the user to enter a new text for the todo
    const newText = prompt('Enter a new todo text:', currentText);
    // Update the todo object with the new text
    todo.text = newText;
    // Save the todos array to local storage
    localStorage.setItem('todos', JSON.stringify(todos));
    // Display the todos
    displayTodos();
  }
}