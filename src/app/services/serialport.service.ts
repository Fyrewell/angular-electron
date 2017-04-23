
import { Injectable } from '@angular/core';

import * as SerialPort from 'serialport';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class SerialPortService {
  arduinoComName;
  arduinoPort;
  public carregando:boolean = false;
  carregandoObs;

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
          this.arduinoPort = new SerialPort(this.arduinoComName, {
            parser: SerialPort.parsers.readline('#'),
            baudRate: 9600 });

          this.arduinoPort.on('open', () => {
              window.setTimeout(this.enviarTeste(), 4000);
          });

          this.arduinoPort.on('data', (data) => {
            this.trataDadosRecebidos(data);
          });
        }
      }
    });
  }

  enviar(data: any) {
    this.carregandoObs.next(true);
    this.arduinoPort.write(data, (err) => {
      console.log(err);
      this.carregandoObs.next(false);
    });
  }

  carregandoTopic() {
    return Observable.create((observer) => {
      this.carregandoObs = observer;
      this.carregandoObs.next(false);
    });
  }

  trataDadosRecebidos(data) {
    //log

    console.log(data);
    //console.log(JSON.parse(''+data));
  }

  enviarTeste() {
    this.enviar('hello wordl#');
  }
}
