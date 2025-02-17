import { User } from './User';
import { IssueStatus } from './IssueStatus';

export type IssueInfo = {
  id: number;
  title: string;
  number: number;
  comments: number;
  status: IssueStatus;
  assignee: string | null;
  timeAgo: string;
  user: User;
};
