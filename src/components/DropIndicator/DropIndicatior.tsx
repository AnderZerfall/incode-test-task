import { ReactNode, useRef } from 'react';
import { IssueStatus } from '../../domain/models/IssueStatus';
import { useDrop } from 'react-dnd';
import { IssueInfo } from '../../domain/models/IssueInfo';
import { IssuesSlice } from '../../features/github/issuesSlices';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import './DropIndicator.scss';

interface Props {
  column: IssueStatus;
  issue?: IssueInfo;
  isInEmptyColumn?: boolean;
  children?: ReactNode;
}

export const DropIndicator: React.FC<Props> = ({
  column,
  issue,
  isInEmptyColumn,
  children,
}) => {
  const dispatch = useDispatch();
  const dropRef = useRef<HTMLDivElement | null>(null);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'ISSUES',
    drop: (item: { card: IssueInfo; }) => {
      if (issue) {
        if (item.card.id === issue.id) {
          return;
        }
      }

      dispatch(
        IssuesSlice.actions.moveIssues({
          card: item.card,
          targetCard: issue,
          targetColumnType: column,
          sourceColumnType: item.card.status,
        }),
      );
    },
    collect: (monitor) => ({ isOver: monitor.isOver() }),
  }));

  // To avoid TypeScript errors, I had to wrap the ref into a function
  const setDropTarget = (node: HTMLDivElement) => {
    drop(node);
    dropRef.current = node;
  };

  return (
    <div
      ref={setDropTarget}
      data-testid={issue ? `drop-indicator-${issue.status}-${issue.id}` : `drop-indicator-end-${column}`}
    >
      <div className={classNames('drop-indicator', { active: isOver }, { 'in-empty-column': isInEmptyColumn})} />
      {children}
    </div>
  );
};
