import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Provider } from 'src/app/models/provider.model';
import { ProvidersService } from 'src/app/services/providers.service';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.css']
})
export class ProvidersComponent implements OnInit, AfterViewInit {

  provider: Provider[] = [];
  dataSource!: MatTableDataSource<Provider>;
  displayedColumns: string[] = ['name', 'ruc','email', 'phone', 'address', 'acciones'];
  isLoading: boolean = false;
  resultsLength = 0;

  constructor(private providersService: ProvidersService){}

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    this.loadData();
  }

  loadData(){
    this.isLoading = true;
    this.providersService.loadProviders()
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
