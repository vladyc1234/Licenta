import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private userSource = new BehaviorSubject({
    email: '',
    password: '',
  });

  public currentUser = this.userSource.asObservable();

  public changeUserData(user: { email: string; password: string; }): void {
    this.userSource.next(user);
  }

  constructor() { }
}
