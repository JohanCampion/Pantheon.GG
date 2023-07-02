import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "./shared/shared.module";
import { HomeComponent } from './components/home/home.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {HttpInterceptorInterceptor} from "./services/http-interceptor.interceptor";
import { TournoisComponent } from './components/tournois/tournois.component';
import { TournoisCreateComponent } from './components/tournois/tournois-create/tournois-create.component';
import {MatInputModule} from "@angular/material/input";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatButtonModule} from "@angular/material/button";
import { TournoiConsultationComponent } from './components/tournois/tournoi-consultation/tournoi-consultation.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TournoisComponent,
    TournoisCreateComponent,
    TournoiConsultationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    HttpClientModule,
    MatIconModule,
    MatListModule,
    MatCheckboxModule,
    FormsModule,
    SharedModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatButtonModule
  ],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
