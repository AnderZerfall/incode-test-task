import { Card } from 'antd';
import { IssueInfo } from '../../types/IssueInfo';
import { useDrag, useDrop } from 'react-dnd';
import { IssuesSlice } from '../../features/github/issuesSlices';
import { useDispatch } from 'react-redux';
import { IssueStatus } from '../../types/IssueStatus';
import { useRef } from 'react';

type Props = {
    issue: IssueInfo
    type: IssueStatus
}


export const ToDoCard: React.FC<Props> = ({ issue, type }) => {
    const ref = useRef(null)
    const dispatch = useDispatch();

    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'ISSUES',
        item: issue,
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    // const [, drop] = useDrop(() => ({
    //     accept: 'ISSUES',
    //     drop: (card: IssueInfo, monitor) => {
    //         if (!ref.current) {
    //             return
    //         }
    //         console.log(`1CARD ${card.order}   1HOVER ${issue.order}`)

    //         if (card.order === issue.order
    //             && card.status === issue.status) {
    //             return;
    //         }

    //         console.log(card.order, issue.order);
    //         dispatch(IssuesSlice.actions.moveCard({ card, newColumn: type, hoverCard: issue }))
    //     }
        
    //     // drop: (card: IssueInfo) => {
    //     //     console.log('DROP!');
    //     //     dispatch(IssuesSlice.actions.moveCard({ card, newColumn: headline,  }))
    //     // }
    // }));

    // drag(drop(ref))

    return (
        <Card ref={ref} title={issue.title} variant="borderless" style={{ width: '100%', maxWidth: 400 }}>
            <p>#{issue.number} opened {issue.timeAgo} ago</p>
            <p>{issue.user.login} | Comments: {issue.comments}</p>
            <p></p>
        </Card>
    )
}