import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.component.html',
  styleUrls: ['./produtos.component.scss']
})
export class ProdutosComponent implements OnInit {

  constructor(public route: ActivatedRoute, public router: Router) {
  }

  ngOnInit() {

  }

}
