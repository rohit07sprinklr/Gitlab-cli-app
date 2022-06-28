const {app, BrowserWindow} = require('electron');
const path = require('path');
const server = require('./build/api');
function createWindow(){
    const { screen } = require('electron');
    const primaryDisplay = screen.getPrimaryDisplay()
    const { width, height } = primaryDisplay.workAreaSize
    const win = new BrowserWindow({
        width,
        height,
        webPreferences: {
            nodeIntegration: true
        }
    });
    win.maximize();
    win.loadURL('http://localhost:4000')  
}

app.whenReady().then(()=>{
    createWindow();
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
      })
}
);

app.on('activate',()=>{
    if(BrowserWindow.getAllWindows().length === 0){
        createWindow();
    }
})