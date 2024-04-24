import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {
  private httpClient = inject(HttpClient);
  private API_URL: string;
  constructor() { 
    this.API_URL = 'https://api.dev.api-arrayan.cl/api';
  }

/*   createHeaders(){
    const token= localStorage.getItem("token");
      const httpOptions ={
        headers: new HttpHeaders({
          "Authorization": `JWT ${token}`
        })
      };
      return httpOptions;
  } */

  register(nombre: any, apellido: any, run: any){
    
      return firstValueFrom(
        this.httpClient.post<any>(`${this.API_URL}/employee/`, {nombre, apellido, run})
      )
    

  }

  login(username: any,password:any ){
    return firstValueFrom(
      this.httpClient.post<any>(`${this.API_URL}/login/`, { username, password })
    )
  }
  otroget(): Observable<any>{
    
      return this.httpClient.get(this.API_URL + '/employee/').pipe(res => res);
  }
  getEmpleados(){
    const token= localStorage.getItem("token");
    if (!token) {
      throw new Error ("No hay un Token")
    }else{
      const httpOptions ={
        headers: new HttpHeaders({
          "Authorization": `JWT ${token}`
        })
      };
      
      return this.httpClient.get(`${this.API_URL}/employee/`,httpOptions);    
    }
  }
}
