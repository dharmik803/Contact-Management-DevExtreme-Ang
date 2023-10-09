import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../model/task.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  getTaskList(): Observable<Task[]>{
    return this.http.get<Task[]>('https://localhost:7219/api/Tasks');
  }

  addTask(taskIp: Task): Observable<Task>{
    return this.http.post<Task>('https://localhost:7219/api/Tasks', taskIp);
  }

  updateTask(taskIp: Task): Observable<Task>{
    return this.http.put<Task>(`https://localhost:7219/api/Tasks/${taskIp.taskId}`, taskIp);
  }

  deleteTask(taskId: number): Observable<Task>{
    return this.http.delete<Task>(`https://localhost:7219/api/Tasks/${taskId}`);
  }
}
