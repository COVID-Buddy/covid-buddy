import { LayoutModule } from '@angular/cdk/layout';
import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '../../app-routing.module';

import { DropdownComponent } from './dropdown';

import { Exercise } from './exercise';
import { ExerciseService } from './exercise.service';
import { GenericFieldComponent } from './field';
import { GridComponent} from './grid';
import { InputComponent } from './input';
import { ListComponent } from './list';
import { RatingExerciseComponent } from './rating';
import { RadioComponent } from './radio';
import { TableComponent } from './table';
import { TextareaComponent } from './textarea';

@NgModule({
  declarations: [
    Exercise,
    GenericFieldComponent,
    TextareaComponent,
    InputComponent,
    GridComponent,
    DropdownComponent,
    RatingExerciseComponent,
    DropdownComponent,
    RadioComponent,
    TableComponent,
    ListComponent,
  ],
  entryComponents: [
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatTableModule,
    CdkTableModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatCheckboxModule,
  ],
  providers: [
    ExerciseService,
  ],
  exports: [
    Exercise,
    GenericFieldComponent,
    TextareaComponent,
    InputComponent,
    GridComponent,
    DropdownComponent,
    RatingExerciseComponent,
    DropdownComponent,
    RadioComponent,
    TableComponent,
    ListComponent,
  ]
})
export class ExercisesModule {
}
