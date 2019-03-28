import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventEmitterService } from './../event-emitter.service';

@Component({
  selector: 'app-updatetask',
  templateUrl: './updatetask.component.html',
  styleUrls: ['./updatetask.component.css']
})
export class UpdatetaskComponent implements OnInit {

  public task = '';
  public priority= 15;
  public parentTask = '';
  public startDate = '';
  public endDate = '';
  public initialLoad = true;
  public invalidParent = false;

  constructor(private router: Router, private eventEmitterService: EventEmitterService) { }

  ngOnInit() {
    this.eventEmitterService.eventEmitter.emit('updateTask');
  }

  cancel() {
    this.router.navigateByUrl('/viewtask');
  }

  update() {
    this.router.navigateByUrl('/viewtask');
  }

}
