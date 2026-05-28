const { app, BrowserWindow, shell } = require("electron")
const path = require("path")
const url = require("url")

const isDev = !app.isPackaged

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    titleBarStyle: "hiddenInset",
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.cjs"),
    },
  })

  if (isDev) {
    win.loadURL("http://localhost:3000")
    win.webContents.openDevTools()
  } else {
    win.loadURL(
      url.format({
        pathname: path.join(__dirname, "../out/index.html"),
        protocol: "file:",
        slashes: true,
      })
    )
  }

  win.webContents.setWindowOpenHandler(({ url: href }) => {
    shell.openExternal(href)
    return { action: "deny" }
  })
}

app.whenReady().then(() => {
  createWindow()

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit()
})
