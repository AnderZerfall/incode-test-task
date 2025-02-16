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
      <h3 className="todo-list__headline headline">{type} {emoji}</h3>
      <motion.div className="todo-list__container container" style={{backgroundColor: token.colorBgSolid}}>
        {renderedIssues}
        <DropIndicator
          column={type}
        />
      </motion.div>
    </div>
  );
});

ToDoListComponent.displayName = 'ToDoList';
export const ToDoList = ToDoListComponent;
