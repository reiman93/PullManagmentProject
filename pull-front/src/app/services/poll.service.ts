import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigServiceService } from './config-service.service';

@Injectable({
  providedIn: 'root'
})
export class PollService {

  constructor(private httpClient: HttpClient,private enviroment: ConfigServiceService) { }

  createPoll(data: any, service: string): Observable<any> {
    return this.httpClient.post<any>(this.enviroment.config.url + service, data);
  }
}
