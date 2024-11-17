import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  events: string[] = [];
  opened: boolean = false;
  sidebarVisible:boolean = false;
  visibleOnMobile:boolean = window.innerWidth < 768 ? true : false;
}
