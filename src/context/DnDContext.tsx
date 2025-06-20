// context/DnDContext.tsx
import React, { createContext, useContext, useState } from 'react'
import { useReactFlow } from '@xyflow/react'
import { v4 as uuidv4 } from 'uuid'
import { AppNode } from '../types/FlowType'
import { Position } from '@xyflow/react'

type NodeType = AppNode['type']

type DragData = {
  type: NodeType
  meta?: Record<string, any>
}

interface DnDContextType {
  dragData: DragData | null
  onDragStart: (event: React.DragEvent, type: NodeType, meta?: Record<string, any>) => void
  onDrop: (event: React.DragEvent, setNodes: (updater: (nds: AppNode[]) => AppNode[]) => void) => void
  onDragOver: (event: React.DragEvent) => void
}

const DnDContext = createContext<DnDContextType | undefined>(undefined)

export const DnDProvider = ({ children }: { children: React.ReactNode }) => {
  const [dragData, setDragData] = useState<DragData | null>(null)
  const { getNodes, screenToFlowPosition } = useReactFlow()


  const onDragStart = (event: React.DragEvent, type: NodeType, meta?: Record<string, any>) => {
    setDragData({ type, meta })
    event.dataTransfer.effectAllowed = 'move'
  }

  const onDragOver = (event: React.DragEvent) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }

  const onDrop =
    (event: React.DragEvent, setNodes: (updater: (nds: AppNode[]) => AppNode[]) => void) => {
      event.preventDefault()
      if (!dragData) return

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      })

      const isTrigger = dragData.type === 'trigger'
      const triggerType = dragData.meta?.triggerType

      // ✅ validation: 이미 ON_DEMAND 또는 SCHEDULE trigger가 있는지 확인
      if (
        isTrigger &&
        (triggerType === 'ON_DEMAND' || triggerType === 'SCHEDULE') &&
        getNodes().some(
          (n) =>
            n.type === 'trigger' &&
            (n.data.type === 'ON_DEMAND' || n.data.type === 'SCHEDULE')
        )
      ) {
        alert('이미 스타팅 포인트가 있습니다.')
        return
      }

      // 노드 생성
      const node: AppNode = {
        id: uuidv4(),
        type: dragData.type,
        position,
        targetPosition: Position.Left,
        sourcePosition: Position.Right,
        data: {
          type: isTrigger ? triggerType : dragData.type,
        },
      }

      setNodes((nds) => nds.concat(node))
    }

  return (
    <DnDContext.Provider value={{ dragData, onDragStart, onDrop, onDragOver }}>
      {children}
    </DnDContext.Provider>
  )
}

export const useDnD = () => {
  const context = useContext(DnDContext)
  if (!context) {
    throw new Error('useDnD must be used within a DnDProvider')
  }
  return context
}
