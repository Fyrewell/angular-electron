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
import { MdToolbarModule, MdTabsModule, MdButtonModule, MdListModule, MdInputModule } from '@angular/material';

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
    MdToolbarModule,
    MdTabsModule,
    MdButtonModule,
    MdListModule,
    MdInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
