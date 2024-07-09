import { Component, OnInit, ViewChild } from '@angular/core';
import { PredictionResultComponent } from './prediction-result/prediction-result.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Predictive-Maintenance';
  @ViewChild(PredictionResultComponent) predResultComp: any

  ngOnInit(): void {
      this.predResultComp.getMaintenanceData()
  }
}


