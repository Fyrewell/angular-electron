import { Component } from '@angular/core';
import { ipcRenderer } from 'electron';
import * as childProcess from 'child_process';

import * as SerialPort from 'serialport';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = `App works !`;
  arduinoComName = '';
  arduinoPort;

  navLinks = [
    { label: 'INICIO', path: '/inicial', icon: '' },
    { label: 'PRODUTOS', path: '/produtos', icon: 'shopping_cart' },
    { label: 'COMPRAS', path: '/compras', icon: 'shopping_basket' }
  ];

  constructor() {
/*
[{
		"comName" : "COM1",
		"manufacturer" : "(Tipos de porta padr�o)",
		"pnpId" : "ACPI\\PNP0501\\1"
	}, {
		"comName" : "COM19",
		"manufacturer" : "http://www.intel.com",
		"pnpId" : "USB\\VID_8087&PID_0AB6\\AE6774SQ60600P5",
		"locationId" : "Port_#0003.Hub_#0004",
		"vendorId" : "8087",
		"productId" : "0AB6"
	}
]
*/
    SerialPort.list((err, ports) => {
      console.log('ports', ports);
      for (let port of ports){
        if (port.vendorId == '8087' && port.productId == '0AB6'){
          this.arduinoComName = port.comName;
          this.arduinoPort = new SerialPort(this.arduinoComName, { autoOpen: false, baudRate: 9600 }, () => {});
          this.arduinoPort.on('open', () => {
            this.arduinoPort.write('teste de envio arduino');
          });
          this.arduinoPort.on('data', (data) => {
            console.log('Data: ' + data);
          });
          this.arduinoPort.open(this.arduinoComName);
        }
      }
    });
    // Check if electron is correctly injected (see externals in webpack.config.js)
    console.log('c', ipcRenderer);
    // Check if nodeJs childProcess is correctly injected (see externals in webpack.config.js)
    console.log('c', childProcess);

  }
}
