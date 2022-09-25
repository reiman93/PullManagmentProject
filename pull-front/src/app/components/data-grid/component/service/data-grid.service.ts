import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DataGridService {

  private dataGridSubject: BehaviorSubject<any>;
  public dataGrid: Observable<any>;

  constructor(private httpClient: HttpClient) {
    this.dataGridSubject = new BehaviorSubject<any>(true);
    this.dataGrid = this.dataGridSubject.asObservable();
  }
  //      
  sendData(data: any) {
    this.dataGridSubject.next(data);
  }
}
