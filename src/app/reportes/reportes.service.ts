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
export class ReportesService {

  private urlEndpoint:string = "http://localhost:8080/reporte";
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) {
  }

  getReporte(dniCliente:number, fechaIni:string, fechaFin:string):Observable<ReportePage>{
    return this.http.get<ReportePage>(
      `${this.urlEndpoint}?dni=${dniCliente}&fechaInicial=${fechaIni}&fechaFinal=${fechaFin}&page=0&size=10`
    );
  }

}
