import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import{ MatInputModule}  from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatStepperModule} from '@angular/material/stepper';
import {StepperOrientation} from '@angular/material/stepper';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';

const matrtialComponents=[
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatRadioModule,
  MatStepperModule,
  MatTableModule,
  MatCardModule

]
@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports:[matrtialComponents]
})
export class MaterialModule { }
