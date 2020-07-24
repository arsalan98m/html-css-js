// Selectors
var todoInput = document.querySelector('.todo-input');
var todoButton = document.querySelector('.todo-button');
var todoList = document.querySelector('.todo-list');
var filterOption = document.querySelector('.filter-todo');
var deleteAllItems = document.querySelector('.delete-all');


// Event Listerners
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteItem);
filterOption.addEventListener('click', filterTodo);
deleteAllItems.addEventListener('click', deleteAll);



// Functions
function addTodo(event) {
    // Prevent form from submitting
    event.preventDefault();

    // Todo Div
    var todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    // Create li
    var newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);


    // check mark button
    var completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);

    // delete button
    var deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add('delete-btn');
    todoDiv.appendChild(deleteButton);

    // edit button
    var editButton = document.createElement('button');
    editButton.innerHTML = '<i class="fas fa-edit"></i>';
    editButton.classList.add('edit-btn');
    todoDiv.appendChild(editButton);

    // Append to List
    todoList.appendChild(todoDiv);

    // Clear Todo input value
    todoInput.value = '';
}


function deleteItem(e) {
    var item = e.target;

    // Delete Todo
    if (item.classList[0] === 'delete-btn') {
        var todo = item.parentElement;
        todo.remove();
    }

    // Check Mark

    if (item.classList[0] === 'complete-btn') {
        var todo = item.parentElement;
        todo.classList.toggle("completed");
    }

    // Edit item

    if (item.classList[0] === 'edit-btn') {
        var editTodo = prompt("Enter the todo you want to change");
        item.parentElement.childNodes[0].innerText = editTodo;

    }

}


function filterTodo(e) {
    var todos = document.querySelector('.todo-list');
    todos = todos.childNodes;

    todos.forEach(function (todo) {
        if (todo.nodeType === 1) {
            switch (e.target.value) {
                case "all":
                    todo.style.display = "flex";
                    break;
                case "completed":
                    if (todo.classList.contains("completed")) {
                        todo.style.display = "flex";

                    } else {
                        todo.style.display = "none";
                    }
                    break;
                case "uncompleted":
                    if (!todo.classList.contains("completed")) {
                        todo.style.display = "flex";
                    } else {
                        todo.style.display = "none";
                    }
                    break;
            }
        }
    })


}

function deleteAll(e) {
    event.preventDefault();
    var todos = document.querySelector('.todo-list');
    todos.innerHTML = "";

}

