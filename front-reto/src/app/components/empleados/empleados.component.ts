import { Component } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { Info } from '../../interfaces/info';
import {Dialog, DialogModule} from '@angular/cdk/dialog';
import { RegisterComponent } from '../register/register.component';

const ELEMENT_DATA: Info[] = [
  {position: 1, name: 'Hydrogen', run: 1.0079, lastname: 'H'},
  {position: 2, name: 'Helium', run: 4.0026, lastname: 'He'},
  {position: 3, name: 'Lithium', run: 6.941, lastname: 'Li'},
  {position: 4, name: 'Beryllium', run: 9.0122, lastname: 'Be'},
  {position: 5, name: 'Boron', run: 10.811, lastname: 'B'},
  {position: 6, name: 'Carbon', run: 12.0107, lastname: 'C'},
  {position: 7, name: 'Nitrogen', run: 14.0067, lastname: 'N'},
  {position: 8, name: 'Oxygen', run: 15.9994, lastname: 'O'},
  {position: 9, name: 'Fluorine', run: 18.9984, lastname: 'F'},
  {position: 10, name: 'Neon', run: 20.1797, lastname: 'Ne'},
];

@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [MatTableModule, DialogModule],
  templateUrl: './empleados.component.html',
  styleUrl: './empleados.component.css'
})

export class EmpleadosComponent {
  displayedColumns: string[] = ['demo-position', 'demo-name', 'demo-lastname', 'demo-run'];
  dataSource = ELEMENT_DATA;
  
  constructor(public dialog: Dialog) {}

  openDialog() {
    console.log("aca todo bien")
    this.dialog.open(RegisterComponent, {
      minWidth: '300px',
      maxWidth: '50%',
    });
  }
}