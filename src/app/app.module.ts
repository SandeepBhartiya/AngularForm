import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import  {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule }from '@angular/material/form-field';
import {MatInputModule} from   '@angular/material/input';
import {MatIconModule} from '@angular/material/icon'
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { StudentTableComponent } from './student-table/student-table.component';
import { StudentFormComponent } from './student-form/student-form.component';
import { HttpClientModule } from '@angular/common/http';
// import { DataAccessComponent } from './data-access/data-access.component'
// import { Ng2SearchPipeModule } from 'ng2-search-filter';
// import { AgmCoreModule } from '@agm/core/public-api';
@NgModule({
  declarations: [
    AppComponent,
    StudentTableComponent,
    StudentFormComponent,
    // DataAccessComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    BrowserAnimationsModule,
   ReactiveFormsModule,
   HttpClientModule,
   MatIconModule,
   MatDatepickerModule,
   MatNativeDateModule
  //  AgmCoreModule.forRoot({
  //   apiKey:'AIzaSyCbxs7-cC1e5-_49X8vVL14XztvZp_ytkA'
  //  })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
