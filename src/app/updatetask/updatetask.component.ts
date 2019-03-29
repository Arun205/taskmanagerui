import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventEmitterService } from './../event-emitter.service';
import { TaskmanagerService } from './../taskmanager.service';

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
  public duplicateTask = false;
  public invalidTask = false;
  public taskLengthError = false;
  public invalidParent = false;
  public sameTaskNParent = false;
  public invalidEndDate = false;
  public noChangeError = false;
  public successMessage = false;
  public updateTask: any;

  constructor(private router: Router,
    private eventEmitterService: EventEmitterService,
    private taskmanagerService: TaskmanagerService) { }

  ngOnInit() {
    this.initializeFlags();
    this.eventEmitterService.eventEmitter.emit('updateTask');
    this.updateTask = JSON.parse(sessionStorage.getItem('task'));
    if (this.updateTask.parentTask == 'NA') {
      this.updateTask.parentTask = '';
    }
    this.task = this.updateTask.task;
    this.priority = this.updateTask.priority;
    this.parentTask = this.updateTask.parentTask;
    this.startDate = this.updateTask.startDate;
    this.endDate = this.updateTask.endDate ? this.updateTask.endDate : '';

  }

  initializeFlags() {
    this.invalidParent = false;
    this.duplicateTask = false;
    this.invalidTask = false;
    this.taskLengthError = false;
    this.successMessage = false;
    this.sameTaskNParent = false;
    this.invalidEndDate = false;
    this.noChangeError = false;
  }

  cancel() {
    this.router.navigateByUrl('/viewtask');
  }

  update() {
    this.initialLoad = false;
    this.initializeFlags();
    if (this.validInput()) {
      const obj = {
        parentTask: this.parentTask ? this.parentTask : '',
        task: this.task ? this.task : '',
        startDate: this.startDate ? this.startDate : '',
        endDate: this.endDate ? this.endDate : '',
        priority: this.priority ? this.priority : ''
      };
      this.taskmanagerService.updateTask(obj).subscribe((resp: any) => {
        if (resp.text() == 'success') {
          this.successMessage = true;
        }
      },
      ((error: any) => {
        switch (error.text()) {
          case 'invalid parent':
            this.invalidParent = true;
            break;
        }
      })
      );
    }
  }

  validInput() {
    let task = this.task.trim();
    task = this.task.toLowerCase();
    let parentTask = this.parentTask.trim();
    parentTask = this.parentTask.toLowerCase();
    if (this.task.length == 0) {
      this.invalidTask = true;
      return false;
    }
    if (this.task.length < 3) {
      this.taskLengthError = true;
      return false;
    }
    if (this.startDate.length == 0) {
      return false;
    }
    if (task == parentTask) {
      this.sameTaskNParent = true;
      return false;
    }
    if (this.endDate.length > 0 && this.startDate > this.endDate) {
      this.invalidEndDate = true;
      return false;
    }
    const oldTask = JSON.parse(sessionStorage.getItem('task'));
    oldTask.endDate = oldTask.endDate ? oldTask.endDate : '';
    if (this.priority == this.updateTask.priority &&
      this.parentTask == this.updateTask.parentTask &&
      this.startDate == this.updateTask.startDate &&
      this.endDate == this.updateTask.endDate) {
        this.noChangeError = true;
        return false;
      }
    return true;
  }

}
