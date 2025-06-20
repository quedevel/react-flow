import {
  addEdge,
  Background,
  Connection,
  Controls,
  Edge, MarkerType,
  MiniMap,
  Node,
  NodeTypes,
  OnConnect,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from '@xyflow/react'
import Sidebar from '../components/Sidebar'
import { useDnD } from '../context/DnDContext'
import { type MouseEvent as ReactMouseEvent, useEffect, useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import '@xyflow/react/dist/style.css'
import type { IsValidConnection } from '@xyflow/react/dist/esm/types'
import useFlowData from '../hook/useFlowData'
import Header from '../components/Header'
import CustomNode from '../components/CustomNode'
import { AppNode } from '../types/FlowType'

const Workflow = () => {
  const deleteKeyCode = ['Delete', 'Backspace']
  const reactFlowWrapper = useRef(null)
  const [nodes, setNodes, onNodesChange] = useNodesState<AppNode>([])
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([])
  const { updateNode } = useReactFlow()
  const { getSelectedNodes } = useFlowData()
  const { onDrop, onDragOver } = useDnD()
  const [copiedNodes, setCopiedNodes] = useState<Node[]>([])

  const nodeTypes: NodeTypes = {
    basic: CustomNode,
    s3: CustomNode,
    trigger: CustomNode,
    dataprep: CustomNode,
    mldl: CustomNode,
    spotfire: CustomNode,
  }

  const isValidConnection: IsValidConnection = (connection) => {
    if (!('source' in connection) || !('target' in connection)) return false

    const source = nodes.find(n => n.id === connection.source)
    const target = nodes.find(n => n.id === connection.target)

    if (!source || !target) return false

    const isSourceTrigger = source.type === 'trigger'
    const isTargetTrigger = target.type === 'trigger'

    // trigger → trigger 연결 불가
    if (isSourceTrigger && isTargetTrigger) {
      return false
    }

    // trigger → job 연결 시, 이미 Edge 중 target 에 다른 입력이 있는지 확인
    if (isSourceTrigger && !isTargetTrigger) {
      const found = edges.find(e => e.target === target.id)
      return !found
    }

    // job → job 연결 불가
    return !(!isSourceTrigger && !isTargetTrigger)
  }

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.ctrlKey && event.key === 'c') {
      const selectedNodes = getSelectedNodes()
      setCopiedNodes(selectedNodes)
    }
    if (event.ctrlKey && event.key === 'v') {
      if (copiedNodes.length > 0) {
        copiedNodes.forEach((node: Node) => {
          const prevId = node.id
          const newNode = {
            ...node,
            id: uuidv4(),
            position: { x: node.position.x + 10, y: node.position.y + 10 },
          }

          // @ts-ignore
          setNodes((nds) => nds.concat(newNode))
          updateNode(prevId, { selected: false })
        })
      }
      setCopiedNodes([])
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [onKeyDown])

  const onConnect: OnConnect =
    (connection: Connection) => {
      setEdges((eds) => addEdge(connection, eds))
    }


  const onEdgesDelete = (edges: Edge[]) => {
    edges.forEach(edge => {
      const source: AppNode | undefined = nodes.find(node => node.id === edge.source)
      const target: AppNode | undefined = nodes.find(node => node.id === edge.target)
      console.log('source', source?.type)
      console.log('target', target?.type)
      if (source?.type === 'trigger') {
        // source trigger 의 actions 에서
        // target 을 제거
      } else {
        // target trigger 의 predicate > conditions 에서
        // source 를 제거
      }
    })
  }

  return (
    <div style={{ height: '92vh' }}>
      <Header />
      <div className="dndflow">
        <Sidebar />
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            fitView
            style={{ backgroundColor: '#F7F9FB' }}
            nodes={nodes}
            edges={edges}
            defaultEdgeOptions={{
              type: 'straight',
              markerEnd: {
                type: MarkerType.ArrowClosed,
                width: 20,
                height: 20,
                color: '#FF0072',
              },
              style: {
                strokeWidth: 2,
                stroke: '#FF0072',
              },
            }}
            onDrop={(event) => onDrop(event, setNodes)}
            onConnect={onConnect}
            isValidConnection={isValidConnection}
            nodeTypes={nodeTypes}
            onDragOver={onDragOver}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            deleteKeyCode={deleteKeyCode}
            zoomOnScroll={false}
            // zoomActivationKeyCode={['Ctrl', 'Meta']}
            onNodeClick={(event: ReactMouseEvent, node: Node) => {
              event.preventDefault()
              console.log('once click', node)
            }}
            onEdgesDelete={onEdgesDelete}
            onNodeContextMenu={(event: ReactMouseEvent, node: Node) => {
              event.preventDefault()
              console.log('right click!!', node)
            }}
            onNodeDoubleClick={(event: ReactMouseEvent, node: Node) => {
              event.preventDefault()
              console.log('double click!!', node)
            }}
            proOptions={{ hideAttribution: true }}
          >
            <Controls showZoom={false} />
            <Background />
            {/*'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'*/}
            <MiniMap position={'top-right'} />
          </ReactFlow>
        </div>
      </div>
    </div>
  )
}

export default Workflow