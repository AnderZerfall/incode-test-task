/* eslint-disable no-param-reassign */
import { createSelector, createSlice, } from '@reduxjs/toolkit';
import { IssueStatus } from '../../domain/models/IssueStatus';
import { Actions, IssuesState, RootState } from './issuesSliceTypes';

const initialState: IssuesState = {
  repoLink: '',
  columns: {
    ToDo: [],
    InProgress: [],
    Done: [],
  },
};

export const IssuesSlice = createSlice<IssuesState, Actions, 'issues', any>({
  name: 'issues',
  initialState,
  reducers: {
    setIssues: (state, { payload }) => {
      Object.values(IssueStatus).map(status =>
        state.columns[status] = payload.issues.filter((issue) =>
          issue.status === status
        ));
      state.repoLink = payload.link;
    },
    loadIssues: ( state, { payload }) => {
      Object.values(IssueStatus).map(status =>
        state.columns[status] = payload.issues[status]);
      
      state.repoLink = payload.link;
    },
    moveIssues: ( state, { payload }) => {
      const {
        card,
        targetCard,
        targetColumnType,
        sourceColumnType
      } = payload;

      const updatedColumn = state.columns[sourceColumnType].filter((issue) =>
        issue.id !== card.id);

      const targetIndex = targetCard
        ? state.columns[targetColumnType].findIndex((issue) =>
          issue.id === targetCard.id)
        : state.columns[targetColumnType].length;

      state.columns[sourceColumnType] = updatedColumn;

      state.columns[targetColumnType].splice(targetIndex, 0, {
        ...card,
        status: targetColumnType,
      });
    },
  },
});

const selectIssues = (state: RootState) => state.issues;

export const selectIssuesByStatus = createSelector(
  [selectIssues, (_, status: IssueStatus | null) => status],
  (issues, status) => {
    return status ? issues.columns[status] : [];
  },
);
