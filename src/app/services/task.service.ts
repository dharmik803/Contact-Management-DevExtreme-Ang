import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, lastValueFrom, map, tap, throwError } from 'rxjs';
import { Task } from '../model/task.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  // private _refreshRequired = new Subject<void>();

  // get RefreshRequired(){
  //   return this._refreshRequired;
  // }

  apiUrl: string = 'https://localhost:7219/api/Tasks';

  getTaskList(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  getTaskById(id: number): Observable<Task>{
    return this.http.get<Task>(this.apiUrl + "/" + id);
  }

  addTask(taskIp: Task): Observable<Task>{
    return this.http.post<Task>(this.apiUrl, taskIp);
  }

  updateTask(taskIp: Task): Observable<Task>{
    return this.http.put<Task>(this.apiUrl + "/" + taskIp.taskId, taskIp);
  }

  deleteTask(taskId: number): Observable<Task>{
    return this.http.delete<Task>(this.apiUrl + "/" + taskId);
  }
}
