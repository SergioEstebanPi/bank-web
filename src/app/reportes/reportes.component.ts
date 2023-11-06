import { Component } from '@angular/core';
const pdfMake = require('pdfmake/build/pdfmake.js');
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { ReportePage } from './reporte-page';
import { Reporte } from './reporte';
import { reportesService } from './reportes.service';

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

  constructor(private reporteService:reportesService) { }

  generatePdf() {
    this.reporteService.getReporte(1).subscribe(
      (reportesPage) => {
        console.log(reportesPage);
        this.reportes = reportesPage.content;

        console.log("REPORTES");
        console.log(this.reportes);
        console.log(Object.keys(this.reportes.flatMap(re => re)));
        console.log(Object.values(this.reportes.flatMap(re => re)));

        var encabezados = ["Fecha", 
        "Dni", "Nombre", "NumeroCuenta", 
        "Tipo", "SaldoInicial", "Estado", 
        "Movimiento", "Saldo"];

        var datosTabla:any[] = [];
        datosTabla.push(encabezados);

        this.reportes.forEach(reporte => {
          var fila = [reporte.fechaMovimiento, reporte.dni, reporte.nombreCliente,
          reporte.numeroCuenta, reporte.tipoCuenta, reporte.saldoInicial,
          reporte.estado, reporte.valorMovimiento, reporte.saldoMovimiento];
          datosTabla.push(fila);
        });

        const docDefinition = {
          content: [ { text: "Reporte de movimientos de la cuenta", style: "header" },
            "Se muestran los movimientos de la cuenta",
            {text: "Tabla", style: "subheader"},
            {style: "tableExample", table: {body: datosTabla}}
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
