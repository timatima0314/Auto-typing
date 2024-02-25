const setButtonA = document.getElementById("btn-a");
const inputA = document.getElementById("type-a");
const setButtonB = document.getElementById("btn-b");
const inputB = document.getElementById("type-b");
const setButtonC = document.getElementById("btn-c");
const inputC = document.getElementById("type-c");

setButtonA.addEventListener("click", () => {
  const textA = inputA.value;
  window.myAPI.setA(textX);
});
setButtonB.addEventListener("click", () => {
  const textB = inputB.value;
  window.myAPI.setB(textB);
});
setButtonC.addEventListener("click", () => {
  const textC = inputC.value;
  window.myAPI.setC(textC);
});

// window.addEventListener('keydown', function( e ) {
// 	e.preventDefault();

// 	if( e.key == 'Shift' ) {
// 		if( e.location == KeyboardEvent.DOM_KEY_LOCATION_LEFT ) {
// 			ele.innerHTML='左シフト';
// 		}
// 		else if( e.location == KeyboardEvent.DOM_KEY_LOCATION_RIGHT ) {
// 			ele.innerHTML='右シフト';
// 		}
// 		else {
// 			ele.innerHTML='不明';
// 		}
// 	}
// });
