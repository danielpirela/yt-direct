const { app, BrowserWindow, ipcMain } = require('electron')
const { execFile } = require('child_process')
const { promisify } = require('util')
const path = require('path')
const fs = require('fs')

const execFileAsync = promisify(execFile)

let mainWindow

function getYtDlpPath() {
  // Bundled binary path
  const ext = process.platform === 'win32' ? '.exe' : ''
  const bundled = path.join(process.resourcesPath, 'yt-dlp' + ext)
  if (fs.existsSync(bundled)) return bundled

  // Dev path
  const dev = path.join(__dirname, '..', 'bin', 'yt-dlp' + ext)
  if (fs.existsSync(dev)) return dev

  // System
  return 'yt-dlp'
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 600,
    height: 550,
    resizable: false,
    title: 'YT Direct URL',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  mainWindow.setMenuBarVisibility(false)
  mainWindow.loadFile('renderer.html')
}

// Handle YouTube extraction
ipcMain.handle('extract', async (_event, url) => {
  const bin = getYtDlpPath()

  const { stdout } = await execFileAsync(bin, [
    '-f', 'best',
    '--no-warnings',
    '--dump-json',
    url,
  ], { timeout: 45000, maxBuffer: 5 * 1024 * 1024 })

  const info = JSON.parse(stdout.trim())
  return {
    url: info.url,
    title: info.title,
    quality: info.format_note ?? `${info.height ?? '?'}p`,
    duration: info.duration_string ?? `${info.duration ?? 0}`,
    thumbnail: info.thumbnail ?? null,
  }
})

app.whenReady().then(createWindow)
app.on('window-all-closed', () => app.quit())
