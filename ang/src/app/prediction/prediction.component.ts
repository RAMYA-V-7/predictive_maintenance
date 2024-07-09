import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';

interface PredictionResponse {
  priority: string;
  failure_type: string;
  maintenance_time: string;
}

@Component({
  selector: 'app-prediction',
  templateUrl: './prediction.component.html',
  styleUrl: './prediction.component.css'
})
export class PredictionComponent implements OnInit {
  // constructor(private route: Router,private socket: Socket){
  // }
  constructor(private route:Router){}
  

  display:boolean=false
  http:HttpClient=inject(HttpClient)
  predictions: PredictionResponse[] = [];
  rows: any[] = [];


  onFormSubmitted(form:NgForm){
    console.log(form.value)
    // this.http.post("http://127.0.0.1:5000/prediction",form.value).subscribe((res)=>{
    //     //  console.log(res)
         this.route.navigate(['PredictionResult'])
    // })
    // this.route.navigate(['PredictionResult'])
    // this.socket.on('new_prediction', (data: PredictionResponse) => {
    //   console.log('Received new prediction:', data);
    //   this.predictions.push(data);
    // });

    // this.socket.fromEvent("detail").subscribe((res)=>{
    //   console.log(res)
    // })

      //  this.http.get("http://127.0.0.1:5000/prediction").subscribe((res:any)=>{
      //     console.log(res)
      //     this.rows.push(res)
      //  })

    

  }

  ngOnInit(): void {
      
  }

}
