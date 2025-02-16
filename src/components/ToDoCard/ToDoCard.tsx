import { Card } from 'antd';
import { IssueInfo } from '../../types/IssueInfo';
import { useDrag } from 'react-dnd';
import { IssueStatus } from '../../types/IssueStatus';
import React from 'react';
import { DropIndicator } from '../DropIndicator/DropIndicatior';
import { motion } from 'framer-motion';
import classNames from 'classnames';
import './ToDoCard.scss';

interface Props {
  issue: IssueInfo;
  type: IssueStatus;
  index: number;
}

export const ToDoCard: React.FC<Props> = ({
  issue,
  type,
  index
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'ISSUES',
    item: { card: issue, index },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  }));

  console.log(issue);

  return (
    <DropIndicator
      index={index}
      column={type}
      issue={issue}
    >
      <motion.div
        layout
        layoutId={`${issue.id}`}
      >
        <div ref={drag}>
          <Card
            title={issue.title}
            variant="borderless"
            className={classNames('card', { highlighted: isDragging })}
          >
            <p>
              #{issue.number} opened {issue.timeAgo} ago
            </p>
            <p>
              {' '}
              {issue.user.login} | Comments: {issue.comments}
            </p>
          </Card>
        </div>
      </motion.div>
    </DropIndicator>
  );
};
