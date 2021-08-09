import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ClarityModule} from '@clr/angular';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginComponent} from './login/login.component';
import {NotFoundComponent} from './shared/not-found/not-found.component';
import {ListComponent} from "./employee/list/list.component";
import {FormComponent} from "./employee/form/form.component";
import {PopupComponent} from "./shared/popup/popup.component";
import {EmployeeComponent} from "./employee/employee.component";
import {FormsModule} from "@angular/forms";
import {RupiahPipe} from "./employee/_pipe/rupiah.pipe";

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        NotFoundComponent,

        ListComponent,
        FormComponent,
        PopupComponent,
        EmployeeComponent,
        RupiahPipe
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ClarityModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
