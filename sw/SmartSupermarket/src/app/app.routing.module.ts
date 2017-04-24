import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicialComponent, ProdutosComponent, ProdutosDetalheComponent,
 ComprasComponent, ComprasDetalheComponent, PaginaNaoEncontradaComponent } from './pages';

const appRoutes: Routes = [
    { path: '', redirectTo: '/inicial', pathMatch: 'full' },
    { path: 'inicial', component: InicialComponent },
    { path: 'produtos', component: ProdutosComponent },
    { path: 'produtos-detalhe', component: ProdutosDetalheComponent },
    { path: 'produtos-detalhe/:id', component: ProdutosDetalheComponent },
    { path: 'compras', component: ComprasComponent },
    { path: 'compras-detalhe', component: ComprasDetalheComponent },
    { path: 'compras-detalhe/:id', component: ComprasDetalheComponent },
    { path: '**', component: PaginaNaoEncontradaComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule {}
