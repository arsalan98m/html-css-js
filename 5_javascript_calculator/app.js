function setValue(num) {
  let result = document.getElementById("result");
  result.value += num;
}

function clearValue() {
  let result = document.getElementById("result");
  result.value = "";
}

function calculation() {
  let result = document.getElementById("result");

  var matchFound = false;
  var foundOperator = result.value;

  for (var i = 0; i < foundOperator.length; i++) {
    if (
      foundOperator.slice(i, i + 2) === "++" ||
      foundOperator.slice(i, i + 2) === "--" ||
      foundOperator.slice(i, i + 2) === "**" ||
      foundOperator.slice(i, i + 2) === "//"
    ) {
      result.value = "Please type valid operator";
      matchFound = true;

      break;
    }
  }

  if (matchFound === false) {
    result.value = eval(result.value);
  }

  //result.value = eval(result.value);
}
