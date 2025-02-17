import { User } from './User';
import { IssueStatus } from './IssueStatus';

export type IssueInfo = {
    id: number,
    title: string,
    number: number,
    comments: number,
    status: IssueStatus,
    state: string,
    assignee: string | null,
    timeAgo: string,
    order: number,
    created_at: Date,
    user: User,
}