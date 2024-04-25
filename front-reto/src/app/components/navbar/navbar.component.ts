import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { EmpleadosService } from '../../services/empleados.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatMenuModule, MatButtonModule, MatIconModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private router: Router, private empleadosService: EmpleadosService) {}

  isAuthenticated(): boolean {
    // Lógica para determinar si el usuario está autenticado
    return this.empleadosService.getItem('token') !== null;
  }

  isEmployeeRoute(): boolean {
    // Lógica para determinar si la ruta actual es la de empleados
    return this.router.url.includes('/employee');
  }

  logout(): void {
    // Lógica para cerrar sesión
    this.empleadosService.removeItem('token');
    // Redirigir al usuario a la página de inicio de sesión
    this.router.navigate(['/login']);
  }
}
