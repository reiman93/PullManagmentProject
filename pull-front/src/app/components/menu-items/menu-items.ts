import { Injectable } from '@angular/core';
import { Role } from 'src/app/models/user';
import { INavItem } from '../sidebar/menu-list-item/nav-item';

const MENUITEMS: INavItem[] = [
  {
    displayName: 'Polls',
    iconName: 'settings',
    route: '/pages/poll',
    role: [Role.Admin]
  }
];
@Injectable()
export class MenuItems {
  getMenuitem(): INavItem[] {
    return MENUITEMS;
  }
}
