import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject ,NgZone,Renderer2,ElementRef, AfterViewInit, viewChild, ViewChild} from '@angular/core';
import { SocketService } from '../socket.service';
import { Socket } from 'ngx-socket-io';
import { CsvDataService } from '../csv-data.service';
import { NgxGaugeType } from 'ngx-gauge/gauge/gauge';
import { faXmark,faCircleExclamation} from '@fortawesome/free-solid-svg-icons';
import emailjs,  {EmailJSResponseStatus } from 'emailjs-com';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { ConfigurationComponent } from '../configuration/configuration.component';
import { PredictionComponent } from '../prediction/prediction.component';

interface PredictionResponse {
  priority: string;
  failure_type: string;
  maintenance_time: string;
}

@Component({
  selector: 'app-prediction-result',
  templateUrl: './prediction-result.component.html',
  styleUrl: './prediction-result.component.css'
})
export class PredictionResultComponent implements AfterViewInit {

  // http: HttpClient = inject(HttpClient)
  priority: any
  failure_type: any
  // days_for_maintenance: number = 0
  days_for_maintenance:any
  reading_time:any
  reading_date:any
  predictions: PredictionResponse[] = [];
  xmarkIcon=faXmark;
  circleImportantIcon=faCircleExclamation

  // constructor(private socketService: SocketService) {}
  constructor(private csvDataService: CsvDataService,private http: HttpClient, private zone: NgZone,private el: ElementRef, private renderer: Renderer2,private snackBar: MatSnackBar) { 
   
   }
  
  response: any
  latestFiveFailure:any[]=[]

  airTempgaugeValue: number = 0;
  airTempgaugeLabel = "Air Temp";
  airTempgaugeAppendText = "K";
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



  ngOnInit() {
    this.getMaintenanceData();
  }

  ngAfterViewInit() {
    this.setGaugeValueStyle();
  }

  

  getMaintenanceData() {
    const eventSource = new EventSource('http://localhost:5001/stream');

    eventSource.onmessage = (event) => {
      this.zone.run(() => {
        // console.log(event)
        this.response = JSON.parse(event.data);
        console.log(this.response);
        
        const failureEntry = {
          air_temperature:parseInt(this.response["Air temperature"]),
          process_temperature:parseInt(this.response["Process temperature"]),
          rotational_speed:parseInt(this.response["Rotational speed"]),
          torque:parseInt(this.response["Torque"]),
          tool_wear:parseInt(this.response["Tool wear"]),
          failure_type: this.response["failure_type"],
          priority: this.response["priority"],
          reading_date: this.response["DateTime"],
          reading_time: this.response["Reading time"],
          days_for_maintenance: this.response["maintenance_time"],
          notified:'Ali'
        };

        this.failure_type=this.response["failure_type"]
        this.priority=this.response["priority"]
        this.reading_date=this.response["DateTime"]
        this.reading_time=this.response["Reading time"]
        this.days_for_maintenance=this.response["maintenance_time"]


        if(this.response["failure_type"]!=="No Failure"){
            this.latestFiveFailure.unshift(failureEntry)
        }

        if (this.latestFiveFailure.length > 10) {
          this.latestFiveFailure.pop();
        }

        console.log(this.latestFiveFailure)
        
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

        if(this.failure_type!=="No Failure"){
          this.sendFailureEmail(this.failure_type,this.priority,this.reading_date,this.reading_time,this.days_for_maintenance)
        }


      });
    };

    eventSource.onerror = (error) => {
      console.error('EventSource failed:', error);
      eventSource.close();
    };
  }

  setGaugeValueStyle() {
    // const gaugeValueElement = this.el.nativeElement.querySelectorAll('.reading-block');
    // if (gaugeValueElement) {
    //   this.renderer.setStyle(gaugeValueElement, 'font-size', '24px');
    //   this.renderer.setStyle(gaugeValueElement, 'color', 'blue');
    // }

    this.el.nativeElement.querySelectorAll(".reading-block").forEach((element:any)=>{

      if(element){
        this.renderer.setStyle(element,"font-size",'30px')
      }

    })
  }

  overallContainer:any
  failureTable:any

  blurFunction(){
      this.overallContainer=document.getElementById("prediction-overall-container-id")
      this.overallContainer.classList.toggle('active')
      this.failureTable=this.el.nativeElement.querySelector(".failure-table")
      this.failureTable.style.visibility="visible"
      this.failureTable.style.opacity=1
      // this.failureTable.style.background="white"
      console.log(this.failureTable)    
    // this.overallContainer=this.el.nativeElement.getElementById("prediction-overall-container-id")
    // console.log(this.overallContainer)
  }

  failureTableClose(){
    this.overallContainer=document.getElementById("prediction-overall-container-id")
    this.overallContainer.classList.toggle('active')
    this.failureTable=this.el.nativeElement.querySelector(".failure-table")
    this.failureTable.style.visibility="hidden"
    this.failureTable.style.opacity=0
  }

  // sendFailureEmail(index: number, date: string, timestamp: string, cameraNumber: number, cameraName: string, factoryNumber: number, newImage: string, modelImage: string)


  sendFailureEmail(failure_type:string,priority:string,date:string,time:string,maintenance_date:string) {
    let subject = '';
    let body = '';
 
    // if (index === 0 || index === 3) {
    //   subject = 'Fire is detected';
    //   body = `There is a confirmed Fire detected in Camera Number: ${cameraNumber}, Factory Number: ${factoryNumber} on ${date} at ${timestamp}, Please take immediate actions`;
    //   this.snackBar.open('Email sent to the Supervisor - Fire emergency', 'Close', { duration: 7000  });
    // } else if (index === 6 || index === 7) {
    //   subject = 'No helmet is detected';
    //   body = `Please ensure all personnel are wearing helmets . Incident detected in Camera Number: ${cameraNumber}, Factory Number: ${factoryNumber} on ${date} at ${timestamp}`;
    //   this.snackBar.open('Email sent to the Supervisor - Please ensure all personnel are wearing helmets.', 'Close', { duration: 7000});
    // }

    if(failure_type!=="No Failure"){
      console.log("failure")
      // subject=failure_type +"Occurs"
      subject=`FAILURE ALERT`
      body=`We would like to inform you of a maintenance issue that requires your attention: ${failure_type} with a priority of ${priority} was reported on ${date} at ${time} and is scheduled for maintenance on ${maintenance_date}.`
      console.log(body)
      // if (PredictionResultComponent) {
      //   this.snackBar.open(`Email sent to the Supervisor - ${failure_type}`, 'Close', {
      //     duration: 5000,
      //     verticalPosition: 'top',
      //     horizontalPosition: 'center'
      //   });
      // }
      // this.snackBar.open(`Email sent to the Supervisor -${failure_type} `,'Close',{duration:5000,verticalPosition:'top',horizontalPosition:'center'});
    }  
    const emailParams = {
      to_name: `Ali`,
      from_name: 'Maintenance Team',
      subject: subject,
      message: body,
    };
 
    // emailjs.send('service_owhkjrp', 'template_jwy1y6q', emailParams, '9p3rVZISgBlykKMab')
    //   .then((response: EmailJSResponseStatus) => {
    //     console.log('Email successfully sent!', response.status, response.text);
    //   }, (error) => {
    //     console.error('Failed to send email. Error:', error);
    //   });
  }
}

  









