//Módulos
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

// Material
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
const base_url = environment.base_url;
import { format } from 'date-fns';



//Servicios

import { BrandsService } from 'src/app/services/brands.service';

//Modelos

import { Brand } from 'src/app/models/brand.model';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
@Component({
  selector: 'app-brandss',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css'],
})
export class BrandsComponent implements OnInit, AfterViewInit {
  brand: Brand[] = [];

  dataSource!: MatTableDataSource<Brand>;
  displayedColumns: string[] = ['code', 'name', 'acciones'];
  isLoading: boolean = false;
  resultsLength = 0;

  constructor(private brandsService: BrandsService) {}

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    this.loadData();
  }

  loadData() {
    this.isLoading = true;
    this.brandsService.loadBrands().subscribe({
      next: (res) => {
        this.dataSource.data = res;

        console.log(res);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteBrand(brand: Brand): void {
    Swal.fire({
      title: `¿Estás seguro de eliminar la marca ${brand.name}?`,
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
        this.brandsService.deleteBrand(brand.id).subscribe({
          next: (res) => {
            this.loadData();
            Swal.fire({
              text: '¡Marca eliminada correctamente!',
              icon: 'success',
              buttonsStyling: false,
              confirmButtonText: 'Ok',
              customClass: {
                confirmButton: 'btn btn-primary',
              },
            });
          },
        });
      }
    });
  }

  header = [['ID', 'Name', 'Email', 'Profile']];

  tableData = [
    [1, 'Nombre', 'Nombre', 'Nombre'],
    [2, 'Nombre', 'Nombre', 'Nombre'],
  ];

  generatePDF(): void {
    var pdf = new jsPDF();
    var iconUrl = '../../../assets/media/config/logo-dark.png'; // Replace with the path to your image icon
    var iconWidth = 40; // Set the width of the icon
    var iconHeight = 10; // Set the height of the icon// Center the icon horizontally

    pdf.addImage(
      iconUrl,
      10,
      10,
      iconWidth,
      iconHeight
    );

    var pageWidth = pdf.internal.pageSize.getWidth();
    var text = 'Reporte general de Marcas';
    var fontSize = 20;
    const fontStyle = "bold";

    var textWidth =
      (pdf.getStringUnitWidth(text) * fontSize) / pdf.internal.scaleFactor;

    var centerX = (pageWidth - textWidth) / 2;

    pdf.setFontSize(fontSize);
    pdf.setFont('Poppins', fontStyle)
    pdf.text(text, centerX, 18);

    const modifiedData = this.dataSource.data.map((brand, index) => ({
      ...brand,
      id: index + 1, // Increment the ID
    }));

    (pdf as any).autoTable({
      head: this.header,
      body: modifiedData.map(brand => [brand.id, brand.code, brand.name, brand.register.createdAt]), // Use brand.register.createdAt
      margin: { top: 30 },
      didDrawCell: (data: { column: { index: any } }) => {
        console.log(data.column.index);
      },
    });
    pdf.output('dataurlnewwindow');
    pdf.save('table.pdf');
  }
}
