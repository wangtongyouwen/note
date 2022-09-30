const {app, BrowserWindow} = require('electron')

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600
  })
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
  mainWindow.loadURL('http://localhost:8080/')
}

app.on('ready', () => {
  createWindow()
})
