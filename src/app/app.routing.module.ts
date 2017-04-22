import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicialComponent } from './pages/inicial/inicial.component';
import { PaginaNaoEncontradaComponent } from './pages/pagina-nao-encontrada/pagina-nao-encontrada.component';

const appRoutes: Routes = [
    { path: '', redirectTo: '/inicial', pathMatch: 'full' },
    { path: 'inicial', component: InicialComponent },
    { path: '**', component: PaginaNaoEncontradaComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule {}
