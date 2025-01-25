import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TasksService } from '../services/tasks.service';
import { selectTasks, selectTasksError, Task, toggleTaskCompletion} from '../store/tasks.reducer';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, MatDividerModule, MatListModule, MatCheckboxModule],
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

  toggleCompletion(taskId: number): void {
    this.store.dispatch(toggleTaskCompletion({ taskId }));
  }
}
