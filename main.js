const {
  app,
  BrowserWindow,
  ipcMain,
  dialog,
  globalShortcut,
} = require("electron");
const path = require("path");
var player = require("play-sound")((opts = {}));
let filePath;
const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 600,
    height: 400,
    title: "マイアプリ",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  mainWindow.webContents.openDevTools({ mode: "detach" });
  mainWindow.loadFile("index.html");
  ipcMain.handle("open-dialog", async () => {
    return (
      dialog
        // ファイル選択ダイアログを表示する
        .showOpenDialog(mainWindow, {
          properties: ["openFile"],
        })
        .then((result) => {
          console.log(result.filePaths);
          // キャンセルボタンが押されたとき
          if (result.canceled) return "";
          // 選択されたファイルの絶対パスを返す
          filePath = result.filePaths[0];
          return result.filePaths[0];
        })
        .catch((err) => console.error(err))
    );
  });
};

app.whenReady().then(() => {
  globalShortcut.register("CommandOrControl+I", () => {
    console.log(filePath);
    player.play(filePath, function (err) {
      if (err) throw err;
    });
  });
});

app.once("ready", () => {
  createWindow();
});

app.once("window-all-closed", () => app.quit());
