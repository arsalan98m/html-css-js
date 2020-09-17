// database

var db = firebase.firestore();
var auth = firebase.auth();

// Getting All elements on dom
var showChoicesEl = document.getElementById("show-choices");
var quizTypeEl = document.getElementById("quizType");
var questionEl = document.getElementById("questionField");
var correctAnswerEl = document.getElementById("correctAnswer");
let proctoredKeyEl = document.getElementById("proctoredKey");
let updateQuizEl = document.getElementById("update");

// selecting multiple quiz option
let selectChoicesEl = document.querySelector(".admin-filter-options");
selectChoicesEl.addEventListener("click", selectChoices);

function selectChoices(data) {
  var value = data.target.value;

  switch (value) {
    case "2":
      var inputEl = `<input type="text" class="choices" id="choice1" placeholder="choice 1"/> <br />
                    <input type="text" class="choices" id="choice2" placeholder="choice 2"/>`;

      showChoicesEl.innerHTML = inputEl;

      break;
    case "3":
      var inputEl = `<input type="text" class="choices" id="choice1"  placeholder="choice 1"/> <br />
        <input type="text" id="choice2" class="choices" placeholder="choice 2"/> <br />
        <input type="text" id="choice3" class="choices" placeholder="choice 3"/>
        `;
      showChoicesEl.innerHTML = inputEl;
      break;
    case "4":
      var inputEl = `<input type="text" class="choices" id="choice1" placeholder="choice 1"/> <br />
        <input type="text" id="choice2" class="choices" placeholder="choice 2"/><br />
        <input type="text" id="choice3" class="choices" placeholder="choice 3"/><br />
        <input type="text" id="choice4" class="choices" placeholder="choice 4"/>
        `;
      showChoicesEl.innerHTML = inputEl;
      break;
  }

  console.log(document.querySelectorAll(".choices")[0].value);
}

// Saving data on firebase firestore
function addQuestions() {
  // capitalizing letters
  var firstCharquizTypeEl = quizTypeEl.value[0].toUpperCase();
  var secondCharquizTypeEl = quizTypeEl.value.slice(1).toLowerCase();
  var titleQuizType = firstCharquizTypeEl + secondCharquizTypeEl;

  var firstCharQuestion = questionEl.value[0].toUpperCase();
  var secondCharQuestion = questionEl.value.slice(1).toLowerCase();
  var titleQuestion = firstCharQuestion + secondCharQuestion;

  var quizData = {
    question: titleQuestion,
    quizType: titleQuizType,
    procKey: proctoredKeyEl.value,
  };

  if (document.querySelectorAll(".choices").length == 2) {
    quizData.a = document.querySelectorAll(".choices")[0].value;
    quizData.b = document.querySelectorAll(".choices")[1].value;
    quizData.correctAns = correctAnswerEl.value;
  } else if (document.querySelectorAll(".choices").length == 3) {
    quizData.a = document.querySelectorAll(".choices")[0].value;
    quizData.b = document.querySelectorAll(".choices")[1].value;
    quizData.c = document.querySelectorAll(".choices")[2].value;
    quizData.correctAns = correctAnswerEl.value;
  } else if (document.querySelectorAll(".choices").length == 4) {
    quizData.a = document.querySelectorAll(".choices")[0].value;
    quizData.b = document.querySelectorAll(".choices")[1].value;
    quizData.c = document.querySelectorAll(".choices")[2].value;
    quizData.d = document.querySelectorAll(".choices")[3].value;
    quizData.correctAns = correctAnswerEl.value;
  }

  db.collection("quizData")
    .add(quizData)
    .then(() => {
      alert("Question Added");
      quizTypeEl.value = "";
      questionEl.value = "";
      correctAnswerEl.value = "";
      proctoredKeyEl.value = "";
    });
}

// Delte data on Firebase
function deleteQuiz() {
  var firstCharquizTypeEl = quizTypeEl.value[0].toUpperCase();
  var secondCharquizTypeEl = quizTypeEl.value.slice(1).toLowerCase();
  var titleQuizType = firstCharquizTypeEl + secondCharquizTypeEl;

  db.collection("quizData")
    .where("quizType", "==", titleQuizType)
    .get()
    .then((snap) => {
      var batch = db.batch();

      snap.forEach((doc) => {
        batch.delete(doc.ref);
      });

      return batch.commit();
    })
    .then(() => {
      alert("Deleted Data Successfully");
    });
}

function logoutUser() {
  auth.signOut().then(function () {
    localStorage.clear();
    window.location.href = "./index.html";
  });
}
// logics im used

// firebase
//   .firestore()
//   .collection("quizData")
//   .where("quizType", "==", "Html")
//   .onSnapshot((snapshot) => {
//     const data = snapshot.docs.map((doc) => ({
//       ...doc.data(),
//     }));
//     console.log("All quiz data", data);
//     console.log("quiz Type: ", data[0].quizType);
//     console.log("proc key: ", data[0].procKey);
//   });
