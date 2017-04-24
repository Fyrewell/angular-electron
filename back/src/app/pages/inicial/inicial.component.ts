import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'page-inicial',
  templateUrl: 'inicial.component.html',
  styleUrls: ['./inicial.component.scss']
})
export class InicialComponent implements OnInit {

  constructor(public route: ActivatedRoute, public router: Router) {
  }

  ngOnInit() {

  }

  abrirNaoEncontrada() {
    this.router.navigate(['/naoEncontrado']);
  }

}
