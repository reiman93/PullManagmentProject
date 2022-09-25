import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { INavItem } from './nav-item';
import { IsActiveMatchOptions, Router } from '@angular/router';
import { NavService } from './nav.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { MatSidenav } from '@angular/material/sidenav';
import { LoguinServiceService } from 'src/app/services/auth/loguin-service.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-menu-list-item',
  templateUrl: './menu-list-item.component.html',
  styleUrls: ['./menu-list-item.component.scss'],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({ transform: 'rotate(0deg)' })),
      state('expanded', style({ transform: 'rotate(180deg)' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ]),
  ],
})
export class MenuListItemComponent implements OnInit {
  @HostBinding('attr.aria-expanded') ariaExpanded = false;
  @Input() item: INavItem = { displayName: '', iconName: '', role: [] };
  @Input() depth = 0;
  @Input() toggled = false;
  expanded = false;
  matchOptions: IsActiveMatchOptions;
  matchingRoles!: any;
  currentUser: any;

  constructor(
    public navService: NavService,
    public router: Router,
    private matSidenav: MatSidenav,
    private authenticationService: LoguinServiceService
  ) {
    this.authenticationService.currentUser.subscribe((x: User) => this.currentUser = x);
    this.ariaExpanded = this.expanded;
    this.matchOptions = {
      paths: 'subset',
      queryParams: 'ignored',
      fragment: 'ignored',
      matrixParams: 'ignored',
    };
  }

  ngOnInit(): void {
    this.navService.currentUrl.subscribe((url: string) => {
     // this.matchingRoles = this.item.role!.filter(x => this.currentUser.role.includes(x));
      if (this.item.route && url) {
        this.expanded = url.indexOf(`/${this.item.route}`) === 0;
        this.ariaExpanded = this.expanded;
      }
    });
  }

  onItemSelected(item: INavItem): void {
   // this.matchingRoles = this.item.role!.filter(x => this.currentUser.role.includes(x));

    if (!item.children || !item.children.length) {
      this.router.navigate([item.route]).then(null, null);
      this.expanded = true;
     this.close();
    }
    if (item.children && item.children.length) {
      this.expanded = !this.expanded;
    }
  }

  close(): void {
    if (this.matSidenav.mode === 'over') {
      void this.matSidenav.close().then();
    }
  }
}
