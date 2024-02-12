const { ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld("myAPI", {
  openDialog: () => ipcRenderer.invoke("open-dialog"),
  setTitle: (title) => ipcRenderer.send('set-title', title)

});
