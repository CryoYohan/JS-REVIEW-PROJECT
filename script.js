// === TODO CRUD MANAGEMENT === //

// Array to store todos
let todos = [];

// DOM Elements
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

// Function to render todos
function render_todos() {
    todoList.innerHTML = '';
    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.className = 'todo-item';
        li.dataset.index = index; // Attach the index to the DOM element
        li.innerHTML = `
            <input 
                type="radio" 
                name="check_todo" 
                style="cursor:pointer;margin-right:20px;width:50px;" 
                onclick="delete_todo(${index}, true)"
            >
            <span>${todo}</span>
            <button onclick="edit_todo(${index})">Edit</button>
            <button onclick="delete_todo(${index})">Delete</button>
        `;
        todoList.appendChild(li);
    });
}

// Function to add new todo
function addNewTodo(event) {
    event.preventDefault(); // Prevent form submission
    const newTodo = todoInput.value.trim();
    if (newTodo) {
        todos.push(newTodo);
        todoInput.value = '';
        render_todos();
    }
}

// Function to edit todo
function edit_todo(index) {
    const newTodo = prompt('Edit Todo', todos[index]);
    if (newTodo != null) {
        todos[index] = newTodo.trim();
        render_todos();
    }
}

// Function to delete todo
function delete_todo(index, isDelayed = false) {
    const todoItem = document.querySelector(`.todo-item[data-index="${index}"]`);
    if (isDelayed) {
        todoItem.classList.add('fading'); // Add fading class
        setTimeout(() => {
            if (todos[index]) {
                todos.splice(index, 1);
                render_todos();
            }
        }, 1000); // 3-second delay
    } else {
        if (confirm('Are you sure you want to delete this todo?')) {
            todos.splice(index, 1);
            render_todos();
        }
    }
}

// Event Listeners
todoForm.addEventListener('submit', addNewTodo);

// Initial Render
render_todos();