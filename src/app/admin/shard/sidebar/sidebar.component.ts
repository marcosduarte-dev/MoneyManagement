import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{

  user = JSON.parse(sessionStorage.getItem("currentUser") || '{}');

  ngOnInit(): void {
    console.log(this.user);
  }

}
