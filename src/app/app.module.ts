import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import { ChartsModule } from 'ng2-charts';
import {MatDialogModule} from '@angular/material/dialog';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatSliderModule} from '@angular/material/slider';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserDataService } from "./user-data.service";
import { MainPageComponent, DialogIncome, DialogExpense, DialogTransaction } from './main-page/main-page.component';
import { PieChartComponent } from './charts/pie-chart/pie-chart.component';
import { HistoryComponent } from './history/history.component';
import { AccountsComponent, DialogCreate } from './accounts/accounts.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { BarChartComponent } from './charts/bar-chart/bar-chart.component';
import { AuthorizationService } from "./auth/authorization.service";

import { AuthInterceptor } from "./auth/auth.interceptor";
import { RegistrationService } from "./auth/registration.service";
import { AccountService } from "./services/account.service";
import { OperationService } from "./services/operation.service";
import {ToastrModule} from "ngx-toastr";
import {AppHttpInterceptor} from "./errors/http.interceptor";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainPageComponent,
    DialogIncome,
    DialogExpense,
    DialogTransaction,
    PieChartComponent,
    HistoryComponent,
    AccountsComponent,
    DialogCreate,
    AboutUsComponent,
    ProfileComponent,
    SettingsComponent,
    SignInComponent,
    SignUpComponent,
    BarChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatIconModule,
    ChartsModule,
    MatDialogModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSliderModule,
    MatTabsModule,
    MatTableModule,
    MatButtonModule,
    MatGridListModule,
    MatRadioModule,
    MatSelectModule,
    HttpClientModule,
    ToastrModule.forRoot()
  ],
  providers: [
    UserDataService,
    AuthorizationService,
    RegistrationService,
    AccountService,
    OperationService,

    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
