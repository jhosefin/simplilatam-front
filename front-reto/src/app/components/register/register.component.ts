import { Component, inject } from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {merge} from 'rxjs';
import { Inject } from '@angular/core';
import { DIALOG_DATA, DialogRef, Dialog} from '@angular/cdk/dialog';
import { Empleado } from '../../interfaces/info';
import { EmpleadosService } from '../../services/empleados.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  name = new FormControl('', [Validators.required, Validators.minLength(2)]);
  lastname = new FormControl('', [Validators.required, Validators.maxLength(3)]);
  run  = new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{7}$/)]);
  errorMessage = '';

  empleadosService = inject(EmpleadosService)
  constructor(@Inject(DIALOG_DATA) public data: Empleado, public dialogRef: DialogRef, private router: Router, public dialog: Dialog) {
    merge(this.name.statusChanges, this.lastname.valueChanges, this.run.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  updateErrorMessage() {
    if (this.name.hasError('required') || this.lastname.hasError('required') || this.run.hasError('required')) {
      this.errorMessage = '¡Completa los datos!';
    } else if (this.name.hasError('email') || this.lastname.hasError('maxLength(8)') || this.run.hasError('pattern(/^[0-9]{7}$/)')) {
      this.errorMessage = '¡Datos  incorrectos!';
    } else {
      this.errorMessage = '';
    }
  }

  async register() {
    console.log(this.name.value)
    console.log("entrado todo bien ");
    const response = await this.empleadosService.register(this.name.value, this.lastname.value, this.run.value)
    console.log(response);
    if(!response.error){
      this.dialog.closeAll();
    }
  }
}
