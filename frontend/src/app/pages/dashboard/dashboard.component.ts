import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand.model';
import { BrandsService } from 'src/app/services/brands.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls:['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  brand: Brand[] = [];
  public totalBrands: number = 0;

  constructor(private brandsService: BrandsService){}


  ngOnInit(): void {
    this.brandsData();
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



}
