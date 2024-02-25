const { app, BrowserWindow, ipcMain, globalShortcut } = require("electron");
const path = require("path");
const { keyboard, Key } = require("@nut-tree/nut-js");
const db = require("electron-db");
const { electron } = require("process");
const savePath = path.join("./database", "");
const fs = require("fs");

const execSync = require("child_process").execSync;
const parseGitDiff = require("parse-git-diff").default; // require
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
    db.updateRow("DB", savePath, where, set, (succ, msg) => {
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

    db.updateRow("DB", savePath, where, set, (succ, msg) => {
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
    db.updateRow("DB", savePath, where, set, (succ, msg) => {
      // succ - boolean, tells if the call is successful
      console.log("Success: " + succ);
      console.log("Message: " + msg);
    });
  });
};
app.whenReady().then(() => {
  globalShortcut.register("CommandOrControl+A", () => {
    (async () => {
      db.getAll("DB", savePath, async (success, data) => {
        if (success) {
          const dbDataA = data[0].text;
          const reDataA = dbDataA
            .replace(/\n/g, "\r\n")
            .replace(/\s+\s+/g, "んんんんんんんんんんんん")
            .replace(/んんんんんんんんんんんん/g, "\r\n");
          await keyboard.type(reDataA);
        } else {
          console.log("getAll failed");
        }
      });
    })();
  });
  globalShortcut.register("CommandOrControl+B", () => {
    (async () => {
      db.getAll("DB", savePath, async (success, data) => {
        if (success) {
          let a = data[1].text;
          const ii = a.replace(/\n/g, "\r\n");
          const iii = ii.replace(/\s+\s+/g, "んんんんんんんんんんんん");
          const e = iii.replace(/んんんんんんんんんんんん/g, "\r\n");
          console.log(e);
          keyboard.config.autoDelayMs = 100;

          await keyboard.type(e);
        } else {
          console.log("getAll failed");
        }
      });
    })();
  });
  globalShortcut.register("CommandOrControl+C", () => {
    (async () => {
      db.getAll("DB", savePath, async (success, data) => {
        if (success) {
          let dbData = data[2].text;
          const reData = dbData
            .replace(/\n/g, "\r\n")
            .replace(/\s+\s+/g, "んんんんんんんんんんんん")
            .replace(/んんんんんんんんんんんん/g, "\r\n");
          keyboard.config.autoDelayMs = 10;
          await keyboard.type(reData);
        } else {
          console.log("getAll failed");
        }
      });
    })();
  });
  let count = 0;
  globalShortcut.register("CommandOrControl+Left", () => {
    (async () => {
      if (!count) {
        // タップの回数を+1
        ++count;
        // 500ミリ秒以内に2回目のタップがされればダブルタップと判定
        setTimeout(function () {
          count = 0;
        }, 500);

        // ダブルタップ
      } else {
        // 拡大をさせない
        // 処理を記述
        // 回数をリセット
        count = 0;
        console.log("ダブルタップされました");
      }
    })();
  });

  //   const cmd = 'git diff';
  // const result = execSync(cmd).toString().split(',');
  // const commitID = result;
  // const commitDate = new Date(result[1]);

  // console.log(commitID);
  // console.log(commitDate);
  // console.log(result);
  //  const diff   = parser('git diff');

  // console.log(diff);
  // console.log(aa)
  // const diff   = parser(fs.readFileSync('a/newfile.md'));
  // console.log(diff);
  // fs.readFile('main.js', 'utf8', function(err, data) {

  // console.log(data);
  // })
  const GIT_DIFF = `diff --git a/newfile.md b/newfile.md
new file mode 100644
index 0000000..aa39060
--- /dev/null
+++ b/newfile.md
@@ -0,0 +1 @@
+newfile
`;
  const git = `diff --git a/app.js b/app.js
index 1bf86e4..9501f66 100644
--- a/app.js
+++ b/app.js
@@ -7,7 +7,7 @@ const inputC = document.getElementById("type-c");
  
  setButtonA.addEventListener("click", () => {
    const textA = inputA.value;
-  window.myAPI.setA(textA);
+  window.myAPI.setA(textX);
  });
  setButtonB.addEventListener("click", () => {
    const textB = inputB.value;
@@ -17,3 +17,20 @@ setButtonC.addEventListener("click", () => {
    const textC = inputC.value;
    window.myAPI.setC(textC);
  });
+let ele = document.getElementsByTagName("h1")[0];
+ 
+window.addEventListener('keydown', function( e ) {
+       e.preventDefault();
+ 
+       if( e.key == 'Shift' ) {
+               if( e.location == KeyboardEvent.DOM_KEY_LOCATION_LEFT ) {
+                       ele.innerHTML='左シフト';
+               }
+               else if( e.location == KeyboardEvent.DOM_KEY_LOCATION_RIGHT ) {
+                       ele.innerHTML='右シフト';
+               }
+               else {
+                       ele.innerHTML='不明';
+               }
+       }
+});
`;
  const result = parseGitDiff(GIT_DIFF);
  console.log(result);
  // console.log(result.files[0].chunks);

  // const obj = result.files[0].chunks[0].changes;
  // obj.map((x) => {
  // console.log(x);
  // });
});

app.once("ready", () => {
  //  globalShortcut.register('CommandOrControl+Left', function() {
  //   console.log('ctrl+x is pressed');
  // });
  createWindow();
});

app.once("window-all-closed", () => app.quit());
