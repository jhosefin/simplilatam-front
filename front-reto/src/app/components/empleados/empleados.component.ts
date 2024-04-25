import { Component, OnDestroy, OnInit } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { Info } from '../../interfaces/info';
import {Dialog, DialogModule} from '@angular/cdk/dialog';
import { RegisterComponent } from '../register/register.component';
import { EmpleadosService } from '../../services/empleados.service';
import { Subscription } from 'rxjs';
import { UserUpdateServiceService } from '../../services/user-update-service.service';

const ELEMENT_DATA: Info[] = [];

@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [MatTableModule, DialogModule],
  templateUrl: './empleados.component.html',
  styleUrl: './empleados.component.css'
})

export class EmpleadosComponent implements OnInit, OnDestroy{
  displayedColumns: string[] = ['demo-position', 'demo-name', 'demo-lastname', 'demo-run'];
  dataSource = ELEMENT_DATA
  userList: any[] = [];
  subscription: Subscription;
  constructor(private empleadosService: EmpleadosService, public dialog: Dialog, private userUpdateService: UserUpdateServiceService) {
    this.subscription = new Subscription();
  }

  openDialog() {
    this.dialog.open(RegisterComponent, {
      minWidth: '300px',
      maxWidth: '50%',
    });
  }
  ngOnInit(): void {
    this.listEmpleados();
    this.subscription = this.userUpdateService.userUpdated$.subscribe(()=>{
      this.listEmpleados();
    })
  }

  listEmpleados() {
    this.empleadosService.getEmpleados().subscribe((data: any) => {
      this.dataSource = data.empleados;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}