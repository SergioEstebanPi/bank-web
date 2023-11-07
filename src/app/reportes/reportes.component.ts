import { Component } from '@angular/core';
const pdfMake = require('pdfmake/build/pdfmake.js');
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { ReportePage } from './reporte-page';
import { Reporte } from './reporte';
import { ReportesService } from './reportes.service';
import * as moment from 'moment';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Cliente } from '../clientes/cliente';
import { ClientesService } from '../clientes/clientes.service';
import { Validators } from '@angular/forms';

const pdf = pdfMake;
pdf.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent {

  ReportesPage:ReportePage = new ReportePage;
  reportes:Reporte[] = [];
  dniCliente:number;
  fechaIni:string;
  fechaFin:string;
  filter:FormGroup;
  selected:FormControl;

  clientes: Cliente[] = [];

  FORMATO_FECHA = "YYYY-MM-DD";
  FORMATO_FECHA_HORA = "YYYY-MM-DD HH:MM:SS";

  constructor(private reporteService:ReportesService,
     private clienteService:ClientesService) {
  }

  ngOnInit() {
    this.clienteService.getClientes().subscribe(
      (clientesPage) => {
        this.clientes = clientesPage.content;
      }
    );

    this.selected = new FormControl('', [Validators.required]);

    const now = new Date();
    const monthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate(), now.getHours());

    // fechas por defecto
    this.fechaIni = moment(monthAgo, this.FORMATO_FECHA).toISOString()
    this.fechaFin = moment(now, this.FORMATO_FECHA).toISOString()
  
    this.filter = new FormGroup({
      fechaIni: new FormControl(this.fechaIni, []),
      fechaFin: new FormControl(this.fechaFin, [])
    });
  }


  generatePdf() {
    this.dniCliente = this.selected.value;
    let formattedFechaIni = (moment(this.filter.controls['fechaIni'].value)).format(this.FORMATO_FECHA).toString()
    let formattedFechaFin = (moment(this.filter.controls['fechaFin'].value)).format(this.FORMATO_FECHA).toString()

    this.reporteService.getReporte(this.dniCliente, formattedFechaIni, formattedFechaFin).subscribe(
      (reportesPage) => {
        this.reportes = reportesPage.content;

        var encabezados = ["Fecha", 
        "Dni", "Nombre", "NumeroCuenta", 
        "Tipo", "SaldoInicial", "Estado", 
        "Movimiento", "Saldo"];

        var datosTabla:any[] = [];
        datosTabla.push(encabezados);

        this.reportes.forEach(reporte => {
          let formattedFechaMov = (moment(reporte.fechaMovimiento).format(this.FORMATO_FECHA_HORA).toString());
          var fila = [formattedFechaMov, reporte.dni, reporte.nombreCliente,
          reporte.numeroCuenta, reporte.tipoCuenta, reporte.saldoInicial,
          reporte.estado, reporte.valorMovimiento, reporte.saldoMovimiento];
          datosTabla.push(fila);
        });

        const docDefinition = {
          content: [ { text: "Reporte de movimientos de la cuenta", style: "header" },
            "Se muestran los movimientos de la cuenta",
            {text: "Tabla", style: "subheader"},
            {style: "tableExample", table: {header: encabezados, body: datosTabla}}
          ],
    
          styles: {
            header: { fontSize: 18, bold: true, margin: [0, 0, 0, 10] },
            subheader: { fontSize: 16, bold: true, margin: [0, 10, 0, 5] },
            tableExample: { fontSize: 10, margin: [0, 5, 0, 5] }
          }
        };
    
        pdfMake.createPdf(docDefinition).download("reporte.pdf");
      }
    );
  }
}
