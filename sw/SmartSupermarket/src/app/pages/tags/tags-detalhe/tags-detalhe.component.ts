import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { IndexedDbService } from '../../../services/indexed-db.service';
import { MdSnackBar } from '@angular/material';
import { SerialPortService } from '../../../services/serialport.service';

@Component({
  selector: 'page-tags-detalhe',
  templateUrl: 'tags-detalhe.component.html',
  styleUrls: ['./tags-detalhe.component.scss']
})
export class TagsDetalheComponent implements OnInit {
  tituloOperacao: string = 'Adicionar';
  uuid;
  prod_id;

  constructor(public route: ActivatedRoute, public router: Router,
    public indexedDb: IndexedDbService, public snackbar: MdSnackBar,
    public serialPort: SerialPortService) {
    this.route.params.subscribe(
      (params: any) => {
        this.uuid = params['uuid'];
        if (this.uuid) {
          this.indexedDb.getByKey('tags', this.uuid).then((tag)=>{
            if (tag){
              this.uuid = tag.uuid;
              this.prod_id = tag.prod_id;
            }
            this.tituloOperacao = 'Editar';
          });
        }
      }
    );
  }

  ngOnInit() {

  }

  salvarTag() {
    let tagObj = { uuid:this.uuid, prod_id:+this.prod_id };
    if (this.uuid) tagObj['uuid'] = this.uuid;
    this.indexedDb.update('tags', tagObj).then(() => {
        this.snackbar.open('Tag salva com sucesso!', 'OK', {
          duration: 3000
        });
        this.router.navigate(['/tags']);
    }, (error) => {
        console.log(error);
    });
  }

}
