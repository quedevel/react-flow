import type { NodeProps } from '@xyflow/react'
import { AppNode } from '../types/FlowType'
import { Handle, Position } from '@xyflow/react'
import styled from 'styled-components'

const Image = styled.img`
  width: 32px;
  height: auto;
`

export default function CustomNode({ data, isConnectable }: NodeProps<AppNode>) {
  const isStartingPoint = ['ON_DEMAND', 'SCHEDULE'].includes(data.type)
  const isTriggerNode = ['ON_DEMAND', 'SCHEDULE', 'CONDITIONAL'].includes(data.type)

  return (
    <div className="custom-node">
      {!isStartingPoint && (
        <Handle
          type="target"
          position={Position.Left}
          isConnectable={isConnectable}
        />
      )}
      <Image src={`images/${isTriggerNode? 'trigger':data.type}.png`} alt="" />
      <div style={{
        fontSize: '8px'
      }}>
        {isTriggerNode ? `Trigger (${data.type})` : data.type}
      </div>
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
      />
    </div>
  )
}
