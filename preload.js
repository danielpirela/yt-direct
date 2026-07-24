const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('api', {
  extract: (url) => ipcRenderer.invoke('extract', url),
  copyToClipboard: (text) => ipcRenderer.invoke('clipboard-write', text),
})
