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
  searchText:string;

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
      confirmButtonColor: '#ffe23f',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar cliente!'
    }).then((result) => {
      if (result.value) {
        this.clienteService.delete(cliente.id)
          .subscribe({
            next: (respuesta) => {
              this.clientes = this.clientes.filter(cli => cli != cliente);
              swal('Borrado!',
                `El cliente ${cliente.nombre} ha sido borrado con exito.`,
                'success');
          }, error: (err) => {
            swal('Error',
            `Error al intentar borrar`,
            'error');
          }});
      }
    });
  }

}