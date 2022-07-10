import { Component } from '@angular/core';
import { IpcRenderer, ipcRenderer } from 'electron';

const SAVE_TEXT = 'this is a test';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'angular2electron';
  public error = '';
  private ipc: IpcRenderer;

  public constructor() {
    this.ipc = ipcRenderer;
  }

  /**
   * onSaveByBrowser
   */
  public async onSaveByBrowser() {
    try {
      const fileHandle: FileSystemFileHandle = await showSaveFilePicker();
      const writableFile: FileSystemWritableFileStream = await fileHandle.createWritable();
      await writableFile.write(SAVE_TEXT);
      await writableFile.close();
    } catch (error) {
      this.error = error as string;
    }
  }

  /**
   * onSaveByElectron
   */
  public onSaveByElectron() {
    this.ipc.invoke('onSave', SAVE_TEXT);
  }
}
