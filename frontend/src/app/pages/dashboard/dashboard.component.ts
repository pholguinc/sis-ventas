import { Customer } from './../../models/customer.model';
import { CustomersService } from './../../services/customers.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand.model';
import { Category } from 'src/app/models/category.model';
import { User } from 'src/app/models/user.model';
import { BrandsService } from 'src/app/services/brands.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls:['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  brand: Brand[] = [];
  customer: Customer[] = [];
  user: User[] = [];
  category: Category[] = [];

  public totalBrands: number = 0;
  public totalCustomers: number = 0;
  public totalUsers: number = 0;
  public totalCategories: number = 0;

  constructor(
    private brandsService: BrandsService,
    private customersService: CustomersService,
    private UsersService: UsersService,
    private categoriesService: CategoriesService

    ){}


  ngOnInit(): void {
    this.brandsData();
    this.customersData();
    this.usersData();
    this.categoriesData();
  }


  brandsData(){
    this.brandsService.loadBrands()
    .subscribe({
      next: (res)=>{
        this.brand =res;
        this.totalBrands = this.brand.length;
      },
      error: (err)=>{
        console.warn(err.error.msg)
      }
    })

  }

  customersData(){
    this.customersService.loadCustomers()
    .subscribe({
      next: (res)=>{
        this.customer =res;
        this.totalCustomers = this.customer.length;
      },
      error: (err)=>{
        console.warn(err.error.msg)
      }
    })
  }

  usersData(){
    this.UsersService.loadUsers()
    .subscribe({
      next: (res)=>{
        this.user =res;
        this.totalUsers= this.user.length;
      },
      error: (err)=>{
        console.warn(err.error.msg)
      }
    })
  }

  categoriesData(){
    this.categoriesService.loadCategories()
    .subscribe({
      next: (res)=>{
        this.category=res;
        this.totalCategories= this.category.length;
      },
      error: (err)=>{
        console.warn(err.error.msg)
      }
    })
  }



}
