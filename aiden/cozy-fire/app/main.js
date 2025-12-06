const { app, BrowserWindow } = require('electron');
const path = require('node:path');


function createWindow () {
  const win = new BrowserWindow({
   width: 1280,
  height: 720,
  frame: true,      // 윈도우 기본 타이틀바/프레임 활성화
  resizable: true,  // 크기 조절 가능
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    }
  });

  // 자동재생 정책 완화 (소리 없이 자동 재생 가능)
  app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required');

  win.loadFile(path.join(__dirname, 'index.html'));

  // ESC → 종료
  win.webContents.on('before-input-event', (event, input) => {
    if (input.key === 'Escape') app.quit();
  });
  win.setMenuBarVisibility(false);
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
