import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'page-compras',
  templateUrl: 'compras.component.html',
  styleUrls: ['./compras.component.scss']
})
export class ComprasComponent implements OnInit {

  constructor(public route: ActivatedRoute, public router: Router) {
  }

  ngOnInit() {

  }

}
