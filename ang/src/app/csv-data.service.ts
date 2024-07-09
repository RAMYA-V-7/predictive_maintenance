import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CsvDataService {

  
  private apiUrl = 'http://127.0.0.1:5000/prediction';

  constructor(private http: HttpClient) { }

  getNextRow(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
