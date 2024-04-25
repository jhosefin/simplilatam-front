import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
/* Servicio implementado para actualizar la lista de empleados registrados */
export class UserUpdateServiceService {
  private userUpdateSource = new Subject<void>();
  userUpdated$ = this.userUpdateSource.asObservable();
  constructor() { }

  updateUserList(){
    this.userUpdateSource.next();
  }
}
