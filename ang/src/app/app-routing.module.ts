import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PredictionComponent } from './prediction/prediction.component';
import { PredictionResultComponent } from './prediction-result/prediction-result.component';
import { ConfigurationComponent } from './configuration/configuration.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'Home',component:HomeComponent},
  {path:'Config',component:ConfigurationComponent},
  {path:'Prediction',component:PredictionComponent},
  {path:'PredictionResult',component:PredictionResultComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
