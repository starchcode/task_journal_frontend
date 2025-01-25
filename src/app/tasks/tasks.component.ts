import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TasksService } from '../services/tasks.service';
import { selectTasks } from '../store/tasks.reducer';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks$: Observable<any>;

  constructor(private store: Store, private tasksService: TasksService) {
    this.tasks$ = this.store.select(selectTasks);
  }

  ngOnInit(): void {
    this.tasksService.fetchTasks();
  }
}
