import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'page-compras-detalhe',
  templateUrl: 'compras-detalhe.component.html',
  styleUrls: ['./compras-detalhe.component.scss']
})
export class ComprasDetalheComponent implements OnInit {

  constructor(public route: ActivatedRoute, public router: Router) {
  }

  ngOnInit() {

  }

}
