import { Component, OnInit } from '@angular/core';

import { Cliente } from './cliente';
import { ClientePage } from './cliente-page';
import { ClientesService } from './clientes.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})

export class ClientesComponent implements OnInit {

  clientesPage:ClientePage = new ClientePage;
  clientes:Cliente[] = [];

  constructor(private clienteService:ClientesService) { }

  ngOnInit() {
    this.clienteService.getClientes().subscribe(
      (clientesPage) => {
        this.clientesPage = clientesPage;
        this.clientes = clientesPage.content;
      }
    );
  }

  delete(cliente:Cliente):void{
    swal({
      title: 'Esta seguro?',
      text: `Eliminar al cliente ${cliente.nombre}. No es posible deshacer este cambio!`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar archivo!'
    }).then((result) => {
      if (result.value) {
        this.clienteService.delete(cliente.id)
          .subscribe(
            respuesta => {
              this.clientes = this.clientes.filter(cli => cli != cliente);
            swal(
              'Borrado!',
              `El cliente ${cliente.nombre} ha sido borrado con exito.`,
              'success'
            )
          }
          );
      }
    });
  }

}