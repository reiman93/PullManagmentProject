import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule, EVENT_MANAGER_PLUGINS } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { APP_BASE_HREF, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';



import { JwtInterceptor } from './_helpers/jwt-interceptor';
import { ErrorInterceptor } from './_helpers/header-interceptor';
import { LoguinServiceService } from './services/auth/loguin-service.service';


import { MenuItems } from './components/menu-items/menu-items';
import { NavService } from './components/sidebar/menu-list-item/nav.service';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DialogBasicModule } from './components/dialog-basic/dialog-basic.component';
import { DialogFormModule } from './components/dialog-form/dialog-form.component';
import { MatNativeDateModule } from '@angular/material/core';
import { ConfigServiceService } from './services/config-service.service';


const appInitializerFn = (appConfig: ConfigServiceService) => {
    return () => {
        return appConfig.loadAppConfig();
    }
};
@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatSnackBarModule,
        DialogBasicModule,
        DialogFormModule,
        MatNativeDateModule,
    ],
    providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }, { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        LoguinServiceService,
        MenuItems,
        NavService,
        HttpClientModule, { provide: APP_BASE_HREF, useValue: '/' }, { provide: LocationStrategy, useClass: HashLocationStrategy },
        ConfigServiceService,
    {
        provide: APP_INITIALIZER,
        useFactory: appInitializerFn,
        multi: true,
        deps: [ConfigServiceService]
    }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
