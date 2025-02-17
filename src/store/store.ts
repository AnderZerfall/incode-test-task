import { configureStore } from '@reduxjs/toolkit';
import { IssuesSlice } from '../features/github/issuesSlices';
import {
  saveRepo, getLatestRepo, saveLatestRepoName
} from './sessionStorage';

const preloadedState = getLatestRepo();

export const store = configureStore({
  reducer: { issues: IssuesSlice.reducer },
  preloadedState: {
    issues: {
      columns:
        preloadedState ?
          preloadedState.columns
          : {
            ToDo: [], InProgress: [], Done: []
          },
      repoLink: preloadedState ? preloadedState.repo : '',
    },
  },
});

store.subscribe(() => {
  saveRepo(
    store.getState().issues.columns,
    store.getState().issues.repoLink,
    store.getState().issues.repoLink,
  );
  saveLatestRepoName(store.getState().issues.repoLink);
});
