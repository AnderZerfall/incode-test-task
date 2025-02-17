import { Card, Typography, Tag } from 'antd';
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
}

const ToDoCardComponent: React.FC<Props> = React.memo(({ issue, type }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'ISSUES',
    item: { card: issue },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  }));

  const defineTagColor = (status: IssueStatus) => {
    switch (status) {
      case IssueStatus.TO_DO:
        return 'purple';
      case IssueStatus.IN_PROGRESS:
        return 'processing';
      case IssueStatus.DONE:
        return 'success';
    }
  };

  return (
    <DropIndicator column={type} issue={issue}>
      <motion.div layout layoutId={`${issue.id}`}>
        <div ref={drag}>
          <Card
            data-testid='issue-card'
            data-test-draggable={`card-draggable-${issue.status}-${issue.id}`}
            data-test-type={`issue-${issue.status}`}
            title={issue.title}
            variant='borderless'
            className={classNames('card', { highlighted: isDragging })}
          >
            <Tag className={classNames('card__tag')} bordered={false} color={defineTagColor(issue.status)}>
              {issue.status}
            </Tag>
            <Typography.Paragraph>
              🛠️{' '}
              <Typography.Text type='secondary'>
                Issues #{issue.number} opened {issue.timeAgo} ago
              </Typography.Text>
            </Typography.Paragraph>
            <Typography.Paragraph>
              👨🏻‍💻 <Typography.Text type='secondary'>{issue.user.login}</Typography.Text> 💬{' '}
              <Typography.Text type='secondary'>Comments: {issue.comments}</Typography.Text>
            </Typography.Paragraph>
          </Card>
        </div>
      </motion.div>
    </DropIndicator>
  );
});

ToDoCardComponent.displayName = 'ToDoCard';
export const ToDoCard = ToDoCardComponent;
