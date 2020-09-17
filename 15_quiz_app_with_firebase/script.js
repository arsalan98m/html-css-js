// const quizData = [
//   {
//     question: "Html is Programming language?",
//     a: "True",
//     b: "False",

//     correctAns: "a",
//   },
//   {
//     question: "What does html stands for?",
//     a: "HyperText Markup Language",
//     b: "Scripting Language",
//     c: "Bash Langugae",
//     d: "Stylesheet",
//     correctAns: "a",
//   },

//   {
//     question: "What is the most used programming language?",
//     a: "Java",
//     b: "C",
//     c: "Python",
//     d: "JavaScript",
//     correctAns: "d",
//   },

//   {
//     question: "Which tag is used to break the line on html?",
//     a: "<hr />",
//     b: "<br />",
//     c: "<i>",
//     d: "<em>",
//     correctAns: "b",
//   },

//   {
//     question: "What is JavaScript?",
//     a: "Markup Langugae",
//     b: "Game",
//     c: "Programming Language",
//     d: "Stylesheet",
//     correctAns: "c",
//   },

//   {
//     question: "What does CSS Stands for?",
//     a: "Cascading Stylesheet",
//     b: "Normal Stylesheet",
//     c: "Higher Stylesheet",
//     d: "Medium Stylesheet",
//     correctAns: "a",
//   },

//   {
//     question: "What year was JavaScript launched?",
//     a: "1996",
//     b: "1995",
//     c: "none of the above",
//     correctAns: "b",
//   },
// ];
var db = firebase.firestore();
var auth = firebase.auth();
// Getting All elements on dom
const quiz = document.getElementById("quiz");
const questionEl = document.getElementById("question");
const submitBtn = document.getElementById("submit");
let leftQuestionsEl = document.getElementById("leftQuestions");
let minsEl = document.getElementById("mins");
let secsEl = document.getElementById("secs");
let showQuestionsEl = document.getElementById("showQuestions");
let selectEl = document.getElementById("select");
const question1El = document.getElementById("question1");
let logoutBtnEl = document.getElementById("logoutbtn");
var quizType = undefined;

// Showing available Quiz

function showAvailableQuiz() {
  // this code is auto refresh the page after data added
  // firebase
  //   .firestore()
  //   .collection("quizData")
  //   .onSnapshot((snapshot) => {
  //     const data = snapshot.docs.map((doc) => ({
  //       ...doc.data(),
  //     }));
  //     console.log("All quiz data", data);
  //     const availableQuiz = [...new Set(data.map((value) => value.quizType))];
  //     availableQuiz.forEach((quiz) => {
  //       selectEl.innerHTML += `<a href="JavaScript:void(0)" id=${quiz} onclick="select(this)">${quiz}</a>`;
  //     });
  //   });

  firebase
    .firestore()
    .collection("quizData")
    .get()
    .then((snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        ...doc.data(),
      }));
      const availableQuiz = [...new Set(data.map((value) => value.quizType))];

      availableQuiz.forEach((quiz) => {
        selectEl.innerHTML += `<a href="JavaScript:void(0)" id=${quiz} onclick="select(this)">${quiz}</a>`;
      });
    });
}

function select(e) {
  logoutBtnEl.setAttribute("style", "display: none");

  quizType = e.id;
  submitBtn.setAttribute("class", "");
  selectEl.innerText = "";
  question1El.innerText = "Enter Proctored Key";

  var inputText = document.createElement("input");
  inputText.setAttribute("type", "text");
  inputText.setAttribute("id", "key");
  inputText.setAttribute("value", "");
  inputText.setAttribute("placeholder", "Enter key here");
  inputText.setAttribute(
    "style",
    "display: flex;border: none;margin: 0 auto;  box-shadow: 10px 10px 30px #888888;background-color: white;padding: 10px;border-radius: 5px"
  );

  firebase
    .firestore()
    .collection("quizData")
    .where("quizType", "==", quizType)
    .onSnapshot((snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        ...doc.data(),
      }));

      alert(quizType + " proctored key is : " + data[0].procKey);
    });

  selectEl.appendChild(inputText);
}

