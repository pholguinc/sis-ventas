import { CategoriesService } from './../../../services/categories.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit{
  public isUpdate: string = '';
  public assets: any = [];
  public categoryForm!: FormGroup;
  public title: string = '';
  public titleModule: string = 'Categoría';
  public titleData: string = 'categoría';
  public isLoading = false;

  constructor(
    private categoriesService: CategoriesService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
    .subscribe(({id}) => this.dataBrand(id));
    this.categoryForm = this.fb.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
    });


    const id = this.activatedRoute.snapshot.params['id'];
    this.title = id === 'nuevo' ? 'Crear Nueva Categoría' : 'Editar Categoría';
    this.isUpdate = id === 'nuevo' ? 'Guardar' : 'Actualizar';
  }


  onSubmit() {

    const id = this.activatedRoute.snapshot.params['id'];

    if(id === 'nuevo'){
      this.isLoading = true;
      this.title = 'Crear Nuevo Cliente';
      this.categoriesService.addCategory(this.categoryForm.value).subscribe({
        next: (res) => {
          Swal.fire({
            title:"Correcto",
            text: `¡La ${this.titleData} fue registrada correctamente!`,
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

    }else{

      this.title = 'Editar Cliente';
      this.categoriesService.updateCategory(id, this.categoryForm.value)
      .subscribe({
        next: (res)=>{
          console.log('Actualizado', res)
        }
      })

    }



  }

  dataBrand(id: string){
    this.categoriesService.categoryId(id)
      .subscribe(
        res=>{
          this.categoryForm.patchValue(res);
        }
      )
  }


}
