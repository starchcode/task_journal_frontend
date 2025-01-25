import { createReducer, on, createAction, props } from '@ngrx/store';
import { createFeatureSelector, createSelector } from '@ngrx/store';

// Define actions
export const setHeaderTitle = createAction('[Header] Set Title', props<{ title: string }>());
export const incrementHeaderCount = createAction('[Header] Increment Count'); // Action for button click

// Define the state interface
export interface HeaderState {
  title: string;
  count: number;
}

// Initial state
const initialState: HeaderState = {
  title: 'My Angular To-Do List',
  count: 0,
};

// Create the reducer to handle state updates
export const headerReducer = createReducer(
  initialState,
  on(setHeaderTitle, (state, { title }) => ({ ...state, title })),
  on(incrementHeaderCount, (state) => ({
    ...state,
    count: state.count + 1, // Increment count
    title: `Header Changed ${state.count + 1} times`, // Update the title based on count
  }))
);

// Feature selector for header state
export const selectHeaderState = createFeatureSelector<HeaderState>('header');

// Selectors to access header state
export const selectHeaderTitle = createSelector(selectHeaderState, (state) => state.title);
export const selectHeaderCount = createSelector(selectHeaderState, (state) => state.count); // New selector for count
