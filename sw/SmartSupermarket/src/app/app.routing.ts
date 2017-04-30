import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicialComponent, ProdutosComponent, ProdutosDetalheComponent,
 ComprasComponent, ComprasDetalheComponent, PaginaNaoEncontradaComponent,
 LogsComponent, TagsComponent, TagsDetalheComponent } from './pages';

const APP_ROUTES: Routes = [
    { path: 'inicial', component: InicialComponent },
    { path: 'produtos', component: ProdutosComponent },
    { path: 'produtos-detalhe/:id', component: ProdutosDetalheComponent },
    { path: 'compras', component: ComprasComponent },
    { path: 'compras-detalhe', component: ComprasDetalheComponent },
    { path: 'compras-detalhe/:id', component: ComprasDetalheComponent },
    { path: 'naoEncontrado', component: PaginaNaoEncontradaComponent },
    { path: 'logs', component: LogsComponent },
    { path: 'tags', component: TagsComponent },
    { path: 'tags-detalhe', component: TagsDetalheComponent },
    { path: 'tags-detalhe/:uuid', component: TagsDetalheComponent },
    { path: '', component: InicialComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);
