import { Component, OnInit } from '@angular/core';
import { Movimiento } from './movimiento';
import { MovimientosService } from './movimientos.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { CuentaPage } from '../cuentas/cuenta-page';
import { CuentasService } from '../cuentas/cuentas.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  movimiento:Movimiento = new Movimiento();
  tituloCrear:string = "Crear movimiento";
  tituloEditar:string = "Editar movimiento";
  cuentasPage:CuentaPage = new CuentaPage();

  constructor(private movimientosService:MovimientosService,
    private cuentasService:CuentasService,
    private router:Router,
    private activatedRoute:ActivatedRoute) {
  }

  ngOnInit() {
    this.cargarMovimiento();
  }

  cargarMovimiento():void{
    this.movimiento.idCuenta = 0;
    this.cuentasService.getCuentas()
      .subscribe(cuentas => this.cuentasPage = cuentas);
    this.activatedRoute.params.subscribe(
      params => {
        let id = params['id'];
        if (id) {
          this.movimientosService.getMovimiento(id)
            .subscribe(movimiento => this.movimiento = movimiento);
        }
      }
    );
  }

  create():void{
    console.log("Clicked");
    console.log(this.movimiento);
    this.movimientosService.create(this.movimiento)
      .subscribe({
      next: (respuesta) => {
        swal("Nuevo movimiento",
          `Movimiento ${respuesta} creado con exito!`,
          'success');
        this.router.navigate(["/movimientos"]);
      },
      error: (err) => {
        console.log("ERROR");
        console.log(err);
        swal("Error movimiento",
        `Movimiento no creado debe seleccionar un idCuenta`,
        'error');
      }})
    ;
  }

  update():void{
    this.movimientosService.update(this.movimiento)
    .subscribe({
      next: (respuesta) => {
        swal('Movimiento actualizado',
          `Movimiento ${this.movimiento.id} actualizado con exito`,
          'success');
      },
      error: (err) => {
        console.log("ERROR");
        console.log(err);
        swal("Error movimiento",
        `No fue posible actualizar el movimiento`,
        'error');
      }});
  }

}
