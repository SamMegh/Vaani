const { app, BrowserWindow } = require('electron/main')
const path = require('node:path')
const isDev = require('electron-is-dev')
function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        backgroundColor: '#ffffff',
        autoHideMenuBar: true,
        titleBarStyle: 'hiddenInset', // ✅ removes the default dark title bar
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })
    if (isDev) {
        win.loadURL("http://localhost:5173/")
    } else{
        win.loadFile(path.join(__dirname,"builder/index.html"))
    }
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})