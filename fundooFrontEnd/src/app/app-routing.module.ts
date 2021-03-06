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
import {NotesComponent} from './components/notes/notes.component';
import { UpdateNoteComponent } from './components/update-note/update-note.component';
import { NoteIconComponent } from './components/note-icon/note-icon.component';

const routes: Routes = [
  {path:'' ,redirectTo:'/login', pathMatch:'full'},
  {path:'login' ,component:LoginComponent},
  {path:'register',component:RegistrationComponent},
  {path:'forgotPassword',component:ForgotpasswordComponent},
  {path:'changePassword',component:ChangepasswordComponent},
  {path:'dashboard',component:DashboardComponent,
  children:[
  
     {
      path:'',component:DisplayNotesComponent
     }, 
     {
       path:'createnote',component:CreatenoteComponent
     },
     
     {
      path:'displaynote',component:DisplayNotesComponent
     },
     {
       path:':note',component:DisplayNotesComponent
    },
    {path:'singlenote',component:SingleNoteComponent},  
    ]},
   
    // {path:'note',component:NotesComponent},
   {path:'updatenote',component:UpdateNoteComponent},
   {path:'singlenote',component:SingleNoteComponent},  
   {path:'noteicon',component:NoteIconComponent},
  {path:'**',component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{onSameUrlNavigation:'reload'})],
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
  NotesComponent
]