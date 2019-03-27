import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-viewtask',
  templateUrl: './viewtask.component.html',
  styleUrls: ['./viewtask.component.css']
})
export class ViewtaskComponent implements OnInit {

  public tasks =  [
        {'task': 'Task 1', 'parentTask': 'Parent Task 1', 'startDate': '2018/01/01', 'endDate':'2018/01/01', 'priority':10},
        {'task': 'Task 2', 'parentTask': 'Parent Task 2', 'startDate': '2018/01/01', 'endDate':'2018/01/01', 'priority':10},
        {'task': 'Task 3', 'parentTask': 'Parent Task 3', 'startDate': '2018/01/01', 'endDate':'2018/01/01', 'priority':10}
    ]

  constructor() { }

  ngOnInit() {
  }

}
