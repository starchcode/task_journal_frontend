import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TasksService } from '../services/tasks.service';
import { selectTasks, selectTasksError, Task, toggleTaskCompletion } from '../store/tasks.reducer';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TaskCreateComponent } from './task-create/task-create.component'

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, MatDividerModule, MatListModule, MatCheckboxModule, TaskCreateComponent],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks$: Observable<Task[]>;
  error$: Observable<string | null>;

  constructor(
    private store: Store,
    private tasksService: TasksService,
    private sanitizer: DomSanitizer
  ) {
    this.tasks$ = this.store.select(selectTasks);
    this.error$ = this.store.select(selectTasksError);
  }

  ngOnInit(): void {
    this.tasksService.fetchTasks();
  }

  convertToHtml(description: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(description);
  }

  toggleCompletion(task: Task): void {
    const updatedCompletion = !task.is_completed;

    this.store.dispatch(toggleTaskCompletion({ taskId: task.id }));

    this.tasksService.updateTaskCompletion(task.id, updatedCompletion).subscribe((updatedTask) => {
      if (!updatedTask) {
        console.error('Task update failed');
        this.store.dispatch(toggleTaskCompletion({ taskId: task.id }));
      }
    });
  }

}
