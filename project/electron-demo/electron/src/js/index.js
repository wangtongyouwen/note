const { remote: { BrowserWindow, dialog }, shell, ipcRenderer } = require('electron')
const fs = require('fs')

// 点击新建窗口 创建新窗口
const newWindow = document.querySelector('.new-window')
newWindow.onclick = function () {
  new BrowserWindow({
    width: 300,
    height: 300
  })
}

// 点击a跳转
const allA = document.querySelectorAll('a')

allA.forEach(item => {
  item.onclick = function (e) {
    e.preventDefault()
    shell.openExternal(item.href)
  }
})

// 点击打开文件
const textareaEl = document.querySelector('textarea')
const openFile = function () {
  const res = dialog.showOpenDialogSync({
    title: '读取文件',
    buttonLabel: '读取',
    filters: [
      { name: 'Custom File Type', extensions: ['js'] },
    ]
  })

  const filesContent = fs.readFileSync(res[0]).toString()

  textareaEl.value = filesContent
}

// 保存文件
const saveFile = function () {
  const res = dialog.showSaveDialogSync({
    title: '保存文件',
    buttonLabel: '保存文件',
    filters: [
      { name: 'index', extensions: ['js'] },
    ]
  })
  console.log(res)
  console.log(textareaEl.value)
  fs.writeFileSync(res, textareaEl.value)
}

// 点击窗口最大化
let windowSize = 'unmax-window'
const maxWindow = function () {
  windowSize = windowSize === 'unmax-window' ? 'max-window' : 'unmax-window'
  ipcRenderer.send('max-window', windowSize)
}