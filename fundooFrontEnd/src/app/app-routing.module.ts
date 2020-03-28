import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { ChangepasswordComponent } from './components/changepassword/changepassword.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CreatenoteComponent } from './components/createnote/createnote.component';
import { DisplayNotesComponent } from './components/display-notes/display-notes.component';
import {SingleNoteComponent} from './components/single-note/single-note.component';
import { ArchiveComponent } from './components/archive/archive.component';
const routes: Routes = [
  {path:'' ,redirectTo:'/login', pathMatch:'full'},
  {path:'login' ,component:LoginComponent},
  {path:'register',component:RegistrationComponent},
  {path:'forgotPassword',component:ForgotpasswordComponent},
  {path:'changePassword',component:ChangepasswordComponent},
  {path:'dashboard',component:DashboardComponent,
  children:[
     {
       path:'',component:CreatenoteComponent
     },
     {
       path:'createnote',component:CreatenoteComponent
     },
     {
       path:'archive',component:ArchiveComponent
    }
    ]},
   {path:'displaynote',component:DisplayNotesComponent},  
   {path:'singlenote',component:SingleNoteComponent},  
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
  PageNotFoundComponent,
  DashboardComponent,
  CreatenoteComponent,
  DisplayNotesComponent,
  SingleNoteComponent,
  ArchiveComponent
]