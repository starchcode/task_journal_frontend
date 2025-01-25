import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectHeaderTitle, selectHeaderCount, HeaderState, incrementHeaderCount } from '../store/header.reducer';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-header',
  standalone: true,  // Mark as standalone
  imports: [CommonModule, MatButtonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  title$: Observable<string>;
  count$: Observable<number>;

  constructor(private store: Store<{ header: HeaderState }>) {
    this.title$ = this.store.select(selectHeaderTitle);
    this.count$ = this.store.select(selectHeaderCount);  // Select the count
  }


  onButtonClick(): void {
    this.store.dispatch(incrementHeaderCount());  // Dispatch action to increment the count
  }
}
