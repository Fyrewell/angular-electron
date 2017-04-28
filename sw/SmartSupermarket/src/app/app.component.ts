import { Component } from '@angular/core';
import { ipcRenderer } from 'electron';
import * as childProcess from 'child_process';

import { SerialPortService } from './services/serialport.service';

import { IndexedDbService } from './services/indexed-db.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = `App works !`;
  carregando = false;
  carregandoObs;

  navLinks = [
    { label: 'INICIO', path: '/inicial', icon: '' },
    { label: 'PRODUTOS', path: '/produtos', icon: 'shopping_basket' },
    { label: 'COMPRAS', path: '/compras', icon: 'shopping_cart' }
  ];

  constructor(public serialPortService: SerialPortService,
    public indexedDb: IndexedDbService) {
    this.carregandoObs = serialPortService.carregandoTopic();
    this.carregandoObs.subscribe((data)=>{
      console.log('yae',data);
      this.carregando = data;
    });
    // Check if electron is correctly injected (see externals in webpack.config.js)
    console.log('c', ipcRenderer);
    // Check if nodeJs childProcess is correctly injected (see externals in webpack.config.js)
    console.log('c', childProcess);

    ipcRenderer.on('request', function (req, port) {
        console.log(req, port);
        req.sender.send('response', 'FUCK YEAH#')
    });

  }
}
