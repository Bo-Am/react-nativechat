const {app, BrowserWindow, ipcMain, Notification} = require('electron');
const path = require('path');
const isDev = !app.isPackaged;

// параметры приложения - размеры окна
function createWindow(){
  const win = new BrowserWindow({
    width:1366,
    height:768,
    backgroundColor:"white",
    webPreferences:{
      nodeIntegration: false,
      // will sanitize JS code
      worldSafeExecuteJavaScript: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },

  })

  win.loadFile('index.html')
  isDev && win.webContents.openDevTools()
}
// автоматическая перезагрузка приложения
if(isDev){
  require('electron-reload')(__dirname, {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
  })
}

app.whenReady().then(createWindow);

ipcMain.on('notify', (_, message)=>{
  new Notification({title:'Notification', body: message}).show()
})


ipcMain.on('app-quit', ()=>{
  app.quit()
})


// Выйти, когда все окна закрыты
app.on('window-all-closed',()=>{
  if(process.platform !== 'darwin'){
    app.quit();
  }
})


app.on('activate', ()=>{
  if(BrowserWindow.getAllWindows().length === 0){
    createWindow();
  }
})

// Chromium -> web engine for rendering apps
// Electron - это платформа с открытым исходным кодом, которая позволяет разработчику создавать псевдо-нативные приложения, используя знакомые веб-технологии, такие как JavaScript, HTML и CSS, с исполняющей средой Node. js в качестве серверной части и Chromium для клиентской части.

// Webpack -> is a module builder, main purpose is to bundle JS files for usage in the browser
// Babel -> is JS compiler
