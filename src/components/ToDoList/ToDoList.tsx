import { useDispatch, useSelector } from "react-redux";
import { selectAllIssues } from '../../features/github/issuesSlices'
import { IssueInfo } from "../../types/IssueInfo";
import { ToDoCard } from "../ToDoCard/ToDoCard";
import { IssueStatus } from "../../types/IssueStatus";
import { IssuesSlice } from '../../features/github/issuesSlices';
import { useDrop } from 'react-dnd';
import { Reorder } from 'framer-motion';
import './ToDoList.scss'

type Props = {
    type: IssueStatus
}

export const ToDoList: React.FC<Props> = ({ type }) => {
    const dispatch = useDispatch();
    const issues = useSelector(state => selectAllIssues(state.issues, type))
    // const [, drop] = useDrop(() => ({
    //     accept: 'ISSUES',
    //     drop: (card: IssueInfo) => {
    //         console.log('DROP!');
    //         dispatch(IssuesSlice.actions.moveCard({ card, newColumn: type }))
    //     }
    // }));

    const renderedIssues = issues.map((issue: IssueInfo) => {
        console.log(issues);
        return (
            <Reorder.Item value={issue} key={issue}>
                 <ToDoCard key={issue.title} issue={issue} type={type}/>
            </Reorder.Item>
        )
    })

    return (
        <div className="todo-list">
            <h3 className="todo-list__headline headline">{type}</h3>
            <div  className="todo-list__container container">
            <Reorder.Group values={issues} onReorder={(reorderedIssues: IssueInfo[])=> dispatch(IssuesSlice.actions.setIssues(reorderedIssues))}>
                {renderedIssues}
            </Reorder.Group>
            </div>
        </div>
    );
}