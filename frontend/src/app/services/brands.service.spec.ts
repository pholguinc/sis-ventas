import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BrandsService } from "./brands.service";

import { environment } from '../../environments/environment';
import { Brand } from "../models/brand.model";
const base_url = environment.base_url;

describe('BrandsService', () => {
  let service: BrandsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BrandsService]
    });
    service = TestBed.inject(BrandsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no haya solicitudes pendientes
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve brands from API via GET', () => {
    const dummyBrands: Brand[] = [
      {
        id: '1',
        register: { createdAt: new Date(), updatedAt: new Date() }, // Ejemplo de fechas válidas
        name: 'Marca 1',
        code: '1'
      },
      {
        id: '2',
        register: { createdAt: new Date(), updatedAt: new Date() }, // Ejemplo de fechas válidas
        name: 'Marca 2',
        code: '2'
      },
      // Agrega más objetos según sea necesario
  ];

    service.loadBrands().subscribe(brands => {
      expect(brands.length).toBe(dummyBrands.length);
      expect(brands).toEqual(dummyBrands);
    });

    const req = httpMock.expectOne(`${base_url}/brands`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyBrands);
  });

  it('should add a new brand via POST', () => {
    const newBrand: Brand = {
      id: '1',
      register: {
        createdAt: new Date(),
        updatedAt: new Date()
      },
      name: "marcas11",
      code: "5"
    };



    service.addBrand(newBrand).subscribe(brand => {
      expect(brand).toEqual(newBrand);
    });

    const req = httpMock.expectOne(`${base_url}/brands`);
    expect(req.request.method).toBe('POST');
    req.flush(newBrand);
  });

  // Escribe pruebas similares para las otras funciones (brandId, updateCustomer, deleteBrand)
});
