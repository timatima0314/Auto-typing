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
  var para = document.getElementById("json");
  const text = inputB.value;
  console.log(text);
  // let html = para.outerHTML;
  // console.log(html);
  let obj = text;
  let json = JSON.stringify(obj);
  window.myAPI.setB(text);
});
setButtonC.addEventListener("click", () => {
  const text = inputC.value;
  // let a = `  <div id='json'>
  // <p>aaa</p>
  // <p>bbb</p>
  // </div>
  // `;
  // const rep = text.replace()
  // const val = JSON.stringify(text, (k, v) =>
  //   typeof v === "string" ? v.replace(/\n/g, "\r\n") : v
  // );
  window.myAPI.setC(text);
});
