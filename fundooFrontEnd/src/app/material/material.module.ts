import { NgModule } from '@angular/core';
import {MatCardModule,MatButtonModule,MatInputModule, MatIconModule} from '@angular/material';

const MaterialComponents=[
  MatCardModule,
  MatButtonModule,
  MatInputModule,
  MatIconModule
]

@NgModule({
  imports: [ MaterialComponents],
  exports:[MaterialComponents]
})
export class MaterialModule { }
