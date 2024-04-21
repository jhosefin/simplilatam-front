import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {
  
  API_URL: string = 'https://api.dev.api-arrayan.cl/api';
  constructor(private httpClient: HttpClient) { }

}
