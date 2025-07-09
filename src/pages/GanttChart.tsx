import Header from '../components/Header'
import { Gantt, Task, ViewMode } from '@rsagiev/gantt-task-react-19'
import TaskListTableDefault from '../components/TaskListTableDefault'
import TaskListHeaderDefault from '../components/TaskListHeaderDefault'
import StandardTooltipContent from '../components/StandardTooltipContent'

const tasks: Task[] = [
  {
    start: new Date("2025-06-30 17:30:33"),
    end: new Date("2025-06-30 18:30:33"),
    name: "예제 작업",
    id: "Task1",
    type: "task",
    progress: 100,
    isDisabled: false,
    dependencies: ["success", "성공"],
    styles: {
      progressColor: '#007bff',
      progressSelectedColor: '#0069d9',
    }
  },
  {
    start: new Date("2025-06-30 18:30:34"),
    end: new Date("2025-06-30 19:30:33"),
    name: "예제 작업2",
    id: "Task1",
    type: "task",
    progress: 100,
    isDisabled: false,
    dependencies: ["fail", "실패"],
    styles: {
      progressColor: '#dc3545',
      progressSelectedColor: '#c82333',
    }
  },
  {
    start: new Date("2025-06-30 19:30:35"),
    end: new Date("2025-06-31 02:30:33"),
    name: "예제 작업3",
    id: "Task1",
    type: "task",
    progress: 100,
    isDisabled: false,
    dependencies: ["success", "성공"],
    styles: {
      progressColor: '#007bff',
      progressSelectedColor: '#0069d9',
    }
  },
  {
    start: new Date("2025-07-01 19:30:35"),
    end: new Date("2025-07-02 02:30:33"),
    name: "예제 작업4",
    id: "Task1",
    type: "task",
    progress: 100,
    isDisabled: false,
    dependencies: ["success", "성공"],
    styles: {
      progressColor: '#007bff',
      progressSelectedColor: '#0069d9',
    }
  },
];

const GanttChart = () => {
  return (
    <div>
      <Header />
      <div>
        <Gantt
          tasks={tasks}
          viewMode={ViewMode.Hour}
          onClick={task => {
            if (task.dependencies && task.dependencies.length > 0 && task.dependencies[0] === "fail") {
              alert(task.dependencies[1])
            }
          }}
          TooltipContent={props => <StandardTooltipContent {...props} />}
          TaskListHeader={props => <TaskListHeaderDefault showFromTo={false} {...props}/>}
          TaskListTable={props => <TaskListTableDefault showFromTo={false} {...props} />}
        />
      </div>
    </div>
  )
}

export default GanttChart