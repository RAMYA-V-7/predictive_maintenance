import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { PredictionComponent } from './prediction/prediction.component';
import {RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PredictionResultComponent } from './prediction-result/prediction-result.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { NgxGaugeModule } from 'ngx-gauge';
import { ConfigurationComponent } from './configuration/configuration.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import {MatIconModule} from '@angular/material/icon';

// Define route

// const routes:Routes=[
//   {path:'',component:HomeComponent},
//   {path:'Home',component:HomeComponent},
//   {path:'Prediction',component:PredictionComponent},
//   {path:'PredictionResult',component:PredictionResultComponent}
// ]

// const config: SocketIoConfig = { url: 'http://127.0.0.1:5000', options: { transports: ['websocket'] } };

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    PredictionComponent,
    PredictionResultComponent,
    ConfigurationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // RouterModule.forRoot(routes),
    RouterModule,
    HttpClientModule,
    FormsModule,
    NgxGaugeModule,
    FontAwesomeModule,
    MatSnackBarModule,
    MatIconModule
    // SocketIoModule.forRoot(config)
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
