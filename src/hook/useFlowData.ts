import { useReactFlow } from '@xyflow/react'

function UseFlowData() {
  const { getNodes } = useReactFlow()

  const getSelectedNodes = () => {
    return getNodes().filter(n => n?.selected)
  }

  return {
    getSelectedNodes,
  }
}

export default UseFlowData