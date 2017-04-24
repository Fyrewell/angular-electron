
import { Injectable } from '@angular/core';
import * as SerialPort from 'serialport';
import { Observable } from 'rxjs/Observable';

import { IndexedDbService } from './indexed-db.service';

@Injectable()
export class SerialPortService {
  arduinoComName;
  arduinoPort;
  public carregando:boolean = false;
  carregandoObs;

  constructor(public indexedDb: IndexedDbService) {
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
        if ((port.vendorId == '8087' && port.productId == '0AB6')  // uno 101
         || (port.vendorId == '2341' && port.productId == '003D')) // due
         {
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

  carregandoTopic() {
    return Observable.create((observer) => {
      this.carregandoObs = observer;
      this.carregandoObs.next(false);
    });
  }

  enviar(dados: any) {
    this.carregandoObs.next(true);
    this.arduinoPort.write(dados, (err) => {
      console.log(err);
      this.gravarLog(new Date().toLocaleString(), ''+dados, 1);
      this.carregandoObs.next(false);
    });
  }


  trataDadosRecebidos(dados) {
    //log

    console.log(dados);

    this.gravarLog(new Date().toLocaleString(), ''+dados, 0);
    //console.log(JSON.parse(''+data));
  }

  enviarTeste() {
    this.enviar('hello wordl#');
  }

  gravarLog(datetime:string, dados:string, direcao:number) {
    let logSerial = {quando:datetime, dados:dados, direcao:direcao};
    this.indexedDb.update('logSerial', logSerial).then(() => {
        console.log('Log inserido com sucesso!');
    }, (error) => {
        //console.log(error);
    });
  }

}
