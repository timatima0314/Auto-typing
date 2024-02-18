const {
  app,
  BrowserWindow,
  ipcMain,
  globalShortcut,
} = require("electron");
const path = require("path");
const { keyboard, Key } = require("@nut-tree/nut-js");
const db = require("electron-db");
const savePath = path.join("./database", "");
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
    let where = {
      type: "a",
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
  ipcMain.on("set-B", (event, text) => {
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
};
app.whenReady().then(() => {
  globalShortcut.register("CommandOrControl+A", () => {
    (async () => {
      db.getAll("Test", savePath, async (success, data) => {
        if (success) {
          const dbDataA = data[0].text;
          const reDataA =dbDataA.replace(/\n/g, "\r\n").replace(/\s+\s+/g, 'んんんんんんんんんんんん').replace(/んんんんんんんんんんんん/g,"\r\n");
          await keyboard.type(reDataA);
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
          let a = data[1].text;
          // console.log(val);
          // const rep = text.replace();
          // const str = "<link rel=\'stylesheet\' href=\'style.css\'>\n<title>マイアプリ</title>";
          // const aaa = JSON.stringify(val);
          // console.log("str",str);
          // console.log('a',`${a}`)
          // console.log(1,ii)
          const ii =a.replace(/\n/g, "\r\n");
          // console.log(2,iii)
          const iii =ii.replace(/\s+\s+/g, 'んんんんんんんんんんんん');
          const e = iii.replace(/んんんんんんんんんんんん/g,"\r\n");
          console.log(e);
          //   typeof v === "string" ? v.replace(/\n/g, "\r\n") : v
          // );
          // const json = '{"text": "<link rel=\'stylesheet\' href=\'style.css\'>\r<title>マイアプリ</title>"}';
          // const obj = JSON.parse(json);
          await keyboard.type(e);
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
          let dbData = data[2].text;
          const reData =dbData.replace(/\n/g, "\r\n").replace(/\s+\s+/g, 'んんんんんんんんんんんん').replace(/んんんんんんんんんんんん/g,"\r\n");
          await keyboard.type(reData);
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
