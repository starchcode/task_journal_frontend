import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { loadTasksSuccess, loadTasksFailure, Task } from '../store/tasks.reducer';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private apiUrl = 'http://localhost:8000/tasks';

  constructor(private http: HttpClient, private store: Store) { }

  fetchTasks(): void {
    this.http.get<Task[]>(this.apiUrl).pipe(
      map((tasks) => {
        // Dispatch success action with tasks
        this.store.dispatch(loadTasksSuccess({ tasks }));
      }),
      catchError((error) => {
        console.error('Error fetching tasks:', error);
        // Dispatch failure action with error message
        this.store.dispatch(loadTasksFailure({ error: 'Failed to fetch tasks' }));
        return of([]);
      })
    ).subscribe();
  }

  updateTaskCompletion(taskId: number, isCompleted: boolean): Observable<Task | null> {
    return this.http.patch<Task>(`${this.apiUrl}/${taskId}`, { is_completed: isCompleted }).pipe(
      map((updatedTask) => updatedTask),
      catchError((error) => {
        console.error('Error updating task:', error);
        return of(null);
      })
    );
  }
}
