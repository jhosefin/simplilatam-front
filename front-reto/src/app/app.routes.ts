import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { EmpleadosComponent } from './components/empleados/empleados.component';

export const routes: Routes = [
    { path: "", redirectTo:"login", pathMatch: "full" },
    { path: "login", component: LoginComponent, pathMatch: "full" },
    { path: "employee", component: EmpleadosComponent, pathMatch: "full" },
];
