import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent{

  user = JSON.parse(sessionStorage.getItem("currentUser") || '{}');

  ngOnInit(): void {
    console.log(this.user);
  }

}
