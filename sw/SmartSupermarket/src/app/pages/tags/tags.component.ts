import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IndexedDbService } from '../../services/indexed-db.service';
import { MdSnackBar } from '@angular/material';

@Component({
  selector: 'page-tags',
  templateUrl: 'tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {
  tags: [{uuid,prod_id}];

  constructor(public route: ActivatedRoute, public router: Router,
    public indexedDb: IndexedDbService, public snackbar: MdSnackBar,) {

    this.popularTags();
  }

  ngOnInit() {
      this.getAllTags();
  }

  //POPULA TEMPORARIO
  popularTags() {
    let tagsObj = [
      { uuid:'AABBCCDD', prod_id: 1 },
      { uuid:'10000000', prod_id: 2 },
      { uuid:'AB02D1A3', prod_id: 3 },
      { uuid:'6AB95D68', prod_id: 3 },
    ];
    for (let tag of tagsObj) {
      this.indexedDb.update('tags', tag).then(() => {
          console.log('Tag inserida com sucesso!');
      }, (error) => {
          //console.log(error);
      });
    }
  }

  getAllTags() {
    this.indexedDb.getAll('tags').then((tags) => {
      this.tags = tags;
    }, (error) => {
        console.log(error);
    });
  }

  excluirTag(uuid) {
    this.indexedDb.delete('tags', uuid).then(() => {
        this.snackbar.open('Tag excluido com sucesso!', 'OK', {
          duration: 3000
        });
        this.router.navigate(['/tags']);
        this.getAllTags();
    }, (error) => {
        console.log(error);
    });
  }

  abrirTag(uuid) {
    this.router.navigate(['/tags-detalhe', uuid]);
  }

}
