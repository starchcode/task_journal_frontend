import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectHeaderTitle, HeaderState } from '../store/header.reducer';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,  // Mark as standalone
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  title$: Observable<string>;

  constructor(private store: Store<{ header: HeaderState }>) {
    this.title$ = this.store.select(selectHeaderTitle);
  }
}
