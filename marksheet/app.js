function getMarks() {
  // get marks
  var english = document.getElementById("eng");
  english = parseInt(english.value);

  var maths = document.getElementById("maths");
  maths = parseInt(maths.value);

  var computer = document.getElementById("comp");
  computer = parseInt(computer.value);

  var physics = document.getElementById("phy");
  physics = parseInt(physics.value);

  var urdu = document.getElementById("urdu");
  urdu = parseInt(urdu.value);

  var obtainedMarks = english + maths + computer + physics + urdu;

  var percentage = (obtainedMarks / 500) * 100;

  // get information

  var first_name = document.getElementById("f_name");
  first_name = first_name.value;

  var last_name = document.getElementById("l_name");
  last_name = last_name.value;

  var institute = document.getElementById("institute");
  institute = institute.value;

  // show information
  var information = document.getElementById("information");
  information.innerHTML = "Student Information";
  information.style.border = "2px solid white";
  information.style.width = "80%";
  information.style.margin = "auto";

  var pf_name = document.getElementById("pf_name");
  pf_name.innerHTML = "First name : " + first_name;

  var pl_name = document.getElementById("pl_name");
  pl_name.innerHTML = "Last name : " + last_name;

  var p_institute = document.getElementById("p_institute");
  p_institute.innerHTML = "Institute: " + institute;

  // show marks & table With condition
  if (
    isNaN(english) ||
    isNaN(maths) ||
    isNaN(physics) ||
    isNaN(computer) ||
    isNaN(urdu)
  ) {
    alert("Please type valid marks");
  } else {
    var s_english = document.getElementById("s_english");
    s_english.innerHTML = english;

    var s_math = document.getElementById("s_math");
    s_math.innerHTML = maths;

    var s_computer = document.getElementById("s_computer");
    s_computer.innerHTML = computer;

    var s_physics = document.getElementById("s_physics");
    s_physics.innerHTML = physics;

    var s_urdu = document.getElementById("s_urdu");
    s_urdu.innerHTML = urdu;
  }

  var show_table = document.getElementById("table-show");
  show_table.className = "display-show";
  // showing percentage and marks

  var showObtainedMarks = document.getElementById("showMarks");
  showObtainedMarks.innerHTML = "Marks : " + obtainedMarks + " out of 500";

  var showPercentage = document.getElementById("showPercentage");
  showPercentage.innerHTML = "Percentage: " + percentage + "%";
  // showing grade
  var showGrade = document.getElementById("showGrade");

  if (percentage >= 90 && percentage <= 100) {
    showGrade.innerHTML = "Grade : A+";
  } else if (percentage >= 80 && percentage <= 90) {
    showGrade.innerHTML = "Grade : A";
  } else if (percentage >= 70 && percentage <= 80) {
    showGrade.innerHTML = "Grade : B";
  } else if (percentage >= 60 && percentage <= 70) {
    showGrade.innerHTML = "Grade : C";
  } else if (percentage >= 50 && percentage <= 60) {
    showGrade.innerHTML = "Grade : D";
  } else if (percentage >= 0 && percentage <= 50) {
    showGrade.innerHTML = "Grade: Failed!!!!!!!";
  } else {
    showGrade.innerHTML = "Please type valid marks";
  }
}
