import { IssueInfo } from "../types/IssueInfo";
import { IssueStatus } from "../types/IssueStatus";
import { CalculateDate } from '../utils/calculateDate';

const FORMAT_LINK = 'https://github.com/'
const BASE_LINK = 'https://api.github.com/repos/'
const TAB_LINK = '/issues'
const TEMP_LINK = 'facebook/react'


export const formatLink = (link: string) => {
    return link.split(FORMAT_LINK)[1];
}

export const getOwnerLinkName = (link: string) => {
    const formattedLink = formatLink(link).split('/')[0];

    return [formattedLink, `${FORMAT_LINK}${formattedLink}`];
}

export const getRepoName = (link: string) => {
    const formattedLink = formatLink(link).split('/')[1];

    return formattedLink;
}

export const  getIssues = async (link: string = TEMP_LINK): Promise<IssueInfo[]> => {
    return fetch(BASE_LINK + link + TAB_LINK)
    .then(response => response.json())
    .then((issues: IssueInfo[]) => issues.map(issue => {
            issue.timeAgo = CalculateDate(issue.created_at)

            if (issue.state === 'closed') {
                issue.status = IssueStatus.DONE;
            } else if (issue.assignee) {
                issue.status = IssueStatus.IN_PROGRESS;
            } else {
                issue.status = IssueStatus.TO_DO;
            }

            console.log(typeof issue);

            return issue
        }
    ));
}