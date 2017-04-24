import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { IndexedDbService } from '../../../services/indexed-db.service';

@Component({
  selector: 'page-compras-detalhe',
  templateUrl: 'compras-detalhe.component.html',
  styleUrls: ['./compras-detalhe.component.scss']
})
export class ComprasDetalheComponent implements OnInit {
  idCompra;
  itensCompra = [];

  constructor(public route: ActivatedRoute, public router: Router,
    public indexedDb: IndexedDbService) {

    //temporario
    this.popularItensCompra();
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: any) => {
        console.log(params);
        this.idCompra = params['id'];
        if (this.idCompra) {
          this.getItensCompra(this.idCompra);
        }
      }
    );
  }

  //POPULA TEMPORARIO
  popularItensCompra() {
    let comprasObj = [
      { id:1, id_compra:1, id_produto:1, preco:'32' },
      { id:2, id_compra:1, id_produto:2, preco:'24' },
      { id:3, id_compra:1, id_produto:3, preco:'10' },
      { id:4, id_compra:2, id_produto:4, preco:'11' }
    ];
    for (let compra of comprasObj) {
      this.indexedDb.update('itemCompra', compra).then(() => {
          console.log('ItensCompra inserido com sucesso!');
      }, (error) => {
          //console.log(error);
      });
    }
  }

  getItensCompra(id) {
    this.indexedDb.getAll('itemCompra').then((itensCompra) => {
      this.itensCompra = [];
      for (let item of itensCompra) {
        if (item.id_compra==id) {
          this.indexedDb.getByKey('produtos', item.id_produto).then((produto)=>{
            item['produto'] = produto.nome;
            this.itensCompra.push(item);
          });
        }
      }
    }, (error) => {
        console.log(error);
    });
  }

}
