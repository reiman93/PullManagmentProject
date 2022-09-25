import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import conf from '../../../assets/json/conf.json';

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Headers': 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE',
  })
};


import { IAction } from './../../interfaces/entity-interfaces';
import { IPaginateDTO } from './../../components/data-grid/component/interface/paginate.interface';
import { ISearchFilter } from './../../components/data-grid/component/interface/search-filter.interface';
import { ISorting } from './../../components/data-grid/component/interface/sorting.interface';
import { ConfigServiceService } from "../config-service.service";

@Injectable({
  providedIn: 'root',
})
export class ActionsService {
  url = conf.url;
  constructor(private httpClient: HttpClient,private enviroment: ConfigServiceService) { }

  findAllPagination(
    skip?: number,
    take?: number | undefined,
    sort?: ISorting | undefined,
    dataFilter?: ISearchFilter[],
  ): Observable<unknown> {
    const page: IPaginateDTO = {
      skip: skip,
      take: take,
      sortField: sort,
      orSearchFields: dataFilter,
      select: [],
    };
    return this.httpClient.post<any>( this.enviroment.config.url + 'storeRelapseAction',
      page).pipe(map((data): unknown => {
        return (
          data.data as {
            action: IAction[];
          }
        ).action;
      }))
  }

  getAll(service: string): Observable<any> {
    return this.httpClient.get<any>( this.enviroment.config.url + service, httpOptions).pipe(map((resp: any) => {
      return resp;
    }));
  }
  get(id: any, service: string): Observable<any> {
    return this.httpClient.get<any>( this.enviroment.config.url + service + '/' + id, httpOptions).pipe(map((resp: any) => {
      return resp;
    }));
  }
  create(data: any, service: string): Observable<any> {
    return this.httpClient.post<any>( this.enviroment.config.url + service, {
      name: data.name,
      description: data.description
    }, httpOptions).pipe(map((resp: any) => {
      return resp;
    }));
  }
  update(data: any, service: string): Observable<any> {
    return this.httpClient.put<any>( this.enviroment.config.url + service + '/' + data.id, {
      name: data.name,
      description: data.description
    }, httpOptions).pipe(map((resp: any) => {
      return resp;
    }));
  }

  delete(data: any, service: string): Observable<any> {
    return this.httpClient.delete<any>( this.enviroment.config.url + service + '/' + data[0], httpOptions).pipe(map((resp: any) => {
      return resp;
    }));
  }
  
  deleteMany(ids: any, service: string): Observable<any> {
    return this.httpClient.post<any>( this.enviroment.config.url + service, { ids }, httpOptions).pipe(map((resp: any) => {
      return resp;
    }));
  }
}

