import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IndexedDbService } from '../../services/indexed-db.service';
import { MdSnackBar } from '@angular/material';

@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.component.html',
  styleUrls: ['./produtos.component.scss']
})
export class ProdutosComponent implements OnInit {
  produtos: [{nome,preco}];

  constructor(public route: ActivatedRoute, public router: Router,
    public indexedDb: IndexedDbService, public snackbar: MdSnackBar,) {

    this.popularProdutos();
  }

  ngOnInit() {
      this.getAllProdutos();
  }

  //POPULA TEMPORARIO
  popularProdutos() {
    let produtosObj = [
      { id: 1, nome:'Amaciante Em Po', preco:'32.24' },
      { id: 2, nome:'Refrigerante de Cola', preco:'24' },
      { id: 3, nome:'Salgadinho Cebolitao', preco:'10.51' },
      { id: 4, nome:'Escova Dental Maciex', preco:'11' },
    ];
    for (let produto of produtosObj) {
      this.indexedDb.update('produtos', produto).then(() => {
          console.log('Produto inserido com sucesso!');
      }, (error) => {
          //console.log(error);
      });
    }
  }

  getAllProdutos() {
    this.indexedDb.getAll('produtos').then((produtos) => {
      this.produtos = produtos;
    }, (error) => {
        console.log(error);
    });
  }

  excluirProduto(id) {
    this.indexedDb.delete('produtos', id).then(() => {
        this.snackbar.open('Produto excluido com sucesso!', 'OK', {
          duration: 3000
        });
        this.router.navigate(['/produtos']);
        this.getAllProdutos();
    }, (error) => {
        console.log(error);
    });
  }

  abrirProduto(id) {
    this.router.navigate(['/produtos-detalhe', id]);
  }

}
