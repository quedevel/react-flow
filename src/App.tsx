import './App.css'
import { Route, Routes } from 'react-router-dom'
import { ReactFlowProvider } from '@xyflow/react'
import { DnDProvider } from './context/DnDContext'
import Workflow from './pages/Workflow'
import Schedule from './pages/Schedule'
import History from './pages/History'


function App() {
  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <ReactFlowProvider>
        <DnDProvider>
          <Routes>
            <Route path={'/'} element={<Workflow />} />
            <Route path={'/schedule'} element={<Schedule />} />
            <Route path={'/history'} element={<History />} />
          </Routes>
        </DnDProvider>
      </ReactFlowProvider>
    </div>
  )
}

export default App
