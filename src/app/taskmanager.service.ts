import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class TaskmanagerService {

  public taskApiUrl = 'http://localhost:8080/';
  public options: RequestOptions;

  constructor(private http: Http) { }

  addTask(request) {
    return this.http.post(this.taskApiUrl + 'addTask', request, this.options);
  }

  getAllTasks() {
    return this.http.get(this.taskApiUrl + 'allTasks', this.options);
  }

  updateTask(request) {
    return this.http.post(this.taskApiUrl + 'updateTask', request, this.options);
  }
}
