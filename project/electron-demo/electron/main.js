const { app, BrowserWindow, globalShortcut, ipcMain } = require('electron')

// 热加载
const reloader = require('electron-reloader')
reloader(module)

console.log(module)
// 监听初始化完成得到生命周期
app.on('ready', () => {
  const mainWindow = new BrowserWindow({
    width: 700,
    height: 700,
    frame: false,
    webPreferences: {
      // 开启渲染进程使用node
      nodeIntegration: true,
      // 开启渲染进程的remote模块
      enableRemoteModule: true
    }
  })

  mainWindow.loadFile('./src/index.html')

  mainWindow.webContents.openDevTools()

  require('./menu.js')

  globalShortcut.register('CommandOrControl+M', () => {
    mainWindow.maximize()
  })

  globalShortcut.register('CommandOrControl+T', () => {
    mainWindow.unmaximize()
  })

  globalShortcut.register('CommandOrControl+H', () => {
    mainWindow.close()
  })

  // 定义自定义事件
  ipcMain.on('max-window', (event, arg) => {
    if (arg === 'max-window') {
      return mainWindow.maximize()
    }
    mainWindow.unmaximize()
  })
})