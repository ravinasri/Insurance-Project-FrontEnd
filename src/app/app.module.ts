import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// used to create fake backend
// import { fakeBackendProvider } from './helpers';
import { appRoutingModule } from './app-routing.module';
// import { ErrorInterceptor } from './helpers';
import { AppComponent } from './app.component';
// import {AlertComponent} from './components/alert.component'
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
// import { RegisterComponent } from './register';
import { ServicesComponent } from './services/services.component';
import { ModelsComponent } from './models/models.component';
import { HelpersComponent } from './helpers/helpers.component';
import { ComponentsComponent } from './components/components.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';

import { MatMenuModule } from '@angular/material/menu';
import { MatStepperModule } from '@angular/material/stepper';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatNativeDateModule } from '@angular/material/core';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { helperservice } from './helpers/helper.service'
import { servicesservice } from './services/services.service';
import { componentsservice } from './components/components.service';
// import { AlertService } from './services';
import { loginservice } from './login/login.service';
@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        appRoutingModule,
        BrowserAnimationsModule,
        FontAwesomeModule,
        MatCardModule,
        MatToolbarModule,
        MatMenuModule,
        MatAutocompleteModule,
        FormsModule,
        MatTabsModule,
        MatFormFieldModule,
        MatButtonModule,
        MatSelectModule,
        MatOptionModule,
        MatIconModule,
        MatInputModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatRadioModule,
        MatNativeDateModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        // RegisterComponent,
        ServicesComponent,
        ModelsComponent,
        HelpersComponent,
        ComponentsComponent,
        PagenotfoundComponent,
        // AlertComponent
    ],
    providers: [
        helperservice,
        servicesservice,
        componentsservice,
       
        loginservice,
        // { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
        // fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})
export class AppModule { };
