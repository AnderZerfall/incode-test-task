import { ToDoList } from '../../components/ToDoList/ToDoList';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import './MainPage.scss';
import {
  useCallback, useEffect, useMemo, useState 
} from 'react';
import {getIssues, formatLink} from '../../api/githubApi';
import { IssueInfo } from '../../types/IssueInfo';
import { useDispatch } from 'react-redux';
import { IssuesSlice } from '../../features/github/issuesSlices';
import { IssueStatus } from '../../types/IssueStatus';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { loadRepo, getLatestRepo } from '../../store/sessionStorage';

export const MainPage = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const loadIssues = useCallback(
    (rawLink: string = '') => {
      setIsLoading(true);

      const link = formatLink(rawLink);
      const storage = link ? loadRepo(rawLink) : getLatestRepo();

      if (storage) {
        console.log('There is a storage!');

        dispatch(
          IssuesSlice.actions.loadIssues({
            issues: storage.columns,
            link: storage.repo,
          })
        );
      } else if (link) {
        getIssues(link)
          .then((issues: IssueInfo[]) => {
            dispatch(IssuesSlice.actions.setIssues({ issues, link: rawLink }));
          })
          .catch((e) => console.log(e.message));
      }

      setIsLoading(false);
    },
    [dispatch]
  );

  useEffect(() => {
    loadIssues();
  }, [loadIssues]);

  const renderedTodoLists = useMemo(
    () =>
      Object.keys(IssueStatus).map((status) => (
        <ToDoList
          type={IssueStatus[status as keyof typeof IssueStatus]}
          key={status}
        />
      )),
    []
  );

  return (
    <div className="main-page">
      <SearchBar loadIssues={loadIssues} />
      <DndProvider backend={HTML5Backend}>
        {!isLoading && (
          <div className="main-page__work-area work-area">
            {renderedTodoLists}
          </div>
        )}
      </DndProvider>
    </div>
  );
};
