import {Component, inject} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {merge} from 'rxjs';
import { Router } from '@angular/router';
import { EmpleadosService } from '../../services/empleados.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(5)]);
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
    } else if (this.email.hasError('email') || this.password.hasError('minLength(5)')) {
      this.errorMessage = '¡Datos  incorrectos!';
    } else {
      this.errorMessage = '';
    }
  }

  async login() {
    const response = await this.empleadosService.login(this.email.value, this.password.value);
    if(!response.error){
      this.empleadosService.setItem("token", response.token);
      this.router.navigate(['/employee/']);
    }
  }

}
