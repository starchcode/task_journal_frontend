import { createReducer, on } from '@ngrx/store';
import { createAction, createFeatureSelector, createSelector, props } from '@ngrx/store';

// Define actions
export const loadTasksSuccess = createAction('[Tasks] Load Tasks Success', props<{ tasks: Task[] }>());
export const loadTasksFailure = createAction('[Tasks] Load Tasks Failure', props<{ error: string }>());
export const toggleTaskCompletion = createAction(
  '[Tasks] Toggle Task Completion',
  props<{ taskId: number }>()
);

// Define task interface
export interface Task {
  id: number;
  title: string;
  description: string;
  deadline: string;
  is_completed: boolean;
}

// Define initial state
export interface TasksState {
  tasks: Task[];
  error: string | null;
}

const initialState: TasksState = {
  tasks: [],
  error: null
};

// Create reducer
export const tasksReducer = createReducer(
  initialState,
  on(loadTasksSuccess, (state, { tasks }) => ({ ...state, tasks, error: null })),
  on(loadTasksFailure, (state, { error }) => ({ ...state, error })),
  on(toggleTaskCompletion, (state, { taskId }) => ({
    ...state,
    tasks: state.tasks.map(task =>
      task.id === taskId ? { ...task, is_completed: !task.is_completed } : task
    )
  }))
);

// Feature selectors
export const selectTasksState = createFeatureSelector<TasksState>('tasks');
export const selectTasks = createSelector(selectTasksState, (state) => state.tasks);
export const selectTasksError = createSelector(selectTasksState, (state) => state.error);
