import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages/pages.component';
import { MaterialModule } from './../material.module';

import { AppSidebarComponent } from './../components/sidebar/sidebar.component';
import { MenuListItemComponent } from './../components/sidebar/menu-list-item/menu-list-item.component';;

@NgModule({
  declarations: [
    PagesComponent,
    MenuListItemComponent,
    AppSidebarComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    MaterialModule,
  ],
})
export class PagesModule { }
