import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IndexedDbService } from '../../services/indexed-db.service';

@Component({
  selector: 'page-logs',
  templateUrl: 'logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {
  logSerial: [{quando,direcao,dados}];
  logServer: [{quando,direcao,dados}];

  constructor(public route: ActivatedRoute, public router: Router,
    public indexedDb: IndexedDbService) {

  }

  ngOnInit() {
    this.getLogSerial();
    this.getLogServer();
  }

  getLogSerial() {
    this.indexedDb.getAll('logSerial',null,{indexName:'id',order:'desc'}).then((log) => {
      this.logSerial = log;
      console.log(log);
    }, (error) => {
        console.log(error);
    });
  }

  getLogServer() {
    this.indexedDb.getAll('logServer',null,{indexName:'id',order:'desc'}).then((log) => {
      this.logServer = log;
    }, (error) => {
        console.log(error);
    });
  }

}
