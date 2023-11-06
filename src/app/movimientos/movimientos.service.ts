import { Injectable } from '@angular/core';

import { Movimiento } from './movimiento';
import { MovimientoPage } from './movimiento-page';

import { Observable } from 'rxjs';
import { of } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovimientosService {

  movimientos:MovimientoPage[] = [];
  private urlEndpoint:string = "http://localhost:8080/movimiento";
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) {
  }

  getMovimientos():Observable<MovimientoPage>{
    return this.http.get<MovimientoPage>(
      this.urlEndpoint
    );
  }

  create(movimiento:Movimiento):Observable<Movimiento>{
    return this.http.post<Movimiento>(
      this.urlEndpoint,
      movimiento,
      {headers : this.httpHeaders}
    );
  }
  getMovimiento(id:number):Observable<Movimiento>{
    return this.http.get<Movimiento>(`${this.urlEndpoint}/${id}`);
  }

  update(movimiento:Movimiento):Observable<Movimiento>{
    return this.http.put<Movimiento>(`${this.urlEndpoint}/${movimiento.id}`,
        movimiento,
        {headers : this.httpHeaders});
  }

  delete(id:number):Observable<Movimiento>{
    return this.http.delete<Movimiento>(`${this.urlEndpoint}/${id}`,
      {headers: this.httpHeaders});
  }
}
