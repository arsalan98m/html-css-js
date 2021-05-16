let emailEl = document.getElementById("email");
let passwordEl = document.getElementById("password");
// Sign up

function signUp() {
  firebase
    .auth()
    .createUserWithEmailAndPassword(emailEl.value, passwordEl.value)
    .then((success) => {
      alert(success, "You are successfully signed up");
    })
    .catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorCode);
      alert(errorMessage);
    });
}

function signIn() {
  firebase
    .auth()
    .signInWithEmailAndPassword(emailEl.value, passwordEl.value)
    .then(() => {
      if (emailEl.value === "admin@admin.com") {
        window.location.href = "./admin.html";
      } else {
        window.location.href = "./student.html";
      }
    })
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorCode);
      alert(errorMessage);
    });
}
