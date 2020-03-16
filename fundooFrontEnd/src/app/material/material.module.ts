import { NgModule } from '@angular/core';
import {MatCardModule,MatButtonModule,MatInputModule, MatIconModule, MatSidenavModule, MatToolbarModule, MatDividerModule, MatTooltipModule} from '@angular/material';
import { FormsModule } from '@angular/forms';
// import { FlexLayoutModule } from '@angular/flex-layout';


const MaterialComponents=[
  MatCardModule,
  MatButtonModule,
  MatInputModule,
  MatIconModule,
  MatSidenavModule,
  FormsModule,
  MatToolbarModule,
  MatDividerModule,
  MatTooltipModule
]

@NgModule({
  imports: [ MaterialComponents],
  exports:[MaterialComponents]
})
export class MaterialModule { }
