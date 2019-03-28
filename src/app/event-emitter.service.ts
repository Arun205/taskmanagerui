import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventEmitterService {

  public eventEmitter: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }
}
