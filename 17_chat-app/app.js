function toggleSignup() {
  document.getElementById("login-toggle").style.backgroundColor = "#fff";
  document.getElementById("login-toggle").style.color = "#222";
  document.getElementById("signup-toggle").style.backgroundColor = "#57b846";
  document.getElementById("signup-toggle").style.color = "#fff";
  document.getElementById("login-form").style.display = "none";
  document.getElementById("signup-form").style.display = "block";
}

function toggleLogin() {
  document.getElementById("login-toggle").style.backgroundColor = "#57B846";
  document.getElementById("login-toggle").style.color = "#fff";
  document.getElementById("signup-toggle").style.backgroundColor = "#fff";
  document.getElementById("signup-toggle").style.color = "#222";
  document.getElementById("signup-form").style.display = "none";
  document.getElementById("login-form").style.display = "block";
}

// ----- Firebase Connection ----- //

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyC0yplmcUPsrP9QhrzFx8x-JWICilsDfI4",
  authDomain: "chat-app-8edfa.firebaseapp.com",
  databaseURL: "https://chat-app-8edfa.firebaseio.com",
  projectId: "chat-app-8edfa",
  storageBucket: "chat-app-8edfa.appspot.com",
  messagingSenderId: "114465450622",
  appId: "1:114465450622:web:529e7fe032cb04804c062f",
  measurementId: "G-EVEENQYM23",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();

// ========== Google authentication ============= //
function googleSignIn() {
  var provider = new firebase.auth.GoogleAuthProvider();

  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function (result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;

      redirecToHome();
      // ...
    })
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;

      alert(error);
      alert(errorMessage);

      // ...
    });
}

// ========== Signup =========== //

let email;

let emailsupEl = document.getElementById("emailsup");
let usernamesupEl = document.getElementById("usernamesup");
let passwordsupEl = document.getElementById("passwordsup");

let emailEl = document.getElementById("email");
let passwordEl = document.getElementById("password");

let userProfileEl = document.getElementById("user_profile_name");
let usersListEl = document.getElementById("usersList");
let logoutBtnEl = document.getElementById("logoutBtn");
function signup() {
  firebase
    .auth()
    .createUserWithEmailAndPassword(emailsupEl.value, passwordsupEl.value)
    .then(function () {
      name = emailsupEl.value;
      emailsupEl.value = "";
      passwordsupEl.value = "";
      usernamesupEl.value = "";

      alert("Your account is successfully created Go and Login");
    })
    .catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorCode);
      alert(errorMessage);
    });
}
// =========== Sign in ============= //

function signIn() {
  firebase
    .auth()
    .signInWithEmailAndPassword(emailEl.value, passwordEl.value)

    .then(function () {
      redirecToHome();
    })

    .catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorCode);
      alert(errorMessage);
    });
}

// ============== Getting the currently signed in user ================== //

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    let user = firebase.auth().currentUser;
    email = user.email;

    userProfileEl.innerHTML = auth.currentUser.email;

    logoutBtnEl.setAttribute("key", auth.currentUser.uid);
  }
});
// --------- Refirecting to Home Page ---------- //

function redirecToHome() {
  activeUsers();
  setTimeout(() => {
    window.location.assign("./home.html");
  }, 3000);
}

function activeUsers() {
  db.collection("active_users").add({
    email: auth.currentUser.email,
    status: "online",
  });
}

// ------------ Sign OUt ----------- //

function signOut() {
  firebase
    .auth()
    .signOut()
    .then(function () {
      window.location.assign("./index.html");
    });
}

// ----------- Chat History ------------- //

let messageBoxEl = document.getElementById("messageBox");
let sendBtnEl = document.getElementById("sendBtn");
let chatHistoryEl = document.getElementById("chat-history");

// saving messages

function sendMessages() {
  if (messageBoxEl.value === "") {
    alert("Please Type some text");
    return false;
  } else {
    db.collection("messages")
      .add({
        email: auth.currentUser.email,
        uid: auth.currentUser.uid,
        message: messageBoxEl.value,
        date: firebase.firestore.Timestamp.fromMillis(Date.now()),
      })
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
        messageBoxEl.value = "";
      })
      .catch(function (error) {
        console.log("Error adding document: ", error);
      });
  }
}

// ----- Getting Messages on Realtime ---------- //

db.collection("messages")
  .orderBy("date", "asc")
  .onSnapshot((snapshot) => {
    document.querySelector("#chat-history").innerHTML = "";
    snapshot.forEach((doc) => {
      if (doc.data().uid === auth.currentUser.uid) {
        chatHistoryEl.innerHTML += `<li class="clearfix">
      <div class="message-data align-right">
        <span class="message-data-name"
          ><i class="fa fa-circle online"></i> me</span
        >
        
        <i class="fa fa-circle me"></i>
      </div>
      <div class="message other-message float-right" id="${doc.id}">
        ${doc.data().message}
        &nbsp;&nbsp;<i class="fa fa-trash" style="cursor: pointer" id="${
          doc.id
        }" onClick="deleteMessage(this)"></i>
      </div>`;
        console.log(doc.data());
      } else {
        chatHistoryEl.innerHTML += `<li>
      <div class="message-data">
        <span class="message-data-name"
          ><i class="fa fa-circle online"></i>${doc.data().email}</span
        >
         
      </div>
      <div class="message my-message">
        ${doc.data().message}
      </div>
    </li>`;
      }
    });
  });

// Clear all messages

function clearAll() {
  db.collection("messages")
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        db.collection("messages")
          .doc(doc.id)
          .delete()
          .then(() => {
            console.log("Deleted all messages");
          })
          .catch((error) => {
            console.log("Error something else ", error);
          });
      });
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
}

// --------- deleting specific message ----------//

function deleteMessage(elem) {
  console.log(elem.id);

  console.log(elem.parentNode);

  db.collection("messages")
    .doc(elem.id)
    .delete()
    .then(() => {
      alert("message deleted");
    })
    .catch((error) => {
      alert("something else ,", error);
    });
}

function deactivateUser() {
  db.collection("active_users").onSnapshot((snapshot) => {
    snapshot.forEach((doc) => {
      if (doc.data().email === auth.currentUser.email) {
        db.collection("active_users")
          .doc(doc.id)
          .delete()
          .then(() => {
            console.log("message deleted");
          })
          .catch((error) => {
            alert("something else ,", error);
          });
      }
    });
  });

  setTimeout(() => {
    signOut();
  }, 5000);
}
// ------------ Getting online users list ------------ //

db.collection("active_users").onSnapshot((snapshot) => {
  usersListEl.innerHTML = "";
  snapshot.forEach((doc) => {
    usersListEl.innerHTML += `<li class="clearfix">
    <img
      src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg"
      alt="avatar"
    />
    <div class="about">
      <div class="name">${doc.data().email}</div>
      <div class="status">
        <i class="fa fa-circle online"></i> online
      </div>
    </div>
  </li> `;
    console.log(doc.data().email);
  });
});
