import React from 'react'
import { Task } from '@rsagiev/gantt-task-react-19'
import styles from './StandardTooltipContent.module.css'

interface TooltipContentProps {
  task: Task;
  fontSize: string;
  fontFamily: string;
}

function StandardTooltipContent(
  {
    task,
    fontSize,
    fontFamily,
  }: TooltipContentProps) {

  const style = {
    fontSize,
    fontFamily,
  };

  return (
    <div className={styles.tooltipDefaultContainer} style={style}>
      <b style={{ fontSize: fontSize + 6 }}>{`${
        task.name
      }: ${task.start.getDate()}-${
        task.start.getMonth() + 1
      }-${task.start.getFullYear()} - ${task.end.getDate()}-${
        task.end.getMonth() + 1
      }-${task.end.getFullYear()}`}</b>
      {task.end.getTime() - task.start.getTime() !== 0 && (
        <p className={styles.tooltipDefaultContainerParagraph}>{`Duration: ${~~(
          (task.end.getTime() - task.start.getTime()) /
          (1000 * 60 * 60 * 24)
        )} day(s)`}</p>
      )}
    </div>
  );
}

export default StandardTooltipContent