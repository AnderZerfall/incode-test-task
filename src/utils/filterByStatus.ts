import { IssueInfo } from "../types/IssueInfo";
import { IssueStatus } from "../types/IssueStatus";

export const filterByStatus = (issues: IssueInfo[], status: IssueStatus): IssueInfo[] => {
    // let counter = 0;
    
    return issues.filter(issue => {
        if (issue.status == status) {
            // counter += 1;
            // issue.order = counter;

            return issue;
        }
    });
}