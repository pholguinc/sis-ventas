import { BrandsService } from 'src/app/services/brands.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
const base_url = environment.base_url;

@Component({
  selector: 'app-brand-form',
  templateUrl: './brand-form.component.html',
  styleUrls: ['./brand-form.component.css'],
})
export class BrandFormComponent implements OnInit {
  public isUpdate: string = '';

  public brandForm!: FormGroup;

  public title: string = '';

  constructor(
    private brandsService: BrandsService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.brandForm = this.fb.group({
      name: ['', Validators.required],
      code: ['', Validators.required],
      image: [''],
    });
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('name', this.brandForm.get('name')?.value);
    formData.append('code', this.brandForm.get('code')?.value);
    formData.append('image', this.brandForm.get('image')?.value);



      this.brandsService.addBrand(this.brandForm.value).subscribe({
        next: (res) => {
          console.log('Upload sucess', res);
        },
        error: (err) => console.warn('Upload error', err),
      });


  }

  url = `${base_url}/assets/media/images/blank-image.svg`;

  selectedFile = null;

  /*onSelectedFile(e:any){
    if(e.target.files){
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload=(event:any)=>{
          this.url=event.target.result;
          console.log(event.target.result)
      }
    }
  }*/
  onSelectedFile(event: any) {
    this.selectedFile = event.target.files[0];
    this.brandForm.get('image')?.setValue(this.selectedFile);
  }
}
