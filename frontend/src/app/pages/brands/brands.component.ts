//Módulos
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

// Material
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
const base_url = environment.base_url;
import * as moment from 'moment';

//Servicios

import { BrandsService } from 'src/app/services/brands.service';

//Modelos

import { Brand } from 'src/app/models/brand.model';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml;charset=UTF-8';
const EXCEL_EXT = '.xlsx';

@Component({
  selector: 'app-brandss',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css'],
})
export class BrandsComponent implements OnInit, AfterViewInit {
  brand: Brand[] = [];
  currentYear: number = new Date().getFullYear();

  dataSource!: MatTableDataSource<Brand>;
  displayedColumns: string[] = ['code', 'name', 'acciones'];
  isLoading: boolean = false;
  resultsLength = 0;

  constructor(
    private brandsService: BrandsService,) {}


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


  //Reportes PDF

  header = [['#', 'Código', 'Marca', 'Fecha']];

  generatePDF(): void {
    const currentDate = new Date();
    const formattedDate = this.formatDate(currentDate);
    const pdf = new jsPDF();
    const iconUrl = '../../../assets/media/config/logo-dark.png';
    const iconWidth = 40;
    const iconHeight = 10;

    pdf.addImage(iconUrl, 10, 10, iconWidth, iconHeight);

    const pageWidth = pdf.internal.pageSize.getWidth();
    const text = 'Reporte general de Marcas';
    const  fontSize = 20;
    const fontStyle = 'bold';

    const textWidth =
      (pdf.getStringUnitWidth(text) * fontSize) / pdf.internal.scaleFactor;

    const centerX = (pageWidth - textWidth) / 2;

    pdf.setFontSize(fontSize);
    pdf.setFont('Poppins', fontStyle);
    pdf.text(text, centerX, 18);

    const modifiedData = this.dataSource.data.map((brand, index) => ({
      ...brand,
      id: index + 1,
    }));

    (pdf as any).autoTable({
      head: this.header,
      body: modifiedData.map((brand) => [
        brand.id,
        brand.code,
        brand.name,
        moment(brand.register.createdAt).format('DD-MM-YYYY'),
      ]),
      margin: { top: 30 },
      didDrawCell: (data: { column: { index: any } }) => {
        console.log(data.column.index);
      },
    });
    pdf.setFontSize(16);
    pdf.setFont('Poppins', fontStyle);
    pdf.text(
      `Mi empresa - ${this.currentYear}`,
      pageWidth / 2,
      pdf.internal.pageSize.getHeight() - 10,
      { align: 'center' }
    );

    pdf.output('dataurlnewwindow');
    pdf.save(`Reporte-marcas-${formattedDate}.pdf`);
  }

  formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  generateExcel() {
    const createdAt = moment().format('DD-MM-YYYY');
    const dataForExport = this.dataSource.data.map((brand) => {
      const { id, register, ...brandWithoutIdAndRegister } = brand; // Exclude the 'id' and 'register' fields
      const fecha = moment(brand.register.createdAt).format('DD-MM-YYYY');
      return { ...brandWithoutIdAndRegister, 'Fecha': fecha };
    });

    const workSheet = XLSX.utils.json_to_sheet(dataForExport);
    const workBook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, 'SheetName');
    XLSX.writeFile(workBook, `Reporte-marcas-${createdAt}.xlsx`);
  }

}
