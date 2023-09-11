
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Customer } from 'src/app/models/customer.model';
import { CustomersService } from 'src/app/services/customers.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit, AfterViewInit{
  customer: Customer[] = [];
  dataSource!: MatTableDataSource<Customer>;
  displayedColumns: string[] = ['name', 'lastname_pater','lastname_mater', 'numDoc', 'phone', 'acciones'];
  isLoading: boolean = false;
  resultsLength = 0;

  constructor(private customersService: CustomersService){}

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    this.loadData();
  }

  loadData(){
    this.isLoading = true;
    this.customersService.loadCustomers()
    .subscribe({
      next: (res)=>{
        this.dataSource.data = res;
        console.log(res)
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        this.isLoading = false;
      }
    })
  }
  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
