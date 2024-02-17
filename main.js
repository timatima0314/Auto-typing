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
const { request } = require("http");
const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1080,
    height: 900,
    title: "マイアプリ",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
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
      text: text,
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
  // const $ = (jQuery = require("jquery"));
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
          // console.log(data[1].text);
          let a = data[1].text;
          // console.log(val);
          // const rep = text.replace();
          // const str = "<link rel=\'stylesheet\' href=\'style.css\'>\n<title>マイアプリ</title>";
          // const aaa = JSON.stringify(val);
          // console.log("str",str);
          // console.log('a',a)
          const ii = a.replace(/\n/g, "\r\n");
          // console.log(ii);
          //   typeof v === "string" ? v.replace(/\n/g, "\r\n") : v
          // );
          // const json = '{"text": "<link rel=\'stylesheet\' href=\'style.css\'>\r<title>マイアプリ</title>"}';
          // const obj = JSON.parse(json);
          await keyboard.type(ii);
        } else {
          console.log("getAll failed");
        }
      });
    })();
  });
  globalShortcut.register("CommandOrControl+H", () => {
    (async () => {
      db.getAll("Test", savePath, async (success, data) => {
        if (success) {
          await keyboard.type(`<head>
          <meta charset="UTF-8" />
          <meta http-equiv="Content-Security-Policy" content="default-src 'self'" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link rel="stylesheet" href="style.css">
          <title>マイアプリ</title>
        </head>
        `);
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
