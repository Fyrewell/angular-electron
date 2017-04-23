import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app.routing.module';
import { InicialComponent, ProdutosComponent, ProdutosDetalheComponent,
ComprasComponent, ComprasDetalheComponent, PaginaNaoEncontradaComponent } from './pages';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule, MdSnackBar } from '@angular/material';

import { IndexedDbService } from './services/indexed-db.service';
import { IndexedDbFactory } from './services/indexed-db.factory';
import { SerialPortService } from './services/serialport.service';

@NgModule({
  declarations: [
    AppComponent,
    InicialComponent,
    ProdutosComponent,
    ProdutosDetalheComponent,
    ComprasComponent,
    ComprasDetalheComponent,
    PaginaNaoEncontradaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule.forRoot()
  ],
  providers: [
    {provide: IndexedDbService, useFactory: IndexedDbFactory},
    MdSnackBar,
    SerialPortService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
