import { useCallback, useState } from 'react'
import Header from '../components/Header'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import './Schedule.css'
import { WorkflowStatus } from '../util/Constants'
import { DatePicker } from 'antd'
import dayjs, { Dayjs } from 'dayjs'
import Cron, { converter } from 'react-js-cron'

interface EventProps {
  title: string,
  start: Date,
  end: Date,
  status: WorkflowStatus,
  id: string
}

// const initialEvents: EventProps[] = [
//   {
//     title: '미팅1',
//     start: new Date(2025, 2, 12, 10, 0),
//     end: new Date(2025, 2, 12, 12, 0),
//     status: 'Completed',
//     id: uuidv4(),
//   },
//   {
//     title: '미팅2',
//     start: new Date(2025, 2, 15, 8, 0),
//     end: new Date(2025, 2, 15, 12, 0),
//     status: 'Progress',
//     id: uuidv4(),
//   },
//   {
//     title: '미팅3',
//     start: new Date(2025, 2, 18, 4, 0),
//     end: new Date(2025, 2, 18, 10, 0),
//     status: 'Progress',
//     id: uuidv4(),
//   },
//   {
//     title: '미팅4',
//     start: new Date(2025, 2, 19, 14, 0),
//     end: new Date(2025, 2, 19, 20, 0),
//     status: 'Scheduled',
//     id: uuidv4(),
//   },
//   {
//     title: '미팅5',
//     start: new Date(2025, 2, 26, 19, 0),
//     end: new Date(2025, 2, 26, 21, 0),
//     status: 'Scheduled',
//     id: uuidv4(),
//   },
// ]



const data = [
  {
    date: '2024-12-11',
    list: [
      { jobRunId: 1, jobName: 'STG_JOB1', state: 'FAILED' },
      { jobRunId: 2, jobName: 'STG_JOB2', state: 'SUCCEEDED' },
      { jobRunId: 3, jobName: 'STG_JOB3', state: 'SUCCEEDED' }
    ]
  },
  {
    date: '2024-12-12',
    list: [
      { jobRunId: 4, jobName: 'STG_JOB1', state: 'SUCCEEDED' },
      { jobRunId: 5, jobName: 'STG_JOB2', state: 'FAILED' },
      { jobRunId: 6, jobName: 'STG_JOB3', state: 'SUCCEEDED' }
    ]
  },
  {
    date: '2024-12-13',
    list: [
      { jobRunId: 7, jobName: 'STG_JOB1', state: 'SUCCEEDED' },
      { jobRunId: 8, jobName: 'STG_JOB2', state: 'FAILED' },
      { jobRunId: 9, jobName: 'STG_JOB3', state: 'SUCCEEDED' }
    ]
  },
  {
    date: '2024-12-14',
    list: [
      { jobRunId: 10, jobName: 'STG_JOB1', state: 'SUCCEEDED' },
      { jobRunId: 11, jobName: 'STG_JOB2', state: 'FAILED' },
      { jobRunId: 12, jobName: 'STG_JOB3', state: 'SUCCEEDED' }
    ]
  },
  {
    date: '2024-12-15',
    list: [
      { jobRunId: 13, jobName: 'STG_JOB1', state: 'SUCCEEDED' },
      { jobRunId: 14, jobName: 'STG_JOB2', state: 'FAILED' },
      { jobRunId: 15, jobName: 'STG_JOB3', state: 'SUCCEEDED' }
    ]
  }
];

const Schedule = () => {
  // const localizer = momentLocalizer(moment)
  //
  // // today, back, next
  // const [date, setDate] = useState(new Date())
  // const onNavigate = useCallback((d: Date) => setDate(d), [setDate])
  //
  // // month, week, day
  // const [view, setView] = useState<View>(Views.MONTH) // View 타입 사용
  // const onView = useCallback((v: View) => setView(v), [setView])
  //
  // const [events, setEvents] = useState<EventProps[]>(initialEvents)

  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);

  const startDayjs = startDate ? dayjs(startDate) : null;
  const endDayjs = endDate ? dayjs(endDate) : null;

  const handleStartDateChange = (date: Dayjs | null, dateString: string | string[]) => {
    const stringValue = Array.isArray(dateString) ? dateString[0] : dateString;
    setStartDate(stringValue);

    if (endDayjs && dayjs(stringValue).isAfter(endDayjs)) {
      setEndDate(null);
    }
  };

  const handleEndDateChange = (date: Dayjs | null, dateString: string | string[]) => {
    const stringValue = Array.isArray(dateString) ? dateString[0] : dateString;
    setEndDate(stringValue);
  };

  const disabledDate = (current: Dayjs) => {
    return startDayjs ? current.isBefore(startDayjs.startOf("day")) : false;
  };

  const disabledTime = (current: Dayjs | null) => {
    if (!startDayjs || !current) return {};

    if (!current.isSame(startDayjs, "day")) return {};

    const startHour = startDayjs.hour();
    const startMinute = startDayjs.minute();

    return {
      disabledHours: () =>
        Array.from({ length: 24 }, (_, i) => i).filter((h) => h < startHour),
      disabledMinutes: (selectedHour: number) =>
        selectedHour === startHour
          ? Array.from({ length: 60 }, (_, i) => i).filter((m) => m < startMinute)
          : [],
    };
  };

  const handleClick = (job: { jobRunId: number; jobName: string; state: string }) => {
    if (job.state === 'FAILED') {
      alert(`Job 실패\n이름: ${job.jobName}\nID: ${job.jobRunId}`);
    }
  };

  const [value, setValue] = useState('* * * * *')

  return (
    <div>
      <Header />
      <div style={{ margin: '25px' }}>
        {/*<DatePicker.RangePicker showTime onChange={(date, dateString) => {*/}
        {/*  setStartDate(dateString[0])*/}
        {/*  setEndDate(dateString[1])*/}
        {/*}} />*/}
        {/*<button onClick={() => console.log(startDate, ' - ' , endDate)}>*/}
        {/*  날짜 검색 테스트*/}
        {/*</button>*/}

        <DatePicker
          showTime
          value={startDate ? dayjs(startDate) : null}
          onChange={handleStartDateChange}
        />

        <DatePicker
          showTime
          value={endDate ? dayjs(endDate) : null}
          disabledDate={disabledDate}
          disabledTime={disabledTime}
          onChange={handleEndDateChange}
        />

        {/*<Calendar*/}
        {/*  localizer={localizer}*/}
        {/*  startAccessor="start"*/}
        {/*  endAccessor="end"*/}
        {/*  style={{ height: 500 }}*/}
        {/*  view={view}*/}
        {/*  views={['month', 'week', 'day']}*/}
        {/*  events={events}*/}
        {/*  components={{ event: CustomEvent }}*/}
        {/*  date={date}*/}
        {/*  onNavigate={onNavigate}*/}
        {/*  onView={onView}*/}
        {/*/>*/}

        <Cron
          value={value}
          setValue={setValue}
          clearButton={false}
          defaultPeriod={'minute'}
        />

        <button onClick={() => console.log(value)}>click</button>
        <button onClick={() => setValue('* * * * *')}>click2</button>

      </div>
    </div>
  )
}

export default Schedule