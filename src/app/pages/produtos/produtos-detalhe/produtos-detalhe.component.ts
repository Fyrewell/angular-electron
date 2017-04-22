import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'page-produtos-detalhe',
  templateUrl: 'produtos-detalhe.component.html',
  styleUrls: ['./produtos-detalhe.component.scss']
})
export class ProdutosDetalheComponent implements OnInit {
  tituloOperacao: string = 'Adicionar';

  constructor(public route: ActivatedRoute, public router: Router) {
  }

  ngOnInit() {

  }

}
