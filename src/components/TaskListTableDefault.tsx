import { useMemo } from 'react'
import type { Task } from '@rsagiev/gantt-task-react-19'
import styles from './TaskListTable.module.css'

const localeDateStringCache: { [key: string]: string } = {}
const toLocaleDateStringFactory =
  (locale: string) =>
    (date: Date, dateTimeOptions: Intl.DateTimeFormatOptions) => {
      const key = date.toString()
      let lds = localeDateStringCache[key]
      if (!lds) {
        lds = date.toLocaleDateString(locale, dateTimeOptions)
        localeDateStringCache[key] = lds
      }
      return lds
    }
const dateTimeOptions: Intl.DateTimeFormatOptions = {
  weekday: 'short',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

interface TaskListTableProps {
  rowHeight: number;
  rowWidth: string;
  fontFamily: string;
  fontSize: string;
  locale: string;
  tasks: Task[];
  selectedTaskId: string;
  setSelectedTask: (taskId: string) => void;
  onExpanderClick: (task: Task) => void;
  showFromTo: boolean;
}

function TaskListTableDefault(
  {
    rowHeight,
    rowWidth,
    tasks,
    fontFamily,
    fontSize,
    locale,
    onExpanderClick,
    showFromTo,
  }: TaskListTableProps) {

  const toLocaleDateString = useMemo(
    () => toLocaleDateStringFactory(locale),
    [locale],
  )

  return (
    <div
      className={styles.taskListWrapper}
      style={{
        fontFamily: fontFamily,
        fontSize: fontSize,
      }}
    >
      {tasks.map((task) => {
        let expanderSymbol = ''
        if (task.hideChildren === false) {
          expanderSymbol = '▼'
        } else if (task.hideChildren === true) {
          expanderSymbol = '▶'
        }

        return (
          <div
            className={styles.taskListTableRow}
            style={{ height: rowHeight }}
            key={`${task.id}row`}
          >
            <div
              className={styles.taskListCell}
              style={{
                minWidth: rowWidth,
                maxWidth: rowWidth,
              }}
              title={task.name}
            >
              <div className={styles.taskListNameWrapper}>
                <div
                  className={
                    expanderSymbol
                      ? styles.taskListExpander
                      : styles.taskListEmptyExpander
                  }
                  onClick={() => onExpanderClick(task)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      onExpanderClick(task)
                    }
                  }}
                  // Commenting out. Since this causes a stacking issue.
                  // tabIndex={0}
                  role="button"
                >
                  {expanderSymbol}
                </div>
                <div className={styles.taskListName}>
                  <span>{task.name}</span>
                </div>
              </div>
            </div>
            {showFromTo && (
              <>
                <div
                  className={styles.taskListCell}
                  style={{
                    minWidth: rowWidth,
                    maxWidth: rowWidth,
                  }}
                >
                  &nbsp;{toLocaleDateString(task.start, dateTimeOptions)}
                </div>
                <div
                  className={styles.taskListCell}
                  style={{
                    minWidth: rowWidth,
                    maxWidth: rowWidth,
                  }}
                >
                  &nbsp;{toLocaleDateString(task.end, dateTimeOptions)}
                </div>
              </>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default TaskListTableDefault