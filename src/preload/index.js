import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  consoleLogger: (message) => {
    ipcRenderer.invoke("consoleLogger", message)
  },
  save: (users) => {
    ipcRenderer.invoke("save", users);
  },
  load: () => {
    return ipcRenderer.invoke("load");
  },
  loadMovie: () => {
    return ipcRenderer.invoke("loadMovie");
  },
  makeInvoice: (nota) => {
    ipcRenderer.invoke("makeInvoice", nota);
  },
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}
