const inputBox = document.getElementById('inputBox');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');

let editTodo = null;

// Function to add todo
const addTodo = () => {
    const inputText = inputBox.value.trim();

    if (inputText === '') {
        alert('Please enter a task.');
        return;
    }

    if (addBtn.innerHTML === '<i class="fas fa-check"></i>') {
        editLocalTodos(editTodo.target.parentElement.previousElementSibling.textContent);
        editTodo.target.parentElement.previousElementSibling.textContent = inputText;
        addBtn.innerHTML = '<i class="fas fa-plus"></i>';
        inputBox.value = '';
        return;
    }

    const li = document.createElement('li');

    const p = document.createElement('p');
    p.textContent = inputText;
    li.appendChild(p);

    const editBtn = document.createElement('button');
    editBtn.classList.add('btn', 'editBtn');
    editBtn.innerHTML = '<i class="fas fa-edit"></i>';
    li.appendChild(editBtn);

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('btn', 'deleteBtn');
    deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
    li.appendChild(deleteBtn);

    todoList.appendChild(li);

    saveLocalTodos(inputText);
    inputBox.value = '';
};

// Function to handle updates (Edit/Delete)
const updateTodo = (e) => {
    if (e.target.classList.contains('fa-trash-alt')) {
        const todoItem = e.target.parentElement.parentElement;
        deleteLocalTodos(todoItem);
        todoList.removeChild(todoItem);
    }

    if (e.target.classList.contains('fa-edit')) {
        const todoItem = e.target.parentElement.parentElement;
        inputBox.value = todoItem.firstChild.textContent;
        inputBox.focus();
        addBtn.innerHTML = '<i class="fas fa-check"></i>';
        editTodo = e;
    }
};

// Save tasks to localStorage
const saveLocalTodos = (todo) => {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
};

// Get tasks from localStorage
const getLocalTodos = () => {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.forEach((todo) => {
        const li = document.createElement('li');

        const p = document.createElement('p');
        p.textContent = todo;
        li.appendChild(p);

        const editBtn = document.createElement('button');
        editBtn.classList.add('btn', 'editBtn');
        editBtn.innerHTML = '<i class="fas fa-edit"></i>';
        li.appendChild(editBtn);

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('btn', 'deleteBtn');
        deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
        li.appendChild(deleteBtn);

        todoList.appendChild(li);
    });
};

// Delete tasks from localStorage
const deleteLocalTodos = (todoItem) => {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    const todoText = todoItem.firstChild.textContent;
    todos = todos.filter((todo) => todo !== todoText);
    localStorage.setItem('todos', JSON.stringify(todos));
};

// Edit tasks in localStorage
const editLocalTodos = (oldTodo) => {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    const todoIndex = todos.indexOf(oldTodo);
    todos[todoIndex] = inputBox.value;
    localStorage.setItem('todos', JSON.stringify(todos));
};

// Event Listeners
document.addEventListener('DOMContentLoaded', getLocalTodos);
addBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', updateTodo);
