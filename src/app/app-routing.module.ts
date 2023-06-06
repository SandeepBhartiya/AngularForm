import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { StudentTableComponent } from './student-table/student-table.component';
import { StudentFormComponent } from './student-form/student-form.component';
import { StudentTableComponent } from './student-table/student-table.component';
const routes: Routes = [
  {path:'student-table',component:StudentTableComponent},
  {path:'student-form',component:StudentFormComponent},
  { path: 'student-form/edit/:studentId', component: StudentFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
