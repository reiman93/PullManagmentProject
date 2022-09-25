import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigServiceService {
  private appConfig!: any;
  private subject = new Subject<any>();

  constructor(private injector: Injector) { }

  loadAppConfig() {
    let http = this.injector.get(HttpClient);
    return http.get('/assets/json/conf.json')
      .pipe(
        map((data: any) => {
          this.appConfig = data;
        })
      );
  }

  get config() {
    return this.appConfig;
  }

  /* updateComponentHeigth(data: number) {
     this.subject.next(data);
   }
   getComponentHeigth(): Observable<number> {
     return this.subject.asObservable();
   }*/
}
