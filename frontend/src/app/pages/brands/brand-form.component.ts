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
import { DomSanitizer } from '@angular/platform-browser';
const base_url = environment.base_url;

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

  constructor(
    private brandsService: BrandsService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.brandForm = this.fb.group({
      name: ['', Validators.required],
      code: ['', Validators.required],
      image: [''],
    });
  }

  onSubmit() {}

  url = `${base_url}/assets/media/images/blank-image.svg`;

  selectedFile = null;

  /*onSelectedFile(e:any){
    if(e.target.files){
      const file = e.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload=(event:any)=>{
          this.url=event.target.result;
          console.log(event.target.result)
      }
      this.selectedFile = file;
    }
  }*/

  AddFile(event: any) {
    const fileAdded = event.target.files[0];
    this.extractBase64(fileAdded).then((image) => {
      console.log(image);
    });
    this.assets.push(fileAdded);
    console.log(event.target.files);
  }

  extractBase64 = async ($event: any) =>
    new Promise((resolve, reject) => {
      try {
        const unsateImg = window.URL.createObjectURL($event);
        const image = this.sanitizer.bypassSecurityTrustUrl(unsateImg);
        const reader = new FileReader();
        reader.readAsDataURL($event);
        reader.onload = () => {
          resolve({
            base: reader.result,
          });
        };
        reader.onerror = (error) => {
          reject({
            base: null,
            error: error,
          });
        };
      } catch (e) {
        reject({
          base: null,
          error: e,
        });
      }
    });
}
