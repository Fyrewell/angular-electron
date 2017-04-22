import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicialComponent, ProdutosComponent, ProdutosDetalheComponent,
 ComprasComponent, ComprasDetalheComponent, PaginaNaoEncontradaComponent } from './pages';

const APP_ROUTES: Routes = [
    { path: 'inicial', component: InicialComponent },
    { path: 'produtos', component: ProdutosComponent },
    { path: 'produtos-detalhe', component: ProdutosDetalheComponent },
    { path: 'compras', component: ComprasComponent },
    { path: 'compras-detalhe', component: ComprasDetalheComponent },
    { path: 'naoEncontrado', component: PaginaNaoEncontradaComponent },
    { path: '', component: InicialComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);
