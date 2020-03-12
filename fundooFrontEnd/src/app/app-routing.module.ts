import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { ChangepasswordComponent } from './components/changepassword/changepassword.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  {path:'' ,redirectTo:'/login', pathMatch:'full'},
  {path:'login' ,component:LoginComponent},
  {path:'register',component:RegistrationComponent},
  {path:'forgotPassword',component:ForgotpasswordComponent},
  {path:'changePassword',component:ChangepasswordComponent},
  {path:'**',component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents=[
  LoginComponent,
  RegistrationComponent,
  ForgotpasswordComponent,
  ChangepasswordComponent,
  PageNotFoundComponent
]