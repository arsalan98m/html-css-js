// Selectors
var todoInput = document.querySelector(".todo-input");
var todoButton = document.querySelector(".todo-button");
var todoList = document.querySelector(".todo-list");
var deleteAllItems = document.querySelector(".delete-all");

// Event Listerners

todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteItem);
deleteAllItems.addEventListener("click", deleteAll);

// Retreive data from firebase
firebase
  .database()
  .ref("todos")
  .on("child_added", function (data) {
    // Todo Div
    var todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // Create li
    var newTodo = document.createElement("li");
    newTodo.innerText = data.val().value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    // delete button
    var deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add("delete-btn");
    deleteButton.setAttribute("id", data.val().key);
    todoDiv.appendChild(deleteButton);

    // edit button
    var editButton = document.createElement("button");
    editButton.innerHTML = '<i class="fas fa-edit"></i>';
    editButton.classList.add("edit-btn");
    editButton.setAttribute("id", data.val().key);
    todoDiv.appendChild(editButton);

    // Append to List
    todoList.appendChild(todoDiv);
  });

// Functions

// Adding items on firebase
function addTodo(event) {
  // Prevent form from submitting
  event.preventDefault();
  var key = firebase.database().ref("todos").push().key;

  var todo = {
    key: key,
    value: todoInput.value,
  };

  firebase
    .database()
    .ref("todos/" + key)
    .set(todo);

  // Clear Todo input value
  todoInput.value = "";
}

function deleteItem(e) {
  var item = e.target;

  // Delete Todo
  if (item.classList[0] === "delete-btn") {
    var todo = item.parentElement;
    todo.remove();
    // removing data on firebase database
    firebase
      .database()
      .ref("todos/" + todo.childNodes[2].id)
      .remove();
    console.log(todo.childNodes[2].id);
  }

  // Edit item on firebase database

  if (item.classList[0] === "edit-btn") {
    var editTodo = prompt("Enter the todo you want to change");
    var todo = item.parentElement;
    item.parentElement.childNodes[0].innerText = editTodo;

    firebase
      .database()
      .ref("todos/" + todo.childNodes[2].id)
      .update({ value: editTodo });
  }
}

function deleteAll(e) {
  event.preventDefault();

  // deleting all data on firebase
  firebase.database().ref("todos").remove();
  firebase.database().ref("completed-todos").remove();

  var todos = document.querySelector(".todo-list");
  todos.innerHTML = "";
}
