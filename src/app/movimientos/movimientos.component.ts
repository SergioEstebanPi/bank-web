import { Component, OnInit } from '@angular/core';

import { Movimiento } from './movimiento';
import { MovimientoPage } from './movimiento-page';
import { MovimientosService } from './movimientos.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-movimientos',
  templateUrl: './movimientos.component.html',
  styleUrls: ['./movimientos.component.css']
})

export class MovimientosComponent implements OnInit {

  movimientosPage:MovimientoPage = new MovimientoPage;
  movimientos:Movimiento[] = [];
  searchText:string;

  constructor(private movimientosService:MovimientosService) { }

  ngOnInit() {
    this.movimientosService.getMovimientos().subscribe(
      (movimientosPage) => {
        this.movimientosPage = movimientosPage;
        this.movimientos = movimientosPage.content;
      }
    );
  }

  delete(movimiento:Movimiento):void{
    swal({
      title: 'Esta seguro?',
      text: `Eliminar al movimiento ${movimiento.id}. No es posible deshacer este cambio!`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar movimiento!'
    }).then((result) => {
      if (result.value) {
        this.movimientosService.delete(movimiento.id)
          .subscribe({
            next: (respuesta) => {
              this.movimientos = this.movimientos.filter(cli => cli != movimiento);
            swal('Borrado!',
              `El movimiento ${movimiento.id} ha sido borrado con exito.`,
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