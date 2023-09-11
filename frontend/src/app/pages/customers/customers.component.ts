
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Customer } from 'src/app/models/customer.model';
import { CustomersService } from 'src/app/services/customers.service';
import Swal from 'sweetalert2';

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

  deleteCustomer(customer: Customer): void {
    Swal.fire({
      title: `¿Estás seguro de eliminar a ${customer.name}?`,
      text: 'Al eliminarlo no podrá recuperarlo',
      icon: 'info',
      buttonsStyling: false,
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-danger',
      },
    }).then((result) => {
      if (result.value) {
        this.customersService.deleteCustomer(customer.id)
        .subscribe({
          next: (res)=>{
            this.loadData();
            Swal.fire({
              text: "¡Cliente eliminado correctamente!",
              icon: "success",
              buttonsStyling: false,
              confirmButtonText: "Ok",
              customClass: {
                  confirmButton: "btn btn-primary"
              }
          })

          }
        })
      }
    });
  }

}
