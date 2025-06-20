import { useCallback, useState } from 'react'
import Header from '../components/Header'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import './Schedule.css'
import CustomEvent from '../components/CustomEvent'
import { v4 as uuidv4 } from 'uuid'
import { Calendar, momentLocalizer, View, Views } from 'react-big-calendar'
import { WorkflowStatus } from '../util/Constants'

interface EventProps {
  title: string,
  start: Date,
  end: Date,
  status: WorkflowStatus,
  id: string
}

const initialEvents: EventProps[] = [
  {
    title: '미팅1',
    start: new Date(2025, 2, 12, 10, 0),
    end: new Date(2025, 2, 12, 12, 0),
    status: 'Completed',
    id: uuidv4(),
  },
  {
    title: '미팅2',
    start: new Date(2025, 2, 15, 8, 0),
    end: new Date(2025, 2, 15, 12, 0),
    status: 'Progress',
    id: uuidv4(),
  },
  {
    title: '미팅3',
    start: new Date(2025, 2, 18, 4, 0),
    end: new Date(2025, 2, 18, 10, 0),
    status: 'Progress',
    id: uuidv4(),
  },
  {
    title: '미팅4',
    start: new Date(2025, 2, 19, 14, 0),
    end: new Date(2025, 2, 19, 20, 0),
    status: 'Scheduled',
    id: uuidv4(),
  },
  {
    title: '미팅5',
    start: new Date(2025, 2, 26, 19, 0),
    end: new Date(2025, 2, 26, 21, 0),
    status: 'Scheduled',
    id: uuidv4(),
  },
]

const Schedule = () => {
  const localizer = momentLocalizer(moment)

  // today, back, next
  const [date, setDate] = useState(new Date())
  const onNavigate = useCallback((d: Date) => setDate(d), [setDate])

  // month, week, day
  const [view, setView] = useState<View>(Views.MONTH) // View 타입 사용
  const onView = useCallback((v: View) => setView(v), [setView])

  const [events, setEvents] = useState<EventProps[]>(initialEvents)

  return (
    <div>
      <Header />
      <div style={{ margin: '25px' }}>
        <Calendar
          localizer={localizer}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          view={view}
          views={['month', 'week', 'day']}
          events={events}
          components={{ event: CustomEvent }}
          date={date}
          onNavigate={onNavigate}
          onView={onView}
        />
      </div>
    </div>
  )
}

export default Schedule