import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { EventEmitterService } from './../event-emitter.service';
import { TaskmanagerService } from './../taskmanager.service';

@Component({
  selector: 'app-viewtask',
  templateUrl: './viewtask.component.html',
  styleUrls: ['./viewtask.component.css'],
  providers: [DatePipe]
})
export class ViewtaskComponent implements OnInit {

  public tasks: any;
  public currDate: any;
  public successMessage = false;
  public emptyMessage = false;
  public holdEndDate = '';

  constructor(private router: Router,
    private eventEmitterService: EventEmitterService,
    private taskmanagerService: TaskmanagerService,
    private datePipe: DatePipe) { }

  ngOnInit() {
    this.eventEmitterService.eventEmitter.emit('viewTask');
    this.currDate = new Date();
    this.currDate = this.datePipe.transform(this.currDate, 'yyyy-MM-dd');
    this.taskmanagerService.getAllTasks().subscribe((tasks) => {
      this.tasks = tasks.json();
      if (this.tasks.length == 0) {
        this.emptyMessage = true;
      }
      for (const i in this.tasks) {
        if (this.tasks[i]) {
          this.tasks.confirmed = false;
          this.tasks[i].endDate = this.tasks[i].endDate ? this.tasks[i].endDate : '';
          if (this.tasks[i].endDate.length == 0 || this.tasks[i].endDate > this.currDate) {
            this.tasks[i].status = 'notended';
          }
          if (this.tasks[i].parentTask == null) {
          this.tasks[i].parentTask = 'NA';
          }
        }
      }
    });
  }

  editTask(task) {
    sessionStorage.setItem('task', JSON.stringify(task));
    this.router.navigateByUrl('/updatetask');
  }

  endTask(i) {
    this.holdEndDate = this.tasks[i].endDate;
    this.tasks[i].endDate = this.currDate;
    this.tasks[i].status = 'endinginprogress';
  }

  confirmed(task, i) {
    let parentTask = '';
    if (task.parentTask != 'NA') {
      parentTask = task.parentTask;
    }
    const obj = {
      parentTask: parentTask ? parentTask : '',
      task: task.task ? task.task : '',
      startDate: task.startDate ? task.startDate : '',
      endDate: task.endDate ? task.endDate : '',
      priority: task.priority ? task.priority : ''
    };
    this.taskmanagerService.updateTask(obj).subscribe((resp: any) => {
      if (resp.text() == 'success') {
        this.successMessage = true;
        this.tasks[i].status = 'endednow';
      }
    },
    ((error: any) => {
    })
    );
  }

  cancel(i) {
    this.tasks[i].endDate = this.holdEndDate;
    this.tasks[i].status = 'notended';
  }

}
