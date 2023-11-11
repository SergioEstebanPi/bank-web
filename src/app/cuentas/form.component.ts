import { Component, OnInit } from '@angular/core';
import { Cuenta } from './cuenta';
import { CuentasService } from './cuentas.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { ClientesService } from '../clientes/clientes.service';
import { ClientePage } from '../clientes/cliente-page';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  cuenta:Cuenta = new Cuenta();
  clientesPage:ClientePage = new ClientePage();
  tituloCrear:string = "Crear cuenta";
  tituloEditar:string = "Editar cuenta";

  constructor(private cuentasService:CuentasService,
    private clientesService:ClientesService,
    private router:Router,
    private activatedRoute:ActivatedRoute) {
  }

  ngOnInit() {
    this.cargarCuenta();
  }

  cargarCuenta():void{
    this.cuenta.idCliente = 0;
    this.cuenta.tipo = "Ahorro";

    this.clientesService.getClientes()
      .subscribe(clientes => this.clientesPage = clientes);

    this.activatedRoute.params.subscribe(
      params => {
        let id = params['id'];
        if (id) {
          this.cuentasService.getCuenta(id)
            .subscribe(cuenta => {
              this.cuenta = cuenta
            });
        }
      }
    );
  }

  create():void{
    console.log("Clicked");
    console.log(this.cuenta);
    this.cuentasService.create(this.cuenta)
      .subscribe({
      next: (respuesta) => {
        swal("Nuevo cuenta",
          `Cuenta ${this.cuenta.id} creado con exito!`,
          'success');
        this.router.navigate(["/cuentas"]);
      }, error: (err) => {
          console.log("ERROR");
          console.log(err);
          swal("Error cuenta",
          `Cuenta no creada debe seleccionar un idCliente`,
          'error');
      }});
    ;
  }

  update():void{
    this.cuentasService.update(this.cuenta)
    .subscribe({
      next: (respuesta) => {
        swal('Cuenta actualizado',
          `Cuenta ${this.cuenta.id} actualizado con exito`,
          'success');
      },
      error: (err) => {
          console.log("ERROR");
          console.log(err);
          swal("Error cuenta",
          `Cuenta ${this.cuenta.id}: ${err.error.errorMessage ? err.error.errorMessage: 'No actualizada'}`,
          'error');
      }});
  }

}
