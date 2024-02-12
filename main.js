const {
  app,
  BrowserWindow,
  ipcMain,
  dialog,
  globalShortcut,
} = require("electron");
const path = require("path");
const { keyboard, Key } = require("@nut-tree/nut-js");
const db = require("electron-db");

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
  ipcMain.on("set-title", (event, title) => {
    const webContents = event.sender;
    const win = BrowserWindow.fromWebContents(webContents);
    console.log(title);
    win.setTitle(title);
  });
  const savePath = path.join("./database", "");
  // if (!db.tableExists("Test", savePath)) {
  //   db.createTable("Test", savePath, (success, msg) => {
  //     if (success) {
  //     } else {
  //       return;
  //     }
  //   });
  // }
  // db.getAll("Test", savePath, (success, data) => {
  //   if (success) {
  //     console.log("getAll success");
  //     console.log(data);
  //   } else {
  //     console.log("getAll failed");
  //   }
  // });
};

app.whenReady().then(() => {
  globalShortcut.register("CommandOrControl+I", () => {
    console.log("");
    (async () => {
      await keyboard.type("Hello World!");
      // We can even type special characters
      await keyboard.type("🎉");
      await keyboard.pressKey(Key.LeftShift);
      await keyboard.type("Modifier keys are supported");
      await keyboard.releaseKey(Key.LeftShift);
    })();
  });
});

app.once("ready", () => {
  createWindow();
});

app.once("window-all-closed", () => app.quit());
