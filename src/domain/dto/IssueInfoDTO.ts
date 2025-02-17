import { User } from '../models/User';

export type IssueInfoDTO = {
  id: number;
  title: string;
  number: number;
  comments: number;
  state: string;
  assignee: string | null;
  created_at: Date;
  user: User;
};
