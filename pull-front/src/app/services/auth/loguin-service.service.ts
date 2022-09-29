import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../../models/user';
import { IRole, IUser } from '../../interfaces/entity-interfaces';
import * as CryptoJS from 'crypto-js';
import { ConfigServiceService } from '../config-service.service';
import { ISorting } from 'src/app/components/data-grid/component/interface/sorting.interface';
import { ISearchFilter } from 'src/app/components/data-grid/component/interface/search-filter.interface';
import { IPaginateDTO } from 'src/app/components/data-grid/component/interface/paginate.interface';

const bcrypt = require('bcryptjs');
const saltRounds = 10;

const KEY = "gA2W0wXhbSwlaAAF3wtFE/oe5ccrj6i3x8QB+Xe9XFM=";
const IV = " df9fa46af13e5921";


const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Headers': 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE',
  })
};
@Injectable({
  providedIn: 'root'
})
export class LoguinServiceService {

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  hash: any;

  configuration = {
    keySize: 256 / 8,
    iv: CryptoJS.enc.Utf8.parse(IV),
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding
  };
  constructor(private httpClient: HttpClient, private enviroment: ConfigServiceService) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')!));
    this.currentUser = this.currentUserSubject.asObservable();

  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }
  updateSessionStorage(data: any) {
    sessionStorage.setItem('currentUser', JSON.stringify(data));
    let current = JSON.parse(sessionStorage.getItem('currentUser')!);
    this.currentUserSubject.next(current);
  }


  authenticateUser(data: any, service: string): Observable<any> {
    return this.httpClient.post<any>(this.enviroment.config.url + service, {
      username: data.username,
      password: data.password
    }).pipe(map((resp: any) => {
      let foto = resp.foto ? resp.foto : "assets/img/user.png";
      let userData = new User( data.username, resp.access);
      if (resp.success != false) {
        sessionStorage.setItem('currentUser', JSON.stringify(userData));
        this.currentUserSubject.next(userData);
      }
      return userData;
    }));
  }
  registryUser(data: any, service: string): Observable<any> {
    return this.httpClient.post<any>(this.enviroment.config.url + service, {
      username: data.username,
      name: data.name,
      email: data.email,
      phone_number: data.phone,
      password: data.password,
      foto: data.foto,
      departments_id: data.departments_id,
      rols_id: data.rols_id,
    }, httpOptions);
  }

  getUser(username: any, service: string): Observable<any> {
    return this.httpClient.post<any>(this.enviroment.config.url + service, {
      username: username
    }, httpOptions);
  }
  getAllRols(service: string): Observable<any> {
    return this.httpClient.get<any>(this.enviroment.config.url + service, httpOptions);
  }

  updateUser(data: any, service: string): Observable<any> {
    return this.httpClient.post<any>(this.enviroment.config.url + service, data, httpOptions);
  }

  hasRole(role: IRole[]) {
  /*  const matchingRoles = role!.filter(x => this.currentUserValue.role == x);
    if (matchingRoles.length > 0) {
      return true;
    } else {
      return false;
    }*/
  }

  logout() {
    sessionStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
