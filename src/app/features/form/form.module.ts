import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './component/login/login.component';
import { DataComponent } from './component/data/data.component';



@NgModule({
  declarations: [
    LoginComponent,
    DataComponent
  ],
  imports: [
    CommonModule
  ]
})
export class FormModule { }
