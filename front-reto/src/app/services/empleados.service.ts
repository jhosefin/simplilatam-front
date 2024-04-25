import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable,firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {
  private httpClient = inject(HttpClient);
  private API_URL: string;
  constructor() { 
    this.API_URL = 'https://api.dev.api-arrayan.cl/api';
  }

  // Get a value from local storage
  getItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  // Set a value in local storage
  setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  // Remove a value from local storage
  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  localData(){
    const token= this.getItem('token');
      const httpOptions ={
        headers: new HttpHeaders({
          "Authorization": `JWT ${token}`
        })
      };
      return httpOptions;
  }

  login(username: any,password:any ){
    return firstValueFrom(
      this.httpClient.post<any>(`${this.API_URL}/login/`, { username, password })
    )
  }

  register(nombre: any, apellido: any, run: any){
      return firstValueFrom(
        this.httpClient.post<any>(`${this.API_URL}/employee/`, {nombre, apellido, run}, this.localData()))
  }


  getEmpleados(): Observable<any>{
    return this.httpClient.get(`${this.API_URL}/employee/`,this.localData()).pipe(res => res);    
  }


}
