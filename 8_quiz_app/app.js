// Quesions

var mainHeading = document.getElementById("heading");
var myQuestions = {
    1: {
        question: "Q: What is html?",
        choices: ["markup lang", "programming lang", "scripting lang", "None"],
        correctAnswer: "markup language",
    },
    2: {
        question: "Q: Which tag in html is used for line break?",
        choices: ["<b>", "<hr>", "<br>", "<i>"],

        correctAnswer: "<br>"
    },
    3: {
        question: "Q: What does HTML stand for?",
        choices: ["Hyper Text Markup Language", "Hyperlinks and Text Markup Language", "Home Tool Markup Language"],

        correctAnswer: "Hyper Text Markup Language"
    },

    4: {
        question: "Q: Who is making the Web standards?",
        choices: ["Mozilla", "Microsoft", "The Wweb Consortium", "Google"],

        correctAnswer: "The World Web Consortium"
    },
    5: {
        question: "Q: Choose the correct HTML element for the largest heading:",
        choices: ["<head>", "<h6>", "<heading>", "<h1>"],

        correctAnswer: "<h1>"
    }

};

// Selection Quiz
var filterOption = document.querySelector('.filter-option');
filterOption.addEventListener('click', filterOptions);

function filterOptions(e) {

    switch (e.target.value) {
        case "html":
            var htmlQuesions = {
                1: {
                    question: "Q: What is html?",
                    choices: ["markup lang", "programming lang", "scripting lang", "None"],
                    correctAnswer: "markup language",
                },
                2: {
                    question: "Q: Which tag in html is used for line break?",
                    choices: ["<b>", "<hr>", "<br>", "<i>"],

                    correctAnswer: "<br>"
                },
                3: {
                    question: "Q: What does HTML stand for?",
                    choices: ["Hyper Text Markup Language", "Hyperlinks and Text Markup Language", "Home Tool Markup Language"],

                    correctAnswer: "Hyper Text Markup Language"
                },

                4: {
                    question: "Q: Who is making the Web standards?",
                    choices: ["Mozilla", "Microsoft", "The Wweb Consortium", "Google"],

                    correctAnswer: "The World Web Consortium"
                },
                5: {
                    question: "Q: Choose the correct HTML element for the largest heading:",
                    choices: ["<head>", "<h6>", "<heading>", "<h1>"],

                    correctAnswer: "<h1>"
                }

            }
            myQuestions = htmlQuesions;
            mainHeading.innerHTML = "HTML Quiz";
            startButton.setAttribute("style", "display: inline-block");
            console.log(myQuestions);
            break;
        case "css":
            var cssQuestions = {
                1: {
                    question: "Q: What does CSS stand for?",
                    choices: ["Computer Style Sheets", "Colorful Style Sheets", "Cascading Style Sheets", "Creative Style Sheets"],
                    correctAnswer: "Cascading Style Sheets",
                },
                2: {
                    question: "Q: Which HTML tag is used to define an internal style sheet?",
                    choices: ["<style>", "<css>", "<script>"],

                    correctAnswer: "<style>"
                },
                3: {
                    question: "Q: Which HTML attribute is used to define inline styles?",
                    choices: ["font", "style", "styles", "class"],

                    correctAnswer: "style"
                },

                4: {
                    question: "Q: How do you insert a comment in a CSS file?",
                    choices: ["// this is a comment", "/* this is a comment */", "'this is a comment", "// this is a comment //"],

                    correctAnswer: "/* this is a comment */"
                },
                5: {
                    question: "Q: Which property is used to change the background color?",
                    choices: ["background-color", "color", "bgcolor", "bg-colors"],

                    correctAnswer: "background-color"
                }
            }

            myQuestions = cssQuestions;
            mainHeading.innerHTML = "CSS Quiz";
            startButton.setAttribute("style", "display: inline-block");

            console.log(myQuestions);
            break;
        case "javascript":
            var javaScriptQuestions = {
                1: {
                    question: "Q: Inside which HTML element do we put the JavaScript?",
                    choices: ["<scripting>", "<js>", "<script>", "<javascript>"],
                    correctAnswer: "<script>",
                },
                2: {
                    question: "Q:Where is the correct place to insert a JavaScript?",
                    choices: ["The <body> section", "The <head> section", "Both"],

                    correctAnswer: "The <body> section"
                },
                3: {
                    question: "Q: What is the correct syntax for referring to an external script called 'xxx.js'?",
                    choices: ["<script href='xxx.js'>", "<script src='xxx.js'>", "<script name='xxx.js'>", "<script alt='xxx.js'>"],

                    correctAnswer: "<script src='xxx.js'>"
                },

                4: {
                    question: "Q: The external JavaScript file must contain the <script> tag.",
                    choices: ["True", "False"],

                    correctAnswer: "False"
                },
                5: {
                    question: "Q: How do you create a function in JavaScript?",
                    choices: ["function:myFunction()", "function = myFunction()", "function myFunction()", "function.myFunction()"],

                    correctAnswer: "function myFunction()"
                }
            }

            myQuestions = javaScriptQuestions;
            mainHeading.innerHTML = "JavaScript Quiz";
            startButton.setAttribute("style", "display: inline-block");

            console.log(myQuestions);
            break;

    }




}

