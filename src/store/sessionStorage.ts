import { Columns } from "../features/github/issuesSliceTypes";

export const STORAGE_NAME = 'latest';

const validateData = (data: Columns | string) =>  {
  if (!data) {
    throw new Error('Impossible to save empty board');
  }

  return true;
}

export const saveRepo = (
  columns: Columns,
  repo: string,
  storageName: string
) => {
  try {
    validateData(columns);
    sessionStorage.setItem(storageName, JSON.stringify({ repo, columns }));
  } catch (error) {
    console.debug(error.message);

    return;
  }
};

export const saveLatestRepoName = (repo: string) => {
  try {
    validateData(repo);
    sessionStorage.setItem(STORAGE_NAME, JSON.stringify(repo));
  } catch (error) {
    console.debug(error.message);

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
    console.debug(error.message);

    return;
  }
};

export const getLatestRepo = () => {
  const repoName = loadRepo();
  
  try {
    validateData(repoName)
    const repo = loadRepo(repoName);

    return repo;
  } catch(error) {
    console.debug(error.message);
    
    return;
  }
};
