import { NgModule } from '@angular/core';
import {MatCardModule,MatButtonModule,MatInputModule} from '@angular/material';

const MaterialComponents=[
  MatCardModule,
  MatButtonModule,
  MatInputModule
]

@NgModule({
  imports: [ MaterialComponents],
  exports:[MaterialComponents]
})
export class MaterialModule { }
