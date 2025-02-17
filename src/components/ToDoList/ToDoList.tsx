import React from 'react';
import { useSelector } from 'react-redux';
import { selectIssuesByStatus } from '../../features/github/issuesSlices';
import { IssueInfo } from '../../types/IssueInfo';
import { ToDoCard } from '../ToDoCard/ToDoCard';
import { IssueStatus } from '../../types/IssueStatus';
import { DropIndicator } from '../DropIndicator/DropIndicatior';
import './ToDoList.scss';
import { useMemo } from 'react';
import { motion } from 'framer-motion';
import useToken from 'antd/es/theme/useToken';
import { EmojiColumns } from '../../types/EmojiColumns';
import { Typography } from 'antd';

type Props = {
  type: IssueStatus;
  emoji: EmojiColumns;
};

const ToDoListComponent: React.FC<Props> = React.memo(({ type, emoji }) => {
  const issues = useSelector((state) => selectIssuesByStatus(state, type));
  const [, token] = useToken();

  const renderedIssues = useMemo(
    () =>
      issues.map((issue: IssueInfo) => (
        <ToDoCard
          key={issue.id}
          issue={issue}
          type={type}
        />
      )),
    [issues, type],
  );

  return (
    <div className="todo-list">
      <Typography.Title
        className="todo-list__headline headline"
        level={4}
      >
        {type} {emoji}
      </Typography.Title>
      <motion.div className="todo-list__container container" style={{ backgroundColor: token.colorBgSolid }}>
        { issues.length > 0 && renderedIssues}
        <DropIndicator
          column={type}
        />
      </motion.div>
    </div>
  );
});

ToDoListComponent.displayName = 'ToDoList';
export const ToDoList = ToDoListComponent;
