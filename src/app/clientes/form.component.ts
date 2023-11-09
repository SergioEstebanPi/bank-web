import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClientesService } from './clientes.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Formater } from '../util/formater';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  cliente:Cliente = new Cliente();
  tituloCrear:string = "Crear cliente";
  tituloEditar:string = "Editar cliente";
  filter:FormGroup;
  nacimiento:string;
  formater:Formater;

  constructor(private clientesService:ClientesService,
    private router:Router,
    private activatedRoute:ActivatedRoute) {
  }

  ngOnInit() {
    this.formater = new Formater();
    this.nacimiento = this.formater.fechaFinNow();
    this.filter = new FormGroup({
      nacimiento: new FormControl(this.nacimiento, [])
    });

    this.cargarCliente();
  }

  cargarCliente():void{
    this.cliente.genero = "M";
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
    this.cliente.nacimiento = this.formater.formaterFecha(this.filter.controls['nacimiento'].value);
    console.log("Clicked");
    console.log(this.cliente);
    this.clientesService.create(this.cliente)
      .subscribe({
        next: (respuesta) => {
        swal("Nuevo cliente",
          `Cliente ${this.cliente.nombre} creado con exito!`,
          'success');
        this.router.navigate(["/clientes"]);
        },
        error: (err) => {
          console.log("ERROR");
          console.log(err);
          swal("Error cliente",
          `Cliente ${this.cliente.nombre}: ${err.error.errorMessage ? err.error.errorMessage: 'No realizado'}`,
          'error');
      }});
  }

  update():void{
    this.cliente.nacimiento = this.formater.formaterFecha(this.filter.controls['nacimiento'].value);
    this.clientesService.update(this.cliente)
    .subscribe({
      next: (respuesta) => {
        swal('Cliente actualizado',
          `Cliente ${this.cliente.nombre} actualizado con exito`,
          'success');
      },
      error: (err) => {
        console.log("ERROR");
        console.log(err);
        swal("Error cliente",
        `Cliente ${this.cliente.nombre}: ${err.error.errorMessage ? err.error.errorMessage: 'No realizado'}`,
        'error');
      }});
  }

}
