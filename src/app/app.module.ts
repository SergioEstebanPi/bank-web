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
import { FormsModule } from '@angular/forms';
import { FormComponent as ClienteFormComponent } from './clientes/form.component';
import { FormComponent as CuentaFormComponent } from './cuentas/form.component';
import { FormComponent as MovimientoFormComponent } from './movimientos/form.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MomentDateModule } from '@angular/material-moment-adapter';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { SearchPipe } from './search.pipe';
import { SidebarComponent } from './sidebar/sidebar.component';
   
export const MY_DATE_FORMATS = {
    parse: {
      dateInput: 'YYYY-MM-DD',
    },
    display: {
      dateInput: 'YYYY-MM-DD',
      monthYearLabel: 'MMMM YYYY',
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'MMMM YYYY'
    },
};

const routes:Routes = [
  {path:'', redirectTo:'/', pathMatch:'full'},
  {path:'clientes', component: ClientesComponent},
  {path:'clientes/form', component: ClienteFormComponent},
  {path:'clientes/form/:id', component: ClienteFormComponent},
  {path:'cuentas', component: CuentasComponent},
  {path:'cuentas/form', component: CuentaFormComponent},
  {path:'cuentas/form/:id', component: CuentaFormComponent},
  {path:'movimientos', component: MovimientosComponent},
  {path:'movimientos/form', component: MovimientoFormComponent},
  {path:'movimientos/form/:id', component: MovimientoFormComponent},
  {path:'reportes', component: ReportesComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    ClientesComponent,
    MovimientosComponent,
    CuentasComponent,
    ReportesComponent,
    HeaderComponent,
    FooterComponent,
    ClienteFormComponent,
    CuentaFormComponent,
    MovimientoFormComponent,
    SearchPipe,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MomentDateModule,
    ReactiveFormsModule,
    MatSelectModule
  ],
  providers: [
    provideAnimations(),
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
