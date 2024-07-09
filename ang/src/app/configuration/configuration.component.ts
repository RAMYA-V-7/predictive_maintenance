import { HttpClient } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, NgZone, OnInit, Renderer2, inject } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { FormDataService } from '../form-data.service';
import { NgxGaugeType } from 'ngx-gauge/gauge/gauge';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrl: './configuration.component.css'
})
export class ConfigurationComponent implements OnInit {
  isConfigVisible = false;
  isFormSubmitted = false;
  formData = {
    'air-temperature-min':0,
    'air-temperature-max':0,
    'process-temperature-min': 0,
    'process-temperature-max': 0,
    'rotational-speed-min': 0,
    'rotational-speed-max': 0,
    'torque-min': 0,
    'torque-max': 0,
    'toolwear-min': 0,
    'toolwear-max': 0
  };
  displayedData: any[] = [];
  currentPage = 0;
 
  toggleConfigVisibility() {
    this.isConfigVisible = !this.isConfigVisible;
  }
  // fontawesome
  warningIcon=faTriangleExclamation;
 
  priority: any
  failure_type: any
  // days_for_maintenance: number = 0
  days_for_maintenance:any
  reading_time:any
  reading_date:any
  response: any
  latestFiveFailure:any[]=[]
 
  // title = 'temperature-meter';
  airTempgaugeValue: number = 0;
  airTempgaugeLabel = "Air Temp";
  airTempgaugeAppendText = "K";
  // gaugeType = "semi";
  airTempgaugeType: NgxGaugeType = 'arch';
  airTempgaugeMinValue: number = 0;
  airTempgaugeMaxValue: number = 500;
  airTempthresholdConfig = {
    '0': {color: 'green'},
    '100': {color: 'orange'},
    '250': {color: 'red'}
  };
 
  airTempmarkers={ "0": { color: "#555", type: "line", size: 10, label: "0", font: "12px arial" } ,
      "125":{color: "#555", type: "line", size: 10, label: "125", font: "12px arial"},
 
      "250": { color: "#555", type: "line", size: 10, label: "250", font: "12px arial" },
 
      "375": { color: "#555", type: "line", size: 10, label: "375", font: "12px arial" },
 
      "500":{color: "#555", type: "line", size: 10, label: "500", font: "12px arial"}
 
  }
 
 
 
 
 
 
 
 
  // title = 'temperature-meter';
  processTempgaugeValue: number = 0;
  processTempgaugeLabel = "Process Temp";
  processTempgaugeAppendText = "K";
  processTempgaugeType: NgxGaugeType = 'arch';
  processTempgaugeMinValue: number = 0;
  processTempgaugeMaxValue: number = 500;
  processTempthresholdConfig = {
    '0': {color: 'green'},
    '100': {color: 'orange'},
    '250': {color: 'red'}
  };
 
 
  processTempmarkers={ "0": { color: "#555", type: "line", size: 10, label: "0", font: "12px arial" } ,
      "125":{color: "#555", type: "line", size: 10, label: "125", font: "12px arial"},
 
      "250": { color: "#555", type: "line", size: 10, label: "250", font: "12px arial" },
 
      "375": { color: "#555", type: "line", size: 10, label: "375", font: "12px arial" },
 
      "500":{color: "#555", type: "line", size: 10, label: "500", font: "12px arial"}
 
  }
 
 
 
 
 
  rotationalSpeedgaugeValue: number = 0;
  rotationalSpeedgaugeLabel = "Rotational Speed";
  rotationalSpeedgaugeAppendText = "RPM";
  rotationalSpeedgaugeType: NgxGaugeType = 'arch';
  rotationalSpeedgaugeMinValue: number = 0;
  rotationalSpeedgaugeMaxValue: number = 3000;
  rotationalSpeedthresholdConfig = {
    '0': {color: 'green'},
    '1150': {color: 'orange'},
    '2000': {color: 'red'}
  };
 
 
  rotationalSpeedmarkers={ "0": { color: "#555", type: "line", size: 10, label: "0", font: "12px arial" } ,
      "750":{color: "#555", type: "line", size: 10, label: "750", font: "12px arial"},
 
      "1500": { color: "#555", type: "line", size: 10, label: "1500", font: "12px arial" },
 
      "2250": { color: "#555", type: "line", size: 10, label: "2250", font: "12px arial" },
 
      "3000":{color: "#555", type: "line", size: 10, label: "3000", font: "12px arial"}
 
  }
 
 
  torquegaugeValue: number = 0;
  torquegaugeLabel = "Torque";
  torquegaugeAppendText = "Nm";
  torquegaugeType: NgxGaugeType = 'arch';
  torquegaugeMinValue: number = 0;
  torquegaugeMaxValue: number = 100;
  torquethresholdConfig = {
    '0': {color: 'green'},
    '30': {color: 'orange'},
    '50': {color: 'red'}
  };
 
 
  torquemarkers={ "0": { color: "#555", type: "line", size: 10, label: "0", font: "12px arial" } ,
  "25":{color: "#555", type: "line", size: 10, label: "25", font: "12px arial"},
 
  "50": { color: "#555", type: "line", size: 10, label: "50", font: "12px arial" },
 
  "75": { color: "#555", type: "line", size: 10, label: "75", font: "12px arial" },
 
  "100":{color: "#555", type: "line", size: 10, label: "100", font: "12px arial"}
 
}
 
 
toolWeargaugeValue: number = 0;
toolWeargaugeLabel = "Voltage";
toolWeargaugeAppendText = "V";
toolWeargaugeType: NgxGaugeType = 'arch';
toolWeargaugeMinValue: number = 0;
toolWeargaugeMaxValue: number = 300;
toolWearthresholdConfig = {
  '0': {color: 'green'},
  '60': {color: 'orange'},
  '100': {color: 'red'}
};
 
 
  toolWearmarkers={ "0": { color: "#555", type: "line", size: 10, label: "0", font: "12px arial" } ,
  "75":{color: "#555", type: "line", size: 10, label: "75", font: "12px arial"},
 
  "150": { color: "#555", type: "line", size: 10, label: "150", font: "12px arial" },
 
  "225": { color: "#555", type: "line", size: 10, label: "225", font: "12px arial" },
 
  "300":{color: "#555", type: "line", size: 10, label: "300", font: "12px arial"}
 
}
 
 
 
 
 
 
 
 
 
