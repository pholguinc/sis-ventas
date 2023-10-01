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
import { ProvidersComponent } from './providers/providers.component';
import { ProviderFormComponent } from './providers/provider-form.component';
import { AboutComponent } from './about/about.component';
import { ShoppingComponent } from './shopping/shopping.component';
import { AuthGuard } from '../auth/guards/auth.guard';

//Componentes
const routes: Routes = [
  {
    path: 'admin',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent, data: {title : 'Dashboard', subtitle: 'admin'}},
      { path: 'almacen/categorias', component: CategoriesComponent, data: {title: 'Categoría', subtitle: 'almacen'}},
      { path: 'almacen/categoria/:id', component: CategoryFormComponent, data: {title: 'Categoría', subtitle: 'almacen'}},
      { path: 'almacen/productos', component: ProductsComponent,  data: {title: 'Productos', subtitle: 'almacen'}},
      { path: 'almacen/producto/:id', component: ProductFormComponent,  data: {title: 'Productos', subtitle: 'almacen'}},

      //Mantenimientos
      { path: 'mantenimientos/marcas', component: BrandsComponent, data: {title: 'Marcas', subtitle: 'mantenimiento'}},
      { path: 'mantenimientos/marca/:id', component: BrandFormComponent, data: {title: 'Marcas', subtitle: 'mantenimiento'}},
      { path: 'mantenimientos/clientes', component: CustomersComponent, data: {title: 'Clientes', subtitle: 'mantenimiento'}},
      { path: 'mantenimientos/cliente/:id', component: CustomerFormComponent, data: {title: 'Clientes', subtitle: 'mantenimiento'}},
      { path: 'mantenimientos/proveedores', component: ProvidersComponent, data: {title: 'Proveedores', subtitle: 'mantenimiento'}},
      { path: 'mantenimientos/proveedor/:id', component: ProviderFormComponent, data: {title: 'Proveedores', subtitle: 'mantenimiento'}},

      //Compras

      { path: 'pos/compras', component: ShoppingComponent, data: {title: 'Compras', subtitle: 'pos'}},

      //Acerca de

      { path: 'acerca-de', component: AboutComponent, data: {title: 'Acerca de', subtitle: 'admin'}},
    ],
  },
];

@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PagesRoutingModule{}
