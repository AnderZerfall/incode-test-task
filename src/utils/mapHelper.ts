import { IssueInfoDTO } from '../domain/dto/IssueInfoDTO';
import { IssueInfo } from '../domain/models/IssueInfo';
import { IssueStatus } from '../domain/models/IssueStatus';
import { CalculateDate } from './calculateDateHelper';

export const mapIssuesDTOtoModel = (issue: IssueInfoDTO): IssueInfo => ({
  id: issue.id,
  title: issue.title,
  number: issue.number,
  comments: issue.comments,
  status: issue.state === 'closed' ? IssueStatus.DONE : issue.assignee ? IssueStatus.IN_PROGRESS : IssueStatus.TO_DO,
  assignee: issue.assignee,
  timeAgo: CalculateDate(issue.created_at),
  user: issue.user,
});
