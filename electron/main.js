const { app, BrowserWindow } = require('electron/main')
const path = require('node:path')

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

    win.loadURL("http://localhost:5173/")
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