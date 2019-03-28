import { Component, OnInit } from '@angular/core';
import { EventEmitterService } from './../event-emitter.service';

@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.css']
})
export class AddtaskComponent implements OnInit {

  public task = '';
  public priority= 15;
  public parentTask = '';
  public startDate = '';
  public endDate = '';
  public initialLoad = true;
  public invalidParent = false;

  constructor(private eventEmitterService: EventEmitterService) { }

  ngOnInit() {
    this.eventEmitterService.eventEmitter.emit('addTask');
  }

  addTask() {
    this.validateInput();
  }

  validateInput() {
    console.log(this.task);
    this.initialLoad = false;
  }

  reset() {
    this.task = '';
    this.priority = 15;
    this.parentTask = '';
    this.startDate = '';
    this.endDate = '';
    this.initialLoad = true;
  }
}
