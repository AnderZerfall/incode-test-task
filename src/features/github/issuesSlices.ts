/* eslint-disable no-param-reassign */
import {
  createSelector, createSlice, PayloadAction
} from '@reduxjs/toolkit';
import { IssueInfo } from '../../types/IssueInfo';
import { IssueStatus } from '../../types/IssueStatus';
import { Columns } from '../../types/Columns';
interface RootState {
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
      { payload }: PayloadAction<{ issues: IssueInfo[]; link: string }>,
    ) => {
      console.log(payload);

      state.columns.ToDo = payload.issues.filter(
        (issue) => issue.status === IssueStatus.TO_DO,
      );
      state.columns.InProgress = payload.issues.filter(
        (issue) => issue.status === IssueStatus.IN_PROGRESS,
      );
      state.columns.Done = payload.issues.filter(
        (issue) => issue.status === IssueStatus.DONE,
      );

      state.repoLink = payload.link;
    },
    loadIssues: (
      state,
      { payload }: PayloadAction<{ issues: Columns; link: string }>,
    ) => {
      state.columns.ToDo = payload.issues.ToDo;
      state.columns.InProgress = payload.issues.InProgress;
      state.columns.Done = payload.issues.Done;
      state.repoLink = payload.link;
    },
    moveCard: (
      state,
      { payload }
        : PayloadAction<{
        card: IssueInfo;
        sourceIndex: number;
        targetIndex: number;
        targetColumnType: IssueStatus;
        sourceColumnType: IssueStatus;
      }>,
    ) => {
      const {
        card,
        sourceIndex,
        targetIndex,
        targetColumnType,
        sourceColumnType,
      } = payload;

      // state.columns[sourceColumnType].splice(sourceIndex, 1);
      const updatedColumn = state.columns[sourceColumnType].filter(
        (issue) => issue.id !== card.id,
      );
      
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
