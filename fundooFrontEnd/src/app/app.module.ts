import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule ,routingComponents} from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrationComponent } from './components/registration/registration.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { ChangepasswordComponent } from './components/changepassword/changepassword.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CreatenoteComponent } from './components/createnote/createnote.component';
import { DisplayNotesComponent } from './components/display-notes/display-notes.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import { SingleNoteComponent } from './components/single-note/single-note.component';
import { NotesComponent } from './components/notes/notes.component';
import { NoteIconComponent } from './components/note-icon/note-icon.component';
import { NotePipe } from './pipes/note.pipe';
import { UpdateNoteComponent } from './components/update-note/update-note.component';
import {MatDialogModule, MatDialog, MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditLabelComponent } from './components/edit-label/edit-label.component';
import { LabelComponent } from './components/label/label.component';
import { CollaboratorComponent } from './components/collaborator/collaborator.component';
@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    RegistrationComponent,
    ForgotpasswordComponent,
    ChangepasswordComponent,
    PageNotFoundComponent,
    DashboardComponent,
    CreatenoteComponent,
    DisplayNotesComponent,
    SingleNoteComponent,
    NotesComponent,
    NoteIconComponent,
    NotePipe,
    UpdateNoteComponent,
    EditLabelComponent,
    LabelComponent,
    CollaboratorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule,
    MatDialogModule
  ],
  providers: [
    { provide: MatDialogRef, useValue: {} },
	{ provide: MAT_DIALOG_DATA, useValue: [] },
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    EditLabelComponent,
    LabelComponent
 ]
})
export class AppModule { }
