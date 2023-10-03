
import { MatTableModule } from '@angular/material/table';

//Módulos
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, NgIf } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; // Importa el módulo de spinner de carga
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { NgChartsModule } from 'ng2-charts';


//Componentes
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrandsComponent } from './brands/brands.component';
import { CustomersComponent } from './customers/customers.component';
import { CategoriesComponent } from './almacen/categories/categories.component';
import { ProductsComponent } from './almacen/products/products.component';
import { DetailsSalesComponent } from './ventas/details-sales/details-sales.component';
import { PosComponent } from './ventas/pos/pos.component';
import { ConfigComponent } from './config/config.component';
import { UsersComponent } from './admin/users/users.component';
import { RolesComponent } from './admin/roles/roles.component';
import { BrandFormComponent } from './brands/brand-form.component';
import { MatSortModule } from '@angular/material/sort';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerFormComponent } from './customers/customer-form.component';
import { CategoryFormComponent } from './almacen/categories/category-form.component';
import { ProductFormComponent } from './almacen/products/product-form.component';
import { ProvidersComponent } from './providers/providers.component';
import { ProviderFormComponent } from './providers/provider-form.component';
import { AboutComponent } from './about/about.component';
import { ShoppingComponent } from './shopping/shopping.component';
import { InventoryComponent } from './almacen/inventory/inventory.component';

@NgModule({
  declarations: [
    DashboardComponent,
    BrandsComponent,
    CustomersComponent,
    ProductsComponent,
    DetailsSalesComponent,
    PosComponent,
    ConfigComponent,
    UsersComponent,
    RolesComponent,
    BrandFormComponent,
    CustomerFormComponent,
    CategoriesComponent,
    CategoryFormComponent,
    ProductFormComponent,
    ProvidersComponent,
    ProviderFormComponent,
    AboutComponent,
    ShoppingComponent,
    InventoryComponent,

  ],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatPaginatorModule,
    DatePipe,
    HttpClientModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NgChartsModule
  ],
  exports: [DashboardComponent, BrandsComponent, CustomersComponent],
})
export class PagesModule {}
