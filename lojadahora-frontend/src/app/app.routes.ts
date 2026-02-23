import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'clientes', pathMatch: 'full' },
    {
        path: 'clientes',
        loadComponent: () => import('./pages/clientes/clientes.component').then(m => m.ClientesComponent)
    },
    {
        path: 'produtos',
        loadComponent: () => import('./pages/produtos/produtos.component').then(m => m.ProdutosComponent)
    }
];
