import { Injectable } from '@angular/core';

import { Cuenta } from './cuenta';
import { CuentaPage } from './cuenta-page';

import { Observable } from 'rxjs';
import { of } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CuentasService {

  cuentas:CuentaPage[] = [];
  private urlEndpoint:string = "http://localhost:8080/cuenta";
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) {
  }

  getCuentas():Observable<CuentaPage>{
    return this.http.get<CuentaPage>(
      this.urlEndpoint
    );
  }

  create(cuenta:Cuenta):Observable<Cuenta>{
    return this.http.post<Cuenta>(
      this.urlEndpoint,
      cuenta,
      {headers : this.httpHeaders}
    );
  }
  getCuenta(id:number):Observable<Cuenta>{
    return this.http.get<Cuenta>(`${this.urlEndpoint}/${id}`);
  }

  update(cuenta:Cuenta):Observable<Cuenta>{
    return this.http.put<Cuenta>(`${this.urlEndpoint}/${cuenta.id}`,
        cuenta,
        {headers : this.httpHeaders});
  }

  delete(id:number):Observable<Cuenta>{
    return this.http.delete<Cuenta>(`${this.urlEndpoint}/${id}`,
      {headers: this.httpHeaders});
  }
}
