
import { Injectable } from '@angular/core';
import { ipcRenderer } from 'electron';
import { Observable } from 'rxjs/Observable';

import { IndexedDbService } from './indexed-db.service';

@Injectable()
export class IpcHandlerService {
  req: any;

  constructor(public indexedDb: IndexedDbService) {
    let self = this;
    ipcRenderer.on('request', function (req, port) {
      console.log(req, port);
      self.req = req;
      self.trataDadosRecebidos(port['url']);
    });
  }

  enviar(dados: any) {
    this.gravarLog(new Date().toLocaleString(), ''+dados, 1);
    this.req.sender.send('response', dados);
  }


  trataDadosRecebidos(dados) {
    if (dados.substring(1,4)=='tag'){
      this.gravarLog(new Date().toLocaleString(), ''+dados, 0);
      var uuid = dados.substring(5);
      this.indexedDb.getByKey('tags', uuid).then((tag)=>{
        if (tag){
          let prod_id = tag.prod_id;
          this.indexedDb.getByKey('produtos', prod_id).then((produto)=>{
            if (produto) {
              this.enviar('0|'+produto.id+'|'+produto.nome+'|R$'+parseFloat(produto.preco).toFixed(2)+'#');
            }else{
              this.enviar('2|'+uuid+'|tag nao encontrada#');
            }
          });
        }else{
          this.enviar('2|'+uuid+'|tag nao encontrada#');
        }
      });
    }
  }

  gravarLog(datetime:string, dados:string, direcao:number) {
    let logServer = {quando:datetime, dados:dados, direcao:direcao};
    this.indexedDb.update('logServer', logServer).then(() => {
        console.log('Log inserido com sucesso!');
    }, (error) => {
        //console.log(error);
    });
  }

}
