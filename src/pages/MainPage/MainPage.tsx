import { ToDoList } from '../../components/ToDoList/ToDoList';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import './MainPage.scss';
import {
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react';
import { getIssues, formatLink, getFictionData } from '../../api/githubApi';
import { IssueInfo } from '../../types/IssueInfo';
import { useDispatch } from 'react-redux';
import { IssuesSlice } from '../../features/github/issuesSlices';
import { IssueStatus } from '../../types/IssueStatus';
import { DndProvider } from 'react-dnd';
import { HTML5toTouch } from 'rdndmb-html5-to-touch';
import { MultiBackend } from 'react-dnd-multi-backend';
import { loadRepo, getLatestRepo } from '../../store/sessionStorage';
import { toast } from 'react-toastify';
import { EmojiColumns } from '../../types/EmojiColumns';
import { Spin } from "antd";

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
          getIssues(link).then((issues: IssueInfo[]) => {
            dispatch(IssuesSlice.actions.setIssues({ issues, link: rawLink }));
          });
        }
      } catch (error) {
        toast(error.message);
      } finally {
        setTimeout(() => {      // UPD: that's purely for demonstration purposes
          setIsLoading(false);
        }, 250);
      }
    },
    [dispatch],
  );

  useEffect(() => {
    loadIssues();
  }, [loadIssues]);

  console.log(isLoading)

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
