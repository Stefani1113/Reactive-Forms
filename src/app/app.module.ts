import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms'; 

import { AppComponent } from './app.component';
import { DataComponent } from './features/form/component/data/data.component';
import { LoginComponent } from './features/form/component/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DataComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }