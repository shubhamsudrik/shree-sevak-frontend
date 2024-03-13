import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from 'src/app/services/user-data.service';


declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;

}

export const ROUTES: RouteInfo[] = [ 
    { path: '/dashboard', title: 'Dashboard',  icon: 'fas fa-tachometer-alt ni-dashboard text-primary', class:'' },  
    // { path: '/user-list', title: 'User',  icon:'fas fa-map-marker-alt ni-user text-primary', class: '' },
    { path: '/location-list', title: 'Location',  icon:'fas fa-map-marker-alt ni-location text-primary', class: '' },
    { path: '/member-list', title: 'Member',  icon: 'fas fa-user ni-user text-primary', class: '' },
    { path: '/baithak-list', title: 'Baithak Type',  icon:'fas fa-clock ni-schedule-meeting text-primary', class: '' },
    { path: '/area-list', title: 'Area',  icon:'fas fa-clock ni-schedule-meeting text-primary', class: '' },
    { path: '/user-list', title: 'Users',  icon:'fas fa-user-plus ni-sign-up text-primary', class: '' },
    { path: '/schedular', title: 'Scheduled Baithak',  icon:'fas fa-calendar-check text-primary', class: '' },
    { path: '/schedule-gents-baithak', title: 'Scheduled gents baithak',  icon:'fas fa-calendar-check text-primary', class: '' },
    { path: '/people-baithak', title: 'Pepole baithak',  icon:'fas fa-calendar-check text-primary', class: '' },
    { path: '/report', title: '',  icon:'', class: '' },

];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;


  constructor(private router: Router,
    public userDataService: UserDataService) {
  }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }
}
