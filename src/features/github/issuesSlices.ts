/* eslint-disable no-param-reassign */
import {
  createSelector,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit';
import { IssueInfo } from '../../types/IssueInfo';
import { IssueStatus } from '../../types/IssueStatus';
import { Columns } from '../../types/Columns';
export interface RootState {
  issues: InitialState;
}
export interface InitialState {
  repoLink: string;
  columns: Columns;
}

const initialState: InitialState = {
  repoLink: '',
  columns: {
    ToDo: [],
    InProgress: [],
    Done: [],
  },
};

export const IssuesSlice = createSlice({
  name: 'issues',
  initialState,
  reducers: {
    setIssues: (
      state,
      { payload }:
        PayloadAction<{ issues: IssueInfo[]; link: string }>) => {

      Object.values(IssueStatus).map(status =>
        state.columns[status] = payload.issues.filter((issue) =>
          issue.status === status));

      state.repoLink = payload.link;
    },
    loadIssues: (
      state,
      { payload }:
        PayloadAction<{ issues: Columns; link: string }>) => {
      
      Object.values(IssueStatus).map(status =>
        state.columns[status] = payload.issues[status]);
      
      state.repoLink = payload.link;
    },
    moveIssues: (
      state,
      { payload, }: PayloadAction<{
        card: IssueInfo;
        targetCard?: IssueInfo;
        targetColumnType: IssueStatus;
        sourceColumnType: IssueStatus;
      }>,
    ) => {
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
