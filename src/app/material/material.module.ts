import { NgModule } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
@NgModule({
  declarations: [],
  imports: [
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatSlideToggleModule,
    MatInputModule,
    MatFormFieldModule
  ],
  exports:[
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatInputModule,
    MatFormFieldModule
  ]
})
export class MaterialModule { }
