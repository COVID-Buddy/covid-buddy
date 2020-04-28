import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { LanguageComponent } from './language/language.component';
import { PreTestComponent } from './pre-test/pre-test.component';
import { HomeComponent } from './home/home.component';
import { QuestionsComponent } from './questions/questions.component';
import { FaqComponent } from './faq/faq.component';
import { QrComponent } from './qr/qr.component';
import { EmergencyComponent } from './emergency/emergency.component';
import { ViewQrComponent } from './view-qr/view-qr.component';

// import { ExercisesPage } from './exercises-page/exercises-page';
// import { ExerciseService } from './exercises-page/svc';
// import { AddFieldButtonsComponent } from './exercises-page/add-field-buttons.component';
// import { DropdownComponent } from './exercises-page/dropdown';
// import { ExercisesModule } from './exercises-page/exercises/exercises.module';
// import { GenericFieldComponent } from './exercises-page/field';
// import { GridFieldComponent } from './exercises-page/grid';
// import { InputFieldComponent } from './exercises-page/input';
// import { ListComponent } from './exercises-page/list';
// import { ParagraphComponent } from './exercises-page/paragraph';
// import { RadioComponent } from './exercises-page/radio';
// import { RatingComponent } from './exercises-page/rating';
// import { TableComponent } from './exercises-page/table';
// import { TextareaFieldComponent } from './exercises-page/textarea';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    LanguageComponent,
    PreTestComponent,
    HomeComponent,
    QuestionsComponent,
    FaqComponent,
    QrComponent,
    EmergencyComponent,
    ViewQrComponent,
    // ExercisesPage,
    // GenericFieldComponent,
    // InputFieldComponent,
    // TextareaFieldComponent,
    // GridFieldComponent,
    // ParagraphComponent,
    // DropdownComponent,
    // RadioComponent,
    // TableComponent,
    // RatingComponent,
    // ListComponent,
    // AddFieldButtonsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatToolbarModule,
    MatExpansionModule,
    MatMenuModule,
    MatIconModule,
    MatCheckboxModule,
    MatDividerModule,
  ],
  providers: [
    // ExerciseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
