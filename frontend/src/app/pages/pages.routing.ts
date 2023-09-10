//Módulos

import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrandsComponent } from './brands/brands.component';
import { CustomersComponent } from './customers/customers.component';
import { BrandFormComponent } from './brands/brand-form.component';
import { CustomerFormComponent } from './customers/customer-form.component';

//Componentes
const routes: Routes = [
  {
    path: 'admin',
    component: PagesComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'mantenimientos/marcas', component: BrandsComponent },
      { path: 'mantenimientos/marca/:id', component: BrandFormComponent },
      { path: 'mantenimientos/clientes', component: CustomersComponent },
      { path: 'mantenimientos/cliente/:id', component: CustomerFormComponent },
    ],
  },
];

@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PagesRoutingModule{}
