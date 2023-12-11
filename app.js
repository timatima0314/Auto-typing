const button = document.getElementById("button");
const button3 = document.getElementById("button3");

const audioBox = document.getElementById("audio_box");
let path;
button.addEventListener("click", async () => {
  path = await window.myAPI.openDialog();
  let source = document.createElement("source");
  source.src = path;
  // console.log(path);
  audioBox.appendChild(source);
});
// const fileInput = document.getElementById("example");
// // changeイベントで呼び出す関数
// const handleFileSelect = () => {
//   const files = fileInput.files;
//   for (let i = 0; i < files.length; i++) {
//     console.log(files[i]); // 1つ1つのファイルデータはfiles[i]で取得できる
//   }
// };

// // ファイル選択時にhandleFileSelectを発火
// fileInput.addEventListener("change", handleFileSelect);

button3.addEventListener("click", async () => {
  const sound = new Audio(
    path
  );
  sound.play();
});

