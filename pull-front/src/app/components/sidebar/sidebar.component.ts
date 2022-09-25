import { Component, Input } from '@angular/core';
import { MenuItems } from '../menu-items/menu-items';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class AppSidebarComponent {
  @Input() toggled = false;
  constructor(public menuItems: MenuItems) { }
}
