import {Component, inject} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {merge} from 'rxjs';
import { EmpleadosService } from '../../services/empleados.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.maxLength(8)]);
  errorMessage = '';

  empleadosService = inject(EmpleadosService)
  constructor(private router: Router) {
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  updateErrorMessage() {
    if (this.email.hasError('required') || this.password.hasError('required')) {
      this.errorMessage = '¡Completa los datos!';
    } else if (this.email.hasError('email') || this.password.hasError('maxLength(8)')) {
      this.errorMessage = '¡Datos  incorrectos!';
    } else {
      this.errorMessage = '';
    }
  }

  async login() {
    console.log(this.email.value);
    console.log(this.password.value);
    const response = await this.empleadosService.login(this.email.value, this.password.value);
    console.log(response);
    if(!response.error){
      localStorage.setItem("token", response.token);
      this.router.navigate(['/employee/']);
    }
  }

}
