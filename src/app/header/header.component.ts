import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public addtask = true;

  constructor() { }

  ngOnInit() {
  }

  selected(select) {
    if (select == 'add') {
      this.addtask = true;
    } else {
      this.addtask = false;
    }
  }

}
