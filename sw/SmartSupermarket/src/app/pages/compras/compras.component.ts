import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { IndexedDbService } from '../../services/indexed-db.service';
import { MdSnackBar } from '@angular/material';

@Component({
  selector: 'page-compras',
  templateUrl: 'compras.component.html',
  styleUrls: ['./compras.component.scss']
})
export class ComprasComponent implements OnInit {
  compras: [{id:number,data:string,preco:any}];

  constructor(public route: ActivatedRoute, public router: Router,
    public indexedDb: IndexedDbService, public snackbar: MdSnackBar) {

    //temporario
    this.popularCompras();
  }

  ngOnInit() {
    this.getAllCompras();
  }

  //POPULA (TEMPORARIO)
  popularCompras() {
    let comprasObj = [
      { id:1, data:'23/04/2014', preco:'66.00' },
      { id:2, data:'22/04/2014', preco:'11.00' }
    ];
    for (let compra of comprasObj) {
      this.indexedDb.update('compras', compra).then(() => {
          console.log('Compra inserida com sucesso!');
          this.router.navigate(['/compras']);
      }, (error) => {
          //console.log(error);
      });
    }
  }

  getAllCompras() {
    this.indexedDb.getAll('compras',null,{indexName:'id',order:'desc'}).then((compras) => {
      console.log(compras);
      this.compras = compras;
    }, (error) => {
        console.log(error);
    });
  }

  excluirCompra(id) {
    this.indexedDb.delete('compras', id).then(() => {
        this.snackbar.open('Compra excluida com sucesso!', 'OK', {
          duration: 3000
        });
        this.router.navigate(['/compras']);
        this.getAllCompras();
    }, (error) => {
        console.log(error);
    });
  }

  abrirCompra(id) {
    this.router.navigate(['/compras-detalhe', id]);
  }

}
