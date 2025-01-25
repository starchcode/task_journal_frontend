import { createReducer, on } from '@ngrx/store';
import { createAction, createFeatureSelector, createSelector, props } from '@ngrx/store';

// Define actions
export const setHeaderTitle = createAction('[Header] Set Title', props<{ title: string }>());

// Define initial state
export interface HeaderState {
  title: string;
}

const initialState: HeaderState = {
  title: 'Header from NGRX 1'
};

// Create reducer
export const headerReducer = createReducer(
  initialState,
  on(setHeaderTitle, (state, { title }) => ({ ...state, title }))
);

// Feature selector
export const selectHeaderState = createFeatureSelector<HeaderState>('header');
export const selectHeaderTitle = createSelector(selectHeaderState, (state) => state.title);
