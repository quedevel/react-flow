import { Gantt, GanttDataType } from "react-virtual-gantt";

const data: GanttDataType[] = [
  {
    key: 'task-1',
    title: 'Some task without data',
    children: [
      {
        key: 'task-1-1',
        title: 'Some non repeating task',
        data: {
          startDate: '2023-03-09T08:00:00.000Z',
          endDate: '2023-03-09T08:00:00.000Z',
        },
        children: [
          {
            key: 'task-1-1-1',
            title: 'Some weekly repeating task',
          },
        ],
      },
      {
        key: 'task-1-2',
        title: 'Some daily repeating task',
      },
    ],
  },
  {
    key: 'task-2',
    title: 'Some monthly repeating task',
  },
];

const VirtualGantt = () => {
  return (
    <div>
      <Gantt>
        <Gantt.Chart data={data} />
      </Gantt>
    </div>
  );
}

export default VirtualGantt;