import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './component/login/login.component';
import { DataComponent } from './component/data/data.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LoginComponent,
    DataComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule // importo modulo de formularios reactivos
  ]
})
export class FormModule { }
