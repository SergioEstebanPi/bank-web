import { Injectable } from '@angular/core';

import { Reporte } from './reporte';
import { ReportePage } from './reporte-page';

import { Observable } from 'rxjs';
import { of } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class reportesService {

  private urlEndpoint:string = "http://localhost:8080/reporte";
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) {
  }

  getReporte(dniCliente:number):Observable<ReportePage>{
    return this.http.get<ReportePage>(`${this.urlEndpoint}?dni=${dniCliente}&fechaInicial=2023-10-01&fechaFinal=2023-12-01&page=0&size=10`);
  }

}
