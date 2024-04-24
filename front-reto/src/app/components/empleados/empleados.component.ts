import { Component, OnInit, inject } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { Info } from '../../interfaces/info';
import {Dialog, DialogModule} from '@angular/cdk/dialog';
import { RegisterComponent } from '../register/register.component';
import { EmpleadosService } from '../../services/empleados.service';

const ELEMENT_DATA: Info[] = [];

@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [MatTableModule, DialogModule],
  templateUrl: './empleados.component.html',
  styleUrl: './empleados.component.css'
})

export class EmpleadosComponent implements OnInit{
  displayedColumns: string[] = ['demo-position', 'demo-name', 'demo-lastname', 'demo-run'];
  dataSource = ELEMENT_DATA

  
  constructor(private empleadosService: EmpleadosService, public dialog: Dialog) {}
  /* empleadosService = inject(EmpleadosService) */

    // Método para agregar datos registrados
    addData(newData: Info) {
      console.log("aqui te muestro la data"+this.empleadosService.getEmpleados());
      this.dataSource.push(newData);
    }
  openDialog() {
    console.log("aca todo bien")
    this.dialog.open(RegisterComponent, {
      minWidth: '300px',
      maxWidth: '50%',
    });
  }
  ngOnInit(): void {
    this.listEmpleados();
  }
/*   getEmpleados(){
    this.empleadosService.otroget().subscribe({
      next: (result) =>{
        this.dataSource = result.empleados
      },
      error:(err)=>{
        console.log(err);
      }
    })
  } */
  listEmpleados() {
    console.log("esto es la cosa esa"+this.displayedColumns)
    console.log("entrado todo bien ");
    this.empleadosService.getEmpleados().subscribe((data: any) => {
      // Asigna los datos obtenidos al dataSource
      this.dataSource = data.empleados;
    });
  }
}