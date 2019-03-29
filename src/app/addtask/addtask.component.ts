import { Component, OnInit } from '@angular/core';
import { EventEmitterService } from './../event-emitter.service';
import { TaskmanagerService } from './../taskmanager.service';

@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.css']
})
export class AddtaskComponent implements OnInit {

  public task = '';
  public priority = 15;
  public parentTask = '';
  public startDate = '';
  public endDate = '';
  public initialLoad = true;
  public duplicateTask = false;
  public invalidTask = false;
  public taskMinLengthError = false;
  public taskMaxLengthError = false;
  public invalidParent = false;
  public sameTaskNParent = false;
  public invalidEndDate = false;
  public successMessage = false;

  constructor(private eventEmitterService: EventEmitterService,
    private taskmanagerService: TaskmanagerService) { }

  ngOnInit() {
    this.eventEmitterService.eventEmitter.emit('addTask');
    this.initializeFlags();
  }

  initializeFlags() {
    this.invalidParent = false;
    this.duplicateTask = false;
    this.invalidTask = false;
    this.taskMinLengthError = false;
    this.taskMaxLengthError = false;
    this.successMessage = false;
    this.sameTaskNParent = false;
    this.invalidEndDate = false;
  }

  addTask() {
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
      this.taskmanagerService.addTask(obj).subscribe((resp: any) => {
        if (resp.text() == 'success') {
          this.reset();
          this.successMessage = true;
        }
      },
      ((error: any) => {
        switch (error.text()) {
          case 'invalid parent':
            this.invalidParent = true;
            break;
          case 'duplicate task':
            this.duplicateTask = true;
            break;
        }
      })
      );
    }
  }

  validInput() {
    this.task = this.task.trim();
    this.parentTask = this.parentTask.trim();
    if (this.task.length == 0) {
      this.invalidTask = true;
      return false;
    }
    if (this.task.length < 3) {
      this.taskMinLengthError = true;
      return false;
    }
    if (this.task.length > 50) {
      this.taskMaxLengthError = true;
      return false;
    }
    if (this.startDate.length == 0) {
      return false;
    }
    if (this.task == this.parentTask) {
      this.sameTaskNParent = true;
      return false;
    }
    if (this.endDate.length > 0 && this.startDate > this.endDate) {
      this.invalidEndDate = true;
      return false;
    }
    return true;
  }

  reset() {
    this.task = '';
    this.priority = 15;
    this.parentTask = '';
    this.startDate = '';
    this.endDate = '';
    this.initialLoad = true;
    this.successMessage = false;
  }
}