  defaultValues: any = {
    'air-temperature-min': 0,
    'air-temperature-max': 100,
    'process-temperature-min': 0,
    'process-temperature-max': 100,
    'rotational-speed-min': 0,
    'rotational-speed-max': 100,
    'torque-min': 0,
    'torque-max': 100,
    'toolwear-min': 0,
    'toolwear-max': 100
  };
 
  constructor(private formDataService: FormDataService,private zone: NgZone,private el: ElementRef, private renderer: Renderer2) {
   
  }
 
  ngOnInit() {
    const savedFormData = this.formDataService.getFormData();
    this.formData = savedFormData ? savedFormData : { ...this.defaultValues };
  }
 
 
  ngAfterViewInit() {
    this.setGaugeValueStyle();
  }
 
 
 
  // response: any
 
  getMaintenanceData() {
    const eventSource = new EventSource('http://localhost:5001/streamConfig');
    eventSource.onmessage = (event) => {
      this.zone.run(() => {
        console.log(event)
        this.response = JSON.parse(event.data);
        console.log(this.response['alerts']);
 
 
        const failureEntry = {
          air_temperature:parseInt(this.response["Air temperature"]),
          process_temperature:parseInt(this.response["Process temperature"]),
          rotational_speed:parseInt(this.response["Rotational speed"]),
          torque:parseInt(this.response["Torque"]),
          tool_wear:parseInt(this.response["Tool wear"]),
          // failure_type: this.response["failure_type"],
          // priority: this.response["priority"],
          reading_date: this.response["DateTime"],
          reading_time: this.response["Reading time"],
          // days_for_maintenance: this.response["maintenance_time"]
        };
 
        // this.failure_type=this.response["failure_type"]
        // this.priority=this.response["priority"]
        this.reading_date=this.response["DateTime"]
        this.reading_time=this.response["Reading time"]
        // this.days_for_maintenance=this.response["maintenance_time"]
 
 
        if(this.response["failure_type"]!=="No Failure"){
            this.latestFiveFailure.unshift(failureEntry)
        }
 
        if (this.latestFiveFailure.length > 10) {
          this.latestFiveFailure.pop();
        }
 
        console.log(this.latestFiveFailure);
 
 
 
        if (this.response && this.response["Air temperature"]) {
          this.airTempgaugeValue = parseInt(this.response["Air temperature"]);
        }
 
        if(this.response && this.response["Process temperature"]){
          this.processTempgaugeValue=parseInt(this.response["Process temperature"])
        }
 
        if(this.response && this.response["Rotational speed"]){
          this.rotationalSpeedgaugeValue=parseInt(this.response["Rotational speed"])
        }
 
        if(this.response && this.response["Torque"]){
          this.torquegaugeValue=parseInt(this.response["Torque"])
        }
 
        if(this.response && this.response["Tool wear"]){
          this.toolWeargaugeValue=parseInt(this.response["Tool wear"])
        }
 
 
 
      });
    };
  }
 
 
  http:HttpClient=inject(HttpClient)
  onFormSubmitted(form: NgForm) {
    console.log(form.value);
    this.http.post("http://127.0.0.1:5001/config",form.value).subscribe((res:any)=>{
      console.log(res)
      this.setGaugeValueStyle();
    })
    this.formDataService.setFormData(form.value);
 
    this.getMaintenanceData()
    if (form.valid) {
      this.displayedData = [
        { label: 'Air Temp Min', value: this.formData['air-temperature-min'] },
        { label: 'Air Temp Min', value: this.formData['air-temperature-max'] },
        { label: 'Process Temp Min', value: this.formData['process-temperature-min'] },
        { label: 'Process Temp Max', value: this.formData['process-temperature-max'] },
        { label: 'Rotational Speed Min', value: this.formData['rotational-speed-min'] },
        { label: 'Rotational Speed Max', value: this.formData['rotational-speed-max'] },
        { label: 'Torque Min', value: this.formData['torque-min'] },
        { label: 'Torque Max', value: this.formData['torque-max'] },
        { label: 'Voltage Min', value: this.formData['toolwear-min'] },
        { label: 'Voltage Max', value: this.formData['toolwear-max'] }
      ];
      this.isConfigVisible = false;
      this.isFormSubmitted = true;
    }
  
  }
 
  setGaugeValueStyle() {
   
    this.el.nativeElement.querySelectorAll(".reading-block").forEach((element:any)=>{
 
      if(element){
        this.renderer.setStyle(element,"font-size",'30px')
      }
 
    })
  }
 

 
  navigate(direction: string) {
    if (direction === 'next' && this.currentPage < 1) {
      this.currentPage++;
    } else if (direction === 'prev' && this.currentPage > 0) {
      this.currentPage--;
    }
  }
 
  get displayedValues() {
    const startIndex = this.currentPage * 3;
    return this.displayedData.slice(startIndex, startIndex + 3);
  }
 
 
 
}
 