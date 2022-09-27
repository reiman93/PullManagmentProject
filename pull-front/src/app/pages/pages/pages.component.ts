import { Component, ElementRef, HostListener, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { User } from './../../models/user';
import { LoguinServiceService } from './../../services/auth/loguin-service.service';
import { Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Subscription } from 'rxjs';

import { Role } from 'src/app/models/user';

declare var $: any;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {
  toggled: boolean = false;
  hover: string = '';
  headerClass: string = 'topbar d-flex align-items-center';
  toogleClass: string = 'dropdown-menu dropdown-menu-end';
  menuClass: boolean = false;
  currentUser !: User;
  notifications: any = [];
  total: number = 0;
  pageContentStyle: any;
  @ViewChild('target') target!: ElementRef;
  @ViewChild('drop') drop!: ElementRef;
  functionSubscription!: Subscription;
  heigthSubscription!: Subscription;


  constructor(
    private authenticationService: LoguinServiceService,
    private router: Router
  ) {
    this.authenticationService.currentUser.subscribe((x: User) => this.currentUser = x);
  }

  public get Role() {
    return Role;
  }

  ngOnInit() {
    this.findNotifications();
    this.pageContentStyle = window.innerHeight - 95;

    $(".back-to-top").on("click", function () {
      return $(".page-content").animate({
        scrollTop: 0
      }, 600), !1
    });
  }

  ngOnDestroy() {
    this.authenticationService.logout();
    this.router.navigate(['/auth']);
  }


  // @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll(evt: any) {
    if (this.target.nativeElement.scrollTop > 60) {
      this.headerClass = "topbar d-flex align-items-center bg-dark";
    } else {
      this.headerClass = "topbar d-flex align-items-center";
    }

    this.target.nativeElement.scrollTop > 60 ? $(".back-to-top").fadeIn() : $(".back-to-top").fadeOut()
  }


  @HostListener('window:resize', ['$event'])
  onWindowResize() {

  }
  @HostListener('window:click', ['$event'])
  onWindowClick() {
    this.toogleClass = "dropdown-menu dropdown-menu-end";
  }

  viewAllNotifications() {
    this.toogleClass = "dropdown-menu dropdown-menu-end";
    this.router.navigate(['/pages/notifications/list']);
  }
  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/auth']);
  }
  profile() {
    this.router.navigate(['/pages/register/profile', 'prof']);
  }

  register() {
    this.router.navigate(['pages/register/create', 'cre']);
  }
  getAllUsers() {
    this.router.navigate(['pages/register/list']);
  }

  clickToggled() {
    this.toggled = !this.toggled;
    this.menuClass = this.toggled;
  }

  hoverSideBar($event: any) {
    let currentClass = '';
    currentClass = this.toggled ? 'toggled' : '';
    this.hover = $event.type == 'mouseover' ? currentClass + ' sidebar-hovered ' : currentClass + ' ';
    if ($event.type == 'mouseover') {
      this.menuClass = false;
    } else {
      this.menuClass = this.toggled;
    }
  }

  findNotifications() {
  }
  markAllAsRead() {
    this.toogleClass = "dropdown-menu dropdown-menu-end show";
  }
}
