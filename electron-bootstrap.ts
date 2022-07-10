import * as path from 'path';
import * as fs from 'fs';
import { app, BrowserWindow, dialog, ipcMain } from 'electron';

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  });

  win
    .loadFile(path.join(__dirname, "./dist/angular2electron/index.html"))
    .then(() => {
      win.show();
    });
};

app.whenReady().then(() => {
  createWindow();
  registerAngularEvent();
});

const registerAngularEvent = () => {
  ipcMain.handle("onSave", async (_e, text) => {
    const response = await dialog.showSaveDialog({});
    if (!response.filePath) {
      console.error('get file path wrong');
      return;
    }
    fs.writeFile(response.filePath, text, err => console.error(err));
  });
};
