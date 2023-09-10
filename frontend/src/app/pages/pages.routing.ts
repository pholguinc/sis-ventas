//Módulos

import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrandsComponent } from './brands/brands.component';
import { CustomersComponent } from './customers/customers.component';
import { BrandFormComponent } from './brands/brand-form.component';
import { CustomerFormComponent } from './customers/customer-form.component';
import { CategoriesComponent } from './almacen/categories/categories.component';
import { CategoryFormComponent } from './almacen/categories/category-form.component';
import { ProductsComponent } from './almacen/products/products.component';
import { ProductFormComponent } from './almacen/products/product-form.component';

//Componentes
const routes: Routes = [
  {
    path: 'admin',
    component: PagesComponent,
    children: [
      { path: '', component: DashboardComponent },
      //Almacén
      { path: 'almacen/categorias', component: CategoriesComponent },
      { path: 'almacen/categoria/:id', component: CategoryFormComponent },
      { path: 'almacen/productos', component: ProductsComponent },
      { path: 'almacen/producto/:id', component: ProductFormComponent },

      //Mantenimientos
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
