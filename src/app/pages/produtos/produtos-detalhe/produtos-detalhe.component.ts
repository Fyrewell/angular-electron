import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { IndexedDbService } from '../../../services/indexed-db.service';
import { MdSnackBar } from '@angular/material';
import { SerialPortService } from '../../../services/serialport.service';

@Component({
  selector: 'page-produtos-detalhe',
  templateUrl: 'produtos-detalhe.component.html',
  styleUrls: ['./produtos-detalhe.component.scss']
})
export class ProdutosDetalheComponent implements OnInit {
  tituloOperacao: string = 'Adicionar';
  nome;
  tag;
  preco;
  id;

  constructor(public route: ActivatedRoute, public router: Router,
    public indexedDb: IndexedDbService, public snackbar: MdSnackBar,
    public serialPort: SerialPortService) {
    this.route.params.subscribe(
      (params: any) => {
        this.id = params['id'];
        if (this.id) {
          this.indexedDb.getByKey('produtos', +this.id).then((produto)=>{
            if (produto){
              this.nome = produto.nome;
              this.tag = produto.tag;
              this.preco = produto.preco;
              this.serialPort.enviar('0'+this.nome+'|'+this.preco+'#');
            }
            this.tituloOperacao = 'Editar';
          });
        }
      }
    );
  }

  ngOnInit() {

  }

  salvarProduto() {
    let prodObj = { tag:this.tag, nome:this.nome, preco:this.preco };
    if (this.id) prodObj['id'] = +this.id;
    this.indexedDb.update('produtos', prodObj).then(() => {
        this.snackbar.open('Produto salvo com sucesso!', 'OK', {
          duration: 3000
        });
        this.router.navigate(['/produtos']);
    }, (error) => {
        console.log(error);
    });
  }

}
