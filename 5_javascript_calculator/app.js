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
  result.value = eval(result.value);
}
