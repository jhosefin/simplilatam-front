import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
    { path: "", redirectTo:"login", pathMatch: "full" },
    { path: "login", component: LoginComponent, pathMatch: "full" },
    { path: "employee", component: LoginComponent, pathMatch: "full" },
    { path: "employee", component: LoginComponent, pathMatch: "full" },
];
