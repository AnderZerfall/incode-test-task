/* eslint-disable no-param-reassign */
import { IssueInfo } from '../domain/models/IssueInfo';
import { IssueInfoDTO } from '../domain/dto/IssueInfoDTO';
import { mapIssuesDTOtoModel } from '../utils/mapHelper';

const FORMAT_LINK = 'https://github.com/';
const BASE_LINK = 'https://api.github.com/repos/';
const TAB_LINK = '/issues?state=all';

const token = import.meta.env.VITE_GITHUB_TOKEN;
const headers = {
  Authorization: `token ${token}`,
  Accept: 'application/vnd.github+json',
};

export const formatLink = (link: string) => {
  return link.split(FORMAT_LINK)[1];
};

export const getOwnerLinkName = (link: string) => {
  const formattedLink = formatLink(link).split('/')[0];

  return [formattedLink, `${FORMAT_LINK}${formattedLink}`];
};

export const getRepoName = (link: string) => {
  const formattedLink = formatLink(link).split('/')[1];

  return formattedLink;
};

export const isValidGitHubLink = (link: string) => {
  try {
    const formattedLink = formatLink(link).split('/');

    return formattedLink.length === 2;
  } catch {
    throw new Error('Error: Invalid link. Link has to be https://github.com/[owner of the repo]/[repo name]');
  }
};

export const getIssues = async (link: string): Promise<IssueInfo[]> => {
  return fetch(BASE_LINK + link + TAB_LINK, { headers })
    .then(response => response.json())
    .then((issues: IssueInfoDTO[]) =>
      issues.map(issue => mapIssuesDTOtoModel(issue)),
    );
};

export const getGithubStars = async (link: string): Promise<number> => {
  return fetch(BASE_LINK + link)
    .then(response => response.json())
    .then(data => data.stargazers_count);
};
