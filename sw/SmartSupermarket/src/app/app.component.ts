import { Component } from '@angular/core';
import { ipcRenderer } from 'electron';
import * as childProcess from 'child_process';
import { SerialPortService } from './services/serialport.service';
import { IndexedDbService } from './services/indexed-db.service';
import { IpcHandlerService } from './services/ipc-handler.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = `App works !`;

  navLinks = [
    { label: 'INÍCIO', path: '/inicial', icon: 'home' },
    { label: 'PRODUTOS', path: '/produtos', icon: 'shopping_basket' },
    { label: 'TAGS', path: '/tags', icon: 'local_offer' },
    { label: 'COMPRAS', path: '/compras', icon: 'shopping_cart' },
    { label: 'LOGS', path: '/logs', icon: 'find_in_page' }
  ];

  constructor(public serialPortService: SerialPortService,
    public indexedDb: IndexedDbService, ipcHanderService: IpcHandlerService) {

    // Check if electron is correctly injected (see externals in webpack.config.js)
    console.log('c', ipcRenderer);
    // Check if nodeJs childProcess is correctly injected (see externals in webpack.config.js)
    console.log('c', childProcess);

  }
}
