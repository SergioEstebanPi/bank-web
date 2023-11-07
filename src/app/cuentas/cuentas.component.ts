import { Component, OnInit } from '@angular/core';

import { Cuenta } from './cuenta';
import { CuentaPage } from './cuenta-page';
import { CuentasService } from './cuentas.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-cuentas',
  templateUrl: './cuentas.component.html',
  styleUrls: ['./cuentas.component.css']
})

export class CuentasComponent implements OnInit {

  cuentasPage:CuentaPage = new CuentaPage;
  cuentas:Cuenta[] = [];
  searchText:string;

  constructor(private cuentaService:CuentasService) { }

  ngOnInit() {
    this.cuentaService.getCuentas().subscribe(
      (cuentasPage) => {
        this.cuentasPage = cuentasPage;
        this.cuentas = cuentasPage.content;
      }
    );
  }

  delete(cuenta:Cuenta):void{
    swal({
      title: 'Esta seguro?',
      text: `Eliminar la cuenta ${cuenta.numero}. No es posible deshacer este cambio!`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar archivo!'
    }).then((result) => {
      if (result.value) {
        this.cuentaService.delete(cuenta.id)
          .subscribe({
            next: (respuesta) => {
                this.cuentas = this.cuentas.filter(cli => cli != cuenta);
              swal('Borrado!',
                `La cuenta ${cuenta.numero} ha sido borrada con exito.`,
                'success')
            }, error: (err) => {
              swal('Error',
              `Error al intentar borrar`,
              'error');
            }});
      }
    });
  }

}