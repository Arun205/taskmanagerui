import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { EventEmitterService } from './../event-emitter.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public addTask = false;
  public updateTask = false;
  public viewTask = false;
  public eventSubscription: Subscription;

  constructor(private eventEmitterService: EventEmitterService, private router: Router) {
    this.eventSubscription = eventEmitterService.eventEmitter.subscribe((currpage: any) => {
      this.headerSelection(currpage);
    });
   }

  ngOnInit() {
    this.headerSelection(window.location.pathname);
  }

  headerSelection(currpage) {
    if (currpage == 'updateTask') {
      this.updateTask = true;
      this.addTask = false;
      this.viewTask = false;
      }
    if (currpage == 'addTask') {
      this.updateTask = false;
      this.addTask = true;
      this.viewTask = false;
    }
    if (currpage == 'viewTask') {
      this.updateTask = false;
      this.addTask = false;
      this.viewTask = true;
    }
  }

}
