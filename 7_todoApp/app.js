// Selectors
var todoInput = document.querySelector(".todo-input");
var todoButton = document.querySelector(".todo-button");
var todoList = document.querySelector(".todo-list");
var filterOption = document.querySelector(".filter-todo");
var deleteAllItems = document.querySelector(".delete-all");

// Event Listerners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteItem);
filterOption.addEventListener("click", filterTodo);
deleteAllItems.addEventListener("click", deleteAll);

// Functions
function addTodo(event) {
  // Prevent form from submitting
  event.preventDefault();

  // Todo Div
  var todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  // Create li
  var newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  // ADD Todo to localStorage
  SaveLocalStorage(todoInput.value);

  // check mark button
  var completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  // delete button
  var deleteButton = document.createElement("button");
  deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
  deleteButton.classList.add("delete-btn");
  todoDiv.appendChild(deleteButton);

  // edit button
  var editButton = document.createElement("button");
  editButton.innerHTML = '<i class="fas fa-edit"></i>';
  editButton.classList.add("edit-btn");
  todoDiv.appendChild(editButton);

  // Append to List
  todoList.appendChild(todoDiv);

  // Clear Todo input value
  todoInput.value = "";
}

function deleteItem(e) {
  var item = e.target;

  // Delete Todo
  if (item.classList[0] === "delete-btn") {
    var todo = item.parentElement;
    removeLocalTodos(todo);
    todo.remove();
  }

  // Check Mark

  if (item.classList[0] === "complete-btn") {
    var todo = item.parentElement;
    todo.classList.toggle("completed");
  }

  // Edit item

  if (item.classList[0] === "edit-btn") {
    var editTodo = prompt("Enter the todo you want to change");
    var todo = item.parentElement;
    editLocalTodos(editTodo, todo);
    item.parentElement.childNodes[0].innerText = editTodo;
  }
}

function filterTodo(e) {
  var todos = document.querySelector(".todo-list");
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
  });
}

function deleteAll(e) {
  event.preventDefault();
  var todos = document.querySelector(".todo-list");
  todos.innerHTML = "";
  deleteAllLocalTodos(e);
}

// **** Savind Todos on localStorage **** //

function SaveLocalStorage(todo) {
  var todos;

  // Check todos in local Storage exist or not in localStorage
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    // JSON.parse localSorage sy data utha kar array main conver karega ot todos ky variable main save kardega
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todo);
  // JSON.stringify hum jo bhi data dyngy woh data array ki form main localStorage main save kardega
  localStorage.setItem("todos", JSON.stringify(todos));
}

// **** Getting todos on localStorage **** //

function getTodos() {
  var todos;

  // Check todos in local Storage exist or not in localStorage
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    // JSON.parse localSorage sy data utha kar array main conver karega ot todos ky variable main save kardega
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach(function (todo) {
    // Todo Div
    var todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // Create li
    var newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    // check mark button
    var completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    // delete button
    var deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add("delete-btn");
    todoDiv.appendChild(deleteButton);

    // edit button
    var editButton = document.createElement("button");
    editButton.innerHTML = '<i class="fas fa-edit"></i>';
    editButton.classList.add("edit-btn");
    todoDiv.appendChild(editButton);

    // Append to List
    todoList.appendChild(todoDiv);
  });
}

// **** removing localStorage todos **** //

function removeLocalTodos(todo) {
  // check
  var todos;

  // Check todos in local Storage exist or not in localStorage
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    // JSON.parse localSorage sy data utha kar array main conver karega ot todos ky variable main save kardega
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  var todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);

  localStorage.setItem("todos", JSON.stringify(todos));
}

// **** Edit local storage todos **** //
function editLocalTodos(editTodo, todo) {
  var todos;

  // Check todos in local Storage exist or not in localStorage
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    // JSON.parse localSorage sy data utha kar array main conver karega ot todos ky variable main save kardega
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  var todoIndex = todo.children[0].innerText;

  todos[todos.indexOf(todoIndex)] = editTodo;

  localStorage.setItem("todos", JSON.stringify(todos));
}

// **** Delete all todos on localStorage **** //

function deleteAllLocalTodos(todo) {
  var todos;

  // Check todos in local Storage exist or not in localStorage
  if (localStorage.getItem("todos") !== null) {
    todos = JSON.parse(localStorage.getItem("todos"));
    todos = [];
  }
  localStorage.setItem("todos", JSON.stringify(todos));

  console.log(todos);
}
