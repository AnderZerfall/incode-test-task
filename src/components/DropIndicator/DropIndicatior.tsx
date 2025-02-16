import { ReactNode } from 'react';
import { IssueStatus } from '../../types/IssueStatus';
import { useDrop } from 'react-dnd';
import { IssueInfo } from '../../types/IssueInfo';
import { IssuesSlice } from '../../features/github/issuesSlices';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import './DropIndicator.scss';

interface Props {
  index: number;
  column: IssueStatus;
  issue?: IssueInfo;
  children?: ReactNode;
}

export const DropIndicator: React.FC<Props> = ({
  index,
  column,
  issue,
  children,
}) => {
  const dispatch = useDispatch();

  console.log(index);
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'ISSUES',
    drop: (item: { card: IssueInfo; index: number }) => {
      if (issue) {
        if (item.card.id === issue.id) {
          return;
        }

        console.log(`TARGET: ${item.index} HOVER: ${index} PLACE: ${index}`);
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      dispatch(
        IssuesSlice.actions.moveCard({
          card: item.card,
          sourceIndex: dragIndex,
          targetIndex: hoverIndex,
          targetColumnType: column,
          sourceColumnType: item.card.status,
        }),
      );

      // item.index = hoverIndex;
    },
    collect: (monitor) => ({ isOver: monitor.isOver() }),
  }));

  return (
    <div ref={drop}>
      <div className={classNames('drop-indicator', { active: isOver })} />
      {children}
    </div>
  );
};
