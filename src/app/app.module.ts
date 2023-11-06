import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientesComponent } from './clientes/clientes.component';
import { MovimientosComponent } from './movimientos/movimientos.component';
import { CuentasComponent } from './cuentas/cuentas.component';
import { ReportesComponent } from './reportes/reportes.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes} from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

const routes:Routes = [
  {path:'', redirectTo:'/', pathMatch:'full'},
  {path:'clientes', component: ClientesComponent},
  {path:'cuentas', component: CuentasComponent},
  {path:'movimientos', component: MovimientosComponent},
  {path:'reportes', component: ReportesComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    ClientesComponent,
    MovimientosComponent,
    CuentasComponent,
    ReportesComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
