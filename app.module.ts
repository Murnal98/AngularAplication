import { CalculatorComponent } from './calculator/calculator.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import {HttpClientModule} from '@angular/common/http';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { EmployeeAttendanceComponent } from './employee-attendance/employee-attendance.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {MatMenuModule} from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import {MatSliderModule} from '@angular/material/slider';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import {MatChipsModule} from '@angular/material/chips';
import { PracticeComponent } from './practice/practice.component';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatPaginatorModule } from '@angular/material/paginator';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { DetailsdialogComponent } from './detailsdialog/detailsdialog.component';
import {MatCardModule} from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { NgChartsModule } from 'ng2-charts';
import { LoginComponent } from './login/login.component';
//import { HelloComponent } from './hello.component';



@NgModule({
  declarations:[
    AppComponent,
    HomeComponent,
    PracticeComponent,
    CalculatorComponent,
    EmployeeAttendanceComponent,
    EmployeeDetailsComponent,
    DashboardComponent,
    DetailsdialogComponent,
    LoginComponent,

 ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatSidenavModule,
    MatListModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatCheckboxModule,
    MatDialogModule,
    MatNativeDateModule,
    HttpClientModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatInputModule,
    MatSliderModule,
    MatSnackBarModule,
    MatTableModule,
    MatChipsModule,
    HttpClientModule,
    MatSortModule,
    MatButtonModule,
    FlexLayoutModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatCardModule,
    ReactiveFormsModule,
    MatOptionModule,
    MatSelectModule,
    NgxMatTimepickerModule,
     NgChartsModule,


],

  providers: [],
  bootstrap: [AppComponent],

})
export class AppModule { }
