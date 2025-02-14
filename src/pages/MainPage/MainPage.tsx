import { ToDoList } from "../../components/ToDoList/ToDoList";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { Crumbs } from "../../components/Crumbs/Crumbs";
import { StarCounter } from "../../components/StarCounter/StarCounter";
import './MainPage.scss'
import { useCallback, useEffect } from "react";
import { getIssues, formatLink } from "../../api/githubApi";
import { IssueInfo } from "../../types/IssueInfo";
import { useDispatch } from "react-redux";
import { IssuesSlice } from "../../features/github/issuesSlices";
import { IssueStatus } from "../../types/IssueStatus";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from 'react-dnd-html5-backend'

export const MainPage = () => {
    const dispatch = useDispatch();

    const loadIssues = useCallback((rawLink: string = '') => {
        const link = formatLink(rawLink);
        console.log(link);

        getIssues(link)
        .then((issues: IssueInfo[]) => {
            dispatch(IssuesSlice.actions.setIssues(issues))
        })
        .catch(e => console.log(e.message))
    }, [dispatch]);


    useEffect(() => {
        loadIssues();
    }, [loadIssues]);

    const renderedTodoLists = Object.keys(IssueStatus).map(status => (
        <ToDoList type={IssueStatus[status as keyof typeof IssueStatus]} key={status}/>
    ));

    return (
        <div className="main-page">
           <SearchBar loadIssues={loadIssues}/>
           <DndProvider backend={HTML5Backend}>
            <div className="main-page__work-area work-area">
                {renderedTodoLists}
            </div>
           </DndProvider>
        </div>
    );
}