// checking proctored key
function checkKey() {
  var proctoredKey = document.getElementById("key").value;

  firebase
    .firestore()
    .collection("quizData")
    .where("quizType", "==", quizType)
    .onSnapshot((snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        ...doc.data(),
      }));

      if (proctoredKey === data[0].procKey && quizType === data[0].quizType) {
        selectEl.innerHTML = "";
        question1El.innerHTML = "";
        submitBtn.setAttribute("onclick", "");

        getQuizData();
      } else {
        alert("please type correct key");
      }
    });
}

// ending proctored key

var quizData = undefined;

function getQuizData() {
  firebase
    .firestore()
    .collection("quizData")
    .where("quizType", "==", quizType)
    .onSnapshot((snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        ...doc.data(),
      }));

      startQuiz(data);
      submitBtn.setAttribute("onclick", "");
      submitBtn.innerText = "Next";
    });
}

function startQuiz(passData) {
  quizData = passData;

  // Calculating time start
  var mins = 4;
  let secs = 59;

  secsEl.innerText = secs;
  minsEl.innerText = formatTime(mins);
  timerStart();
  function timerStart() {
    let timer = setInterval(() => {
      secs--;

      secsEl.innerText = formatTime(secs);

      if (secs === 0) {
        secs = 59;
        mins = mins - 1;
        minsEl.innerText = formatTime(mins);

        if (mins === 0) {
          clearInterval(timer);
          // TODO: Show Results (if time is out)
          quiz.innerHTML = `<h2>You answerd Correctly ${score} / ${
            quizData.length
          } questions.</button>
      <h2> Time is taken ${4 - formatTime(mins)} min : 59 seconds</h2>
      <button onClick="location.reload()">Reload</button> `;
        }
      }
    }, 1000);
  }

  function formatTime(time) {
    return time < 10 ? `0${time}` : time;
  }

  // Calcualtime time End

  // Current Quiz Quesion Increament after loadQuiz Function
  let currentQuizQuestion = 0;
  let score = 0;

  function loadQuiz() {
    showQuestionsEl.innerHTML = "";
    deselectAnswers();
    const currentQuizData = quizData[currentQuizQuestion];

    // Creating questions elements
    questionEl.innerText = currentQuizData.question;
    for (let prop in currentQuizData) {
      if (
        prop !== "question" &&
        prop !== "correctAns" &&
        prop !== "procKey" &&
        prop !== "quizType"
      ) {
        let li = document.createElement("li");

        let input = document.createElement("input");
        input.setAttribute("type", "radio");
        input.setAttribute("id", prop);
        input.setAttribute("name", "answer");
        input.setAttribute("class", "answer");
        input.setAttribute("value", currentQuizData[prop]);

        let label = document.createElement("label");
        label.setAttribute("for", prop);
        label.setAttribute("id", prop + "_text");
        label.innerText = currentQuizData[prop];

        li.appendChild(input);
        li.appendChild(label);

        showQuestionsEl.appendChild(li);
      }
    }

    leftQuestionsEl.innerText = `Questions Left: ${currentQuizQuestion + 1} / ${
      quizData.length
    } `;
  }
  loadQuiz();
  // Checking answer is selected
  function getSelected() {
    const answerEls = document.querySelectorAll(".answer");
    let answer = undefined;
    answerEls.forEach((answerEl) => {
      if (answerEl.checked) {
        answer = answerEl.value;
      }
    });

    return answer;
  }

  // Deseleting Answers on Radio Buttons

  function deselectAnswers() {
    const answerEls = document.querySelectorAll(".answer");
    answerEls.forEach((answerEl) => {
      answerEl.checked = false;
    });
  }

  submitBtn.addEventListener("click", () => {
    const answer = getSelected();
    console.log(answer);
    if (answer) {
      if (answer === quizData[currentQuizQuestion].correctAns) {
        score++;
      }
      currentQuizQuestion++;
      if (currentQuizQuestion < quizData.length) {
        loadQuiz();
      } else {
        // TODO: Show Results
        quiz.innerHTML = `<h2>You answerd Correctly ${score} / ${
          quizData.length
        } questions.</h2>
      <h2> Time is taken ${4 - formatTime(mins)} min : ${
          59 - formatTime(secs)
        } sec</h2>
      <h2>You Got ${((score / quizData.length) * 100).toFixed(2)}%</h2>
      <button onClick="logoutUser()">Logout</button>`;
      }
    }
  });
}

function logoutUser() {
  auth.signOut().then(function () {
    localStorage.clear();
    window.location.href = "./index.html";
  });
}
