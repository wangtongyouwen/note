const { BrowserWindow, Menu } = require('electron')

const template = [
  {
    label: '文件12312',
    submenu: [
      {
        label: '新建窗口',
        click () {
          new BrowserWindow({
            width: 500,
            height: 500
          })
        }
      }
    ]
  },
  {
    label: '关于我们'
  }
]

const menu = Menu.buildFromTemplate(template)

Menu.setApplicationMenu(menu)