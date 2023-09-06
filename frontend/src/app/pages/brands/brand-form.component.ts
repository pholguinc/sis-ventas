
import { BrandsService } from 'src/app/services/brands.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-brand-form',
  templateUrl: './brand-form.component.html',
  styleUrls: ['./brand-form.component.css'],
})
export class BrandFormComponent implements OnInit {
  public isUpdate: string = '';
  public assets: any = [];
  public brandForm!: FormGroup;
  public title: string = '';
  public titleModule: string = 'Marca';

  constructor(
    private brandsService: BrandsService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.brandForm = this.fb.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
    });
  }

  onSubmit() {

      this.brandsService.addBrand(this.brandForm.value).subscribe({
        next: (res) => {
          Swal.fire({
            title:"Correcto",
            text: "¡La marca fue registrada correctamente!",
            icon: "success",
            buttonsStyling: false,
            confirmButtonText: "Ok",
            customClass: {
                confirmButton: "btn btn-primary"
            }
        });

          console.log('Upload success', res);
        },
        error: (err) => {

          console.warn('Upload error', err.error.msg)
        },

      });
      console.log('Form is invalid');

  }

  
}
