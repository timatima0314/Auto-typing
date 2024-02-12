const setButtonA = document.getElementById("btn-a");
const inputA = document.getElementById("type-a");
const setButtonB = document.getElementById("btn-b");
const inputB = document.getElementById("type-b");
const setButtonC = document.getElementById("btn-c");
const inputC = document.getElementById("type-c");

setButtonA.addEventListener("click", () => {
  const text = inputA.value;
  window.myAPI.setA(text);
});
setButtonB.addEventListener("click", () => {
  const text = inputB.value;
  window.myAPI.setB(text);
});
setButtonC.addEventListener("click", () => {
  const text = inputC.value;
  window.myAPI.setC(text);
});
