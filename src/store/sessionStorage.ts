import { Columns } from '../types/Columns';

export const STORAGE_NAME = 'latest';

export const saveRepo = (
  columns: Columns,
  repo: string,
  storageName: string
) => {
  try {
    if (!columns) {
      throw new Error('Impossible to save empty board');
    }

    sessionStorage.setItem(storageName, JSON.stringify({ repo, columns }));
  } catch (error) {
    console.log(error.message);

    return;
  }
};

export const saveLatestRepoName = (repo: string) => {
  try {
    if (!repo) {
      throw new Error('Impossible to save empty board');
    }

    sessionStorage.setItem(STORAGE_NAME, JSON.stringify(repo));
  } catch (error) {
    console.log(error.message);

    return;
  }
};

export const loadRepo = (storageName: string = STORAGE_NAME) => {
  try {
    const rawIssues = sessionStorage.getItem(storageName);

    if (!rawIssues) {
      return;
    }

    return JSON.parse(rawIssues);
  } catch (error) {
    console.log(error.message);

    return;
  }
};

export const getLatestRepo = () => {
  const getRepoName = loadRepo();

  if (getRepoName) {
    const repo = loadRepo(getRepoName);

    return repo;
  }

  return;
};
