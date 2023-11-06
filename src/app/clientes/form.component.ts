import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClientesService } from './clientes.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  cliente:Cliente = new Cliente();
  titulo:string = "Crear cliente";

  constructor(private clientesService:ClientesService,
    private router:Router,
    private activatedRoute:ActivatedRoute) {
  }

  ngOnInit() {
    this.cargarCliente();
  }

  cargarCliente():void{
    this.activatedRoute.params.subscribe(
      params => {
        let id = params['id'];
        if (id) {
          this.clientesService.getCliente(id).subscribe(cliente => this.cliente = cliente);
        }
      }
    );
  }

  create():void{
    console.log("Clicked");
    console.log(this.cliente);
    this.clientesService.create(this.cliente)
      .subscribe(
      respuesta => {
        swal("Nuevo cliente",
          `Cliente ${this.cliente.nombre} creado con exito!`,
          'success');
        this.router.navigate(["/clientes"]);
      })
    ;
  }

  update():void{
    this.clientesService.update(this.cliente)
    .subscribe(
      respuesta => {
        swal('Cliente actualizado',
          `Cliente ${this.cliente.nombre} actualizado con exito`,
          'success');
      }
    );
  }

}
