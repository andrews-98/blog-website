import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { CreatePageComponent } from './create-page/create-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "./shared/services/auth.service";
import {SharedModule} from "../shared/shared.module";
import {AuthQuard} from "./shared/services/auth.quard";
import {QuillEditorComponent} from "ngx-quill";
import { SearchPipe } from './shared/search.pipe';
import { AlertService } from './shared/services/alert.service';
import { AlertComponent } from './shared/alert/alert.component';



@NgModule({
  declarations: [
    AdminLayoutComponent,
    LoginPageComponent,
    DashboardPageComponent,
    CreatePageComponent,
    EditPageComponent,
    SearchPipe,
    AlertComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CommonModule,
    RouterModule.forChild([
      {
        path: '', component: AdminLayoutComponent, children: [
          {path: '', redirectTo: '/admin/login', pathMatch: 'full'},
          {path: 'login', component: LoginPageComponent},
          {path: 'dashboard', component: DashboardPageComponent, canActivate: [AuthQuard]},
          {path: 'create', component: CreatePageComponent, canActivate: [AuthQuard]},
          {path: 'post/:id/edit', component: EditPageComponent, canActivate: [AuthQuard]}
        ]
      }
    ]),
    QuillEditorComponent
  ],
  exports: [RouterModule],
  providers: [ AuthQuard, AlertService]
})
export class AdminModule { }