var count = 1;
var score = 0;
var showChoices = document.getElementById("showChoices");
var startButton = document.getElementById("start");
var nextButton = document.getElementById("startBtn");
var inputName = document.getElementById("name");
var formGroup = document.querySelector('form-group');


function displayChoices() {




    // Removing name input, select quiz and start button after starting quiz
    startButton.remove();
    filterOption.remove();
    inputName.setAttribute("style", "display: none");
    nextButton.setAttribute("style", "display: inline-block")


    // Showing Questions Paragraph Element and count is used for increment to target for next question
    var showQuestions = document.getElementById("showQuestions");
    showQuestions.innerText = myQuestions[count].question;

    // Showing Choices on div ShowChoices (loop lagay hai kun ki choices ki array bani hui hai woh ek ek kar k index sy data uthay ga)
    // or element create karta jayega label or radio button ky jitny choices hongy utny

    var choicesLength = myQuestions[count].choices.length;
    for (var i = 0; i < choicesLength; i++) {
        var choiceValue = myQuestions[count].choices[i];

        // creating div for bootstrap styling
        var div = document.createElement("div");
        div.setAttribute("class", "form-check");

        // creating label 
        var label = document.createElement("label");
        label.setAttribute("for", "option" + i);
        label.setAttribute("class", "form-check-label ml-2");


        // creating label text
        var labelText = document.createTextNode(myQuestions[count].choices[i]);
        label.appendChild(labelText);

        // creating radio button
        var radioButton = document.createElement("input");
        radioButton.setAttribute("type", "radio");
        radioButton.setAttribute("name", "choices");
        radioButton.setAttribute("id", "option" + i);
        radioButton.setAttribute("value", choiceValue);
        radioButton.setAttribute("class", "form-check-input text-center");

        // har button par attribute set kar rahy hai ta k uski value get kar sakien
        radioButton.setAttribute("onclick", "calculateScore(this)");

        //label.appendChild(radioButton);


        div.appendChild(radioButton);
        div.appendChild(label);
        showChoices.appendChild(div);
        //appending label to main - div
        //showChoices.appendChild(label);

        // next line main jo code hai woh bhi use kar sakty hain jo kaam humny uppar 10 line main kiya hai
        //showChoices.innerHTML += `<label for="option+${i}"><input type="radio" name="choices" id="option${i}" value="${choiceValue}">${myQuestions[count].choices[i]}</label>`;

    }

    count++;


}

// nextQuestion ka function jab bhi call hoga tu count ki value main 1 incrment hoga
// or next question show hojayega 
// total questions 5 rakhy hai tu islyeh main condition lagai hai k count ki value 6 ya 6
// sy ziya da hot tu quiz over kardena

function nextQuestion() {

    showChoices.innerHTML = "";

    if (count >= 6) {
        var showQuestions = document.getElementById("showQuestions");
        showQuestions.innerHTML = "<p>Result</p>";
        showQuestions.innerHTML += `<table class="table-striped table-hover table-bordered table-responsive"><tr class="text-center"><td>Name</td><td>${inputName.value}</td></tr> <tr class="text-center"><td>Correct answers</td><td>${score}</td><tr class="text-center"><td>Wrong answers</td><td>${(count - 1) - score}</td><tr></tr><tr class="text-center"><td>Percentage</td><td>${score / (count - 1) * 100} %</td><tr></table>`
        nextButton.innerText = "Start Again";
        nextButton.setAttribute("onclick", "startAgain()");
        count = 1;
        score = 0;

    } else {
        displayChoices();

    }

}

// jis radio button par click karengy uski value is calculateScore ky function main get hogi;

function calculateScore(e) {

    var value = e.value;

    if (value === myQuestions[count - 1].correctAnswer) {
        e.removeAttribute("onclick");
        score++;
    }
}

// Quiz End Hony ky baad jab start again par click hoga tu page refresh ho jayega
function startAgain() {
    showChoices.innerHTML = "";
    location.reload();
}







