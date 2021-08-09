import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AuthGuard} from "./login/_guard/auth.guard";
import {EmployeeComponent} from "./employee/employee.component";
import {LoginComponent} from "./login/login.component";
import {ListComponent} from "./employee/list/list.component";
import {FormComponent} from "./employee/form/form.component";
import {NotFoundComponent} from "./shared/not-found/not-found.component";

const routes: Routes = [
  {
    path: '', component: EmployeeComponent, canActivate: [AuthGuard], children: [
      {path: '', redirectTo: 'list', pathMatch: 'full'},
      {path: 'list', component: ListComponent, data: {breadcrumb: 'List Employee'}},
      {path: 'add', component: FormComponent, data: {breadcrumb: 'Add Employee'}},
      {path: 'edit/:id', component: FormComponent, data: {breadcrumb: 'Edit Employee'}},
      {path: 'detail/:id', component: FormComponent, data: {disabled: true, breadcrumb: 'Detail Employee'}}
    ]
  },
  {path: 'login', component: LoginComponent},
  {path: '404', component: NotFoundComponent},
  {path: '**', redirectTo: '404'}  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
