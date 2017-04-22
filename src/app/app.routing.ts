import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicialComponent } from './pages/inicial/inicial.component';
import { PaginaNaoEncontradaComponent } from './pages/pagina-nao-encontrada/pagina-nao-encontrada.component';

const APP_ROUTES: Routes = [
    { path: 'inicial', component: InicialComponent },
    { path: 'naoEncontrado', component: PaginaNaoEncontradaComponent },
    { path: '', component: InicialComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);
