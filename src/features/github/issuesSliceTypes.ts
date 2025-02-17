import { PayloadAction } from '@reduxjs/toolkit';
import { IssueInfo } from '../../domain/models/IssueInfo';
import { IssueStatus } from '../../domain/models/IssueStatus';

export type Columns = {
    ToDo: IssueInfo[],
    InProgress: IssueInfo[],
    Done: IssueInfo[],
}

export interface RootState {
  issues: IssuesState;
}

export interface IssuesState {
  repoLink: string;
  columns: Columns;
}

export type RawIssues = {
  issues: IssueInfo[];
  link: string;
};

export type RawIssuesFromStorage = {
  issues: Columns;
  link: string;
};

export type MovableIssues = {
  card: IssueInfo;
  targetCard?: IssueInfo;
  targetColumnType: IssueStatus;
  sourceColumnType: IssueStatus;
};

export type Actions = {
  setIssues(state: IssuesState, action: PayloadAction<RawIssues>): void;
  loadIssues(state: IssuesState, action: PayloadAction<RawIssuesFromStorage>): void;
  moveIssues(state: IssuesState, action: PayloadAction<MovableIssues>): void;
};
