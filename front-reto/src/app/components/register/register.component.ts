import { Component } from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {merge} from 'rxjs';
import { Inject } from '@angular/core';
import {Dialog, DIALOG_DATA, DialogRef} from '@angular/cdk/dialog';
import { Empleado } from '../../interfaces/info';

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

  constructor(@Inject(DIALOG_DATA) public data: Empleado, public dialogRef: DialogRef) {
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

  register() {
    console.log("nombre"+this.name);
    console.log("apellido"+this.lastname);
    console.log("run"+this.run)
  }
}
