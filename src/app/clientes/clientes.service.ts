import { Injectable } from '@angular/core';

import { Cliente } from './cliente';
import { ClientePage } from './cliente-page';

import { Observable } from 'rxjs';
import { of } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  clientes:ClientePage[] = [];
  private urlEndpoint:string = "http://localhost:8080/cliente";
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) {
  }

  getClientes():Observable<ClientePage>{
    return this.http.get<ClientePage>(
      this.urlEndpoint
    );
  }

  create(cliente:Cliente):Observable<Cliente>{
    return this.http.post<Cliente>(
      this.urlEndpoint,
      cliente,
      {headers : this.httpHeaders}
    );
  }
  getCliente(id:number):Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlEndpoint}/${id}`);
  }

  update(cliente:Cliente):Observable<Cliente>{
    return this.http.put<Cliente>(`${this.urlEndpoint}/${cliente.id}`,
        cliente,
        {headers : this.httpHeaders});
  }

  delete(id:number):Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlEndpoint}/${id}`,
      {headers: this.httpHeaders});
  }
}
