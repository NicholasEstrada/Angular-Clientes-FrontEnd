import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ServicoPrestadoRoutingModule } from './servico-prestado-routing.module';
import { ServicoPrestadoFormComponent } from './servico-prestado-form/servico-prestado-form.component';
import { ServicoPrestadoListaComponent } from './servico-prestado-lista/servico-prestado-lista.component';
import { RouterModule } from '@angular/router';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import {Component} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {NativeDateAdapter} from '@angular/material/core';



@NgModule({
  declarations: [
    ServicoPrestadoFormComponent,
    ServicoPrestadoListaComponent
  ],
  imports: [
    CommonModule,
    ServicoPrestadoRoutingModule,
    FormsModule,
    RouterModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule
  ],
  exports: [
    ServicoPrestadoFormComponent,
    ServicoPrestadoListaComponent
  ]
})
export class ServicoPrestadoModule { }
