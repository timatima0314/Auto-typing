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
let val = "";
const savePath = path.join("./database", "");
var CryptoJS = require("crypto-js");

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1080,
    height: 900,
    title: "マイアプリ",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  mainWindow.webContents.openDevTools({ mode: "detach" });
  mainWindow.loadFile("index.html");
  ipcMain.on("set-A", (event, text) => {
    const webContents = event.sender;
    const win = BrowserWindow.fromWebContents(webContents);
    var ciphertext = CryptoJS.AES.encrypt(text, "secret key 123").toString();
    let where = {
      type: "a",
    };

    let set = {
      text: ciphertext,
    };
    db.updateRow("Test", savePath, where, set, (succ, msg) => {
      // succ - boolean, tells if the call is successful
      console.log("Success: " + succ);
      console.log("Message: " + msg);
    });
  });
  ipcMain.on("set-B", (event, text) => {
    const webContents = event.sender;
    const win = BrowserWindow.fromWebContents(webContents);
    console.log(text);
    var ciphertext = CryptoJS.AES.encrypt(text, "secret key 123").toString();
    val = text;
    let where = {
      type: "b",
    };

    let set = {
      text: ciphertext,
    };
    db.updateRow("Test", savePath, where, set, (succ, msg) => {
      // succ - boolean, tells if the call is successful
      console.log("Success: " + succ);
      console.log("Message: " + msg);
    });
  });
  ipcMain.on("set-C", (event, text) => {
    const webContents = event.sender;
    const win = BrowserWindow.fromWebContents(webContents);
    console.log(text);
    let where = {
      type: "c",
    };

    let set = {
      text: text,
    };
    db.updateRow("Test", savePath, where, set, (succ, msg) => {
      // succ - boolean, tells if the call is successful
      console.log("Success: " + succ);
      console.log("Message: " + msg);
    });
  });

  // if (!db.tableExists("Test", savePath)) {
  //   db.createTable("Test", savePath, (success, msg) => {
  //     if (success) {
  //     } else {
  //       return;
  //     }
  //   });
  // }
};
app.whenReady().then(() => {
  globalShortcut.register("CommandOrControl+A", () => {
    (async () => {
      db.getAll("Test", savePath, async (success, data) => {
        if (success) {
          await keyboard.type(data[0].text);
        } else {
          console.log("getAll failed");
        }
      });
    })();
  });
  globalShortcut.register("CommandOrControl+B", () => {
    (async () => {
      db.getAll("Test", savePath, async (success, data) => {
        if (success) {
          var bytes = CryptoJS.AES.decrypt(data[1].text, "secret key 123");
          var originalText = bytes.toString(CryptoJS.enc.Utf8);

          await keyboard.type(originalText);
        } else {
          console.log("getAll failed");
        }
      });
    })();
  });
  globalShortcut.register("CommandOrControl+C", () => {
    (async () => {
      db.getAll("Test", savePath, async (success, data) => {
        if (success) {
          await keyboard.type(data[2].text);
        } else {
          console.log("getAll failed");
        }
      });
    })();
  });
});

app.once("ready", () => {
  createWindow();
});

app.once("window-all-closed", () => app.quit());
