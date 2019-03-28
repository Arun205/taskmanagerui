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
  public startDate: '';
  public endDate = '';
  public initialLoad = true;
  public invalidParent = false;
  public updateTask: any;

  constructor(private router: Router, private eventEmitterService: EventEmitterService) { }

  ngOnInit() {
    this.eventEmitterService.eventEmitter.emit('updateTask');
    this.updateTask = JSON.parse(sessionStorage.getItem('task'));
    this.task = this.updateTask.task;
    this.priority = this.updateTask.priority;
    this.parentTask = this.updateTask.parentTask;
    this.startDate = this.updateTask.startDate;
    this.endDate = this.updateTask.endDate;
  }

  cancel() {
    this.router.navigateByUrl('/viewtask');
  }

  update() {
    console.log(this.task);
    console.log(this.priority);
    console.log(this.parentTask);
    console.log(this.startDate);
    console.log(this.endDate);
    this.router.navigateByUrl('/viewtask');
  }

}
