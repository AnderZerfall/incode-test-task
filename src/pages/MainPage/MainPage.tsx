import {
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react';
import { getIssues, formatLink } from '../../api/githubApi';
import { IssueInfo } from '../../domain/models/IssueInfo';
import { IssuesSlice } from '../../features/github/issuesSlices';
import { IssueStatus } from '../../domain/models/IssueStatus';
import { DndProvider } from 'react-dnd';
import { HTML5toTouch } from 'rdndmb-html5-to-touch';
import { MultiBackend } from 'react-dnd-multi-backend';
import { loadRepo, getLatestRepo } from '../../store/sessionStorage';
import { EmojiColumns } from '../../domain/models/EmojiColumns';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { Spin } from "antd";
import { ToDoList } from '../../components/ToDoList/ToDoList';
import { SearchBar } from '../../components/SearchBar/SearchBar';

import './MainPage.scss';

export const MainPage = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const loadIssues = useCallback(
    (rawLink: string = '') => {
      setIsLoading(true);

      const link = formatLink(rawLink);
      const storage = link ? loadRepo(rawLink) : getLatestRepo();

      try {
        if (storage) {
          dispatch(
            IssuesSlice.actions.loadIssues({
              issues: storage.columns,
              link: storage.repo,
            }),
          );
        } else if (link) {
          getIssues(link)
            .then((issues: IssueInfo[]) => dispatch(IssuesSlice.actions.setIssues({ issues, link: rawLink })))
            .catch(() => toast('Error: repo does not exist or it has no issues'));
        }
      } catch (error) {
        toast(error.message);
      }
      // UPD: that's purely for demonstration purposes
      setTimeout(() => {     
          setIsLoading(false);
      }, 250);
    },
    [dispatch],
  );

  useEffect(() => {
    loadIssues();
  }, [loadIssues]);

  const renderedTodoLists = useMemo(
    () =>
      Object.keys(IssueStatus).map((status) => (
        <ToDoList
          emoji={EmojiColumns[status as keyof typeof IssueStatus]}
          type={IssueStatus[status as keyof typeof IssueStatus]}
          key={status} />
      )),
    [],
  );

  return (
    <div className='main-page'>
      <SearchBar loadIssues={loadIssues} isLoading={isLoading} />
      <DndProvider backend={MultiBackend} options={HTML5toTouch}>
        {!isLoading ? (
          <div
            className='main-page__work-area work-area'
            data-testid='kanban-area'>
            {renderedTodoLists}
          </div>
        ) : ( <Spin size="large"/>)}
      </DndProvider>
    </div>
  );
};
