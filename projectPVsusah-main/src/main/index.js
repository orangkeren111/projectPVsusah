import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'

const fs = require("fs");
const path = require("path");

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      nodeIntegration: false,
      contextIsolation: true,
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  // Handle User Page
  ipcMain.handle("save", (event, users) => {
    fs.writeFileSync("./user.json", JSON.stringify(users));
  });

  ipcMain.handle("makeInvoice", (event, [nota, user]) => {
    const receipt = `--------------------------------------------------
                 NETFLIX
          1234 Market Street, City
            Phone: (123) 456-7890
        Date: ${nota.date}  Time: ${nota.time}
--------------------------------------------------
Buyer: ${nota.name}
--------------------------------------------------
Item                      Qty    Price   Total
--------------------------------------------------
Subscription (${nota.type})    1      $${nota.cost}     $${nota.cost}

--------------------------------------------------
Subtotal                                 $${nota.cost}
Tax (8%)                                 $${nota.cost*8/100}
--------------------------------------------------
Total                                    $${nota.cost*108/100}
--------------------------------------------------
         Thank you for subscribing!
            Enjoy our service!
--------------------------------------------------
`;
    const dataTransaksi = JSON.parse(fs.readFileSync("./transaksi.json"));
    const paddedNumber = (dataTransaksi.length+1).toString().padStart(4, '0');
    const idNota = `NOT${paddedNumber}`
    const folderPath = "./receipt"
    const fileName = `${idNota}.txt`
    const filePath = path.join(folderPath, fileName)
    nota.id = idNota
    dataTransaksi.push(nota)
    fs.writeFileSync(filePath, receipt);
    fs.writeFileSync("./transaksi.json", JSON.stringify(dataTransaksi));
  });

  ipcMain.handle("load", () => {
    return JSON.parse(fs.readFileSync("./user.json"));
  });
  ipcMain.handle("loadMovie", () => {
    return JSON.parse(fs.readFileSync("./film.json"));
  });

  // Handle Admin Page
  ipcMain.on("saveFilm", function(event, newFilm) {
    let film = JSON.parse(fs.readFileSync("./film.json"));
    film = newFilm;
    fs.writeFileSync("./film.json", JSON.stringify(film,null,2));
  })
  ipcMain.handle("getSales", function (event) {
    let sales = JSON.parse(fs.readFileSync("./transaksi.json"));
    return sales;
  });
  ipcMain.handle("getCust", function (event) {
    let cust = JSON.parse(fs.readFileSync("./user.json"));
    return cust;
  });

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
