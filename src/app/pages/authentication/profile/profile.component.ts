import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class AppSideProfileComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  hidden = false;

  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }

}
