import { UsersService } from './../../services/users.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls:[
    './login.component.css'
  ]
})
export class LoginComponent {
  public formSubmitted = false;

  public loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private usersService: UsersService
  ) {}

  login() {
    console.log(this.loginForm.value);

    this.usersService.loginAccess(this.loginForm.value).subscribe({
      next: (res) => {
        const { access_token, user } = res;
        const { names } = user;

        console.log(res);
        let timerInterval: any;

        Swal.fire({
          title: `Bienvenido: ${names}`,
          html: 'Será redireccionado en <b></b> milisegundos.',
          icon: 'success',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            const b = Swal.getHtmlContainer()!.querySelector('b');
            timerInterval = setInterval(() => {
              b!.textContent = String(Swal.getTimerLeft());
            }, 100);
          },
          willClose: () => {
            clearInterval(timerInterval);
          },
        }).then(() => {
          this.router.navigate(['/admin']);
        });
      },
      error: () => {
        Swal.fire('Error', 'El email y/o contraseña son inválidas', 'error');
      },
    });
  }

}
