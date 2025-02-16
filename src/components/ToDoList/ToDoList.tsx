import { useSelector } from 'react-redux';
import { selectIssuesByStatus } from '../../features/github/issuesSlices';
import { IssueInfo } from '../../types/IssueInfo';
import { ToDoCard } from '../ToDoCard/ToDoCard';
import { IssueStatus } from '../../types/IssueStatus';
import { DropIndicator } from '../DropIndicator/DropIndicatior';
import React from 'react';
import './ToDoList.scss';
import { useMemo } from 'react';
import { motion } from 'framer-motion';

type Props = {
  type: IssueStatus;
};

const ToDoListComponent: React.FC<Props> = React.memo(({ type }) => {
  const issues = useSelector((state) => selectIssuesByStatus(state, type));

  const renderedIssues = useMemo(
    () =>
      issues.map((issue: IssueInfo, index: number) => (
        <ToDoCard
          key={issue.id}
          issue={issue}
          type={type}
          index={index}
        />
      )),
    [issues, type],
  );

  return (
    <div className="todo-list">
      <h3 className="todo-list__headline headline">{type}</h3>
      <motion.div className="todo-list__container container">
        {renderedIssues}
        <DropIndicator
          index={-1}
          column={type}
        />
      </motion.div>
    </div>
  );
});

ToDoListComponent.displayName = 'ToDoList';
export const ToDoList = ToDoListComponent;
