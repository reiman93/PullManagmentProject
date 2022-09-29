import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IPaginateDTO } from '../components/data-grid/component/interface/paginate.interface';
import { ISearchFilter } from '../components/data-grid/component/interface/search-filter.interface';
import { ISorting } from '../components/data-grid/component/interface/sorting.interface';
import { INomenclators } from '../interfaces/entity-interfaces';
import { ConfigServiceService } from './config-service.service';

@Injectable({
  providedIn: 'root'
})
export class PollService {

  constructor(private httpClient: HttpClient, private enviroment: ConfigServiceService) { }

  createPoll(data: any, service: string): Observable<any> {
    return this.httpClient.post<any>(this.enviroment.config.url + service, data);
  }
  editPoll(data: any, service: string): Observable<any> {
    return this.httpClient.put<any>(this.enviroment.config.url + service, data);
  }
  markPoll(data: any, service: string): Observable<any> {
    return this.httpClient.post<any>(this.enviroment.config.url + service, data);
  }

  deleteMany(ids: any, service: string): Observable<any> {
    return this.httpClient.post<any>(this.enviroment.config.url + service, { ids }).pipe(map((resp: any) => {
      return resp;
    }));
  }

  getAll(service: string): Observable<any> {
    return this.httpClient.get<any>(this.enviroment.config.url + service);
  }
  getById(service: string, id: any): Observable<any> {
    return this.httpClient.get<any>(this.enviroment.config.url + service + "/" + id + "/");
  }
  getOptsById(service: string, id: any): Observable<any> {
    return this.httpClient.get<any>(this.enviroment.config.url + service + "/" + id);
  }
  getPerOpts(service: string): Observable<any> {
    return this.httpClient.get<any>(this.enviroment.config.url + service);
  }
}
