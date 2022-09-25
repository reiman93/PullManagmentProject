import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from './models/user';
import { LoguinServiceService } from './services/auth/loguin-service.service';
import { VERSION } from '@angular/material/core';


declare var $: any;
declare function PerfectScrollbar(parm: any): any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy, OnInit{
    title = 'QASystem';
    version = VERSION;
    currentUser !: User;
    constructor(private authenticationService: LoguinServiceService, private router: Router,) {
        this.authenticationService.currentUser.subscribe((x: User) => this.currentUser = x);
    }
    ngOnInit(): void {
      /*  PerfectScrollbar(".header-notifications-list");
        PerfectScrollbar(".header-message-list");*/
    }
    
    ngOnDestroy() {
        this.authenticationService.logout();
        this.router.navigate(['/auth']);
    }
    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/auth']);
    }
    register() {
        console.warn("entra aki????")
        this.router.navigate(['/register']);
    }
}
