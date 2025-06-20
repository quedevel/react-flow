import Header from '../components/Header'
import ReactDiffViewer from 'react-diff-viewer-continued';

const History = () => {
  const oldCode = [
    {'name': 'JOB1', 'type': 'DataPrep', 'args': {'string':'value'}},
    {'name': 'JOB2', 'type': 'DataPrep', 'args': {'string':'value', 'string1': 'value1'}}
  ]
  const newCode = [
    {'name': 'JOB1', 'type': 'DataPrep', 'args': {'string':'value1'}},
    {'name': 'JOB2', 'type': 'DataPrep', 'args': {'string':'value2', 'string1': 'value3'}}
  ]

  return (
    <div>
      <Header />
      <div>
        <ReactDiffViewer oldValue={JSON.stringify(oldCode, null, 2)} newValue={JSON.stringify(newCode, null, 2)} splitView={true} />
      </div>
    </div>
  )
}

export default History