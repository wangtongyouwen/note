const { BrowserWindow, Menu } = require('electron')
// 定义菜单模板
const template = [
  {
    label: '文件',
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

// 编译模板
const menu = Menu.buildFromTemplate(template)
// 设置菜单
Menu.setApplicationMenu(menu)