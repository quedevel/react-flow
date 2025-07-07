import {
  addEdge,
  Background,
  Connection,
  Controls,
  Edge, MarkerType,
  MiniMap,
  Node,
  NodeTypes,
  OnConnect, Position,
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
import { AppNode, DataPrepJobNode, MLDLJobNode, S3JobNode, SpotfireJobNode, TriggerNode } from '../types/FlowType'

// const initNodes = [{"id":"4fb5c387-17c3-4c69-a887-57fa3675b015","type":"trigger","position":{"x":-255.75735984274422,"y":197.87184482284962},"targetPosition":"left","sourcePosition":"right","data":{"type":"ON_DEMAND"},"measured":{"width":60,"height":60},"selected":false,"dragging":false},{"id":"fd4ee78e-38aa-4f34-909e-3d96e349b046","type":"dataprep","position":{"x":-114.15947223525897,"y":114.20341335787907},"targetPosition":"left","sourcePosition":"right","data":{"type":"dataprep"},"measured":{"width":60,"height":60},"selected":false,"dragging":false},{"id":"43450bf1-62f5-40e1-b37d-b0b7b07adf63","type":"s3","position":{"x":-75.46856222928376,"y":221.39432336385426},"targetPosition":"left","sourcePosition":"right","data":{"type":"s3"},"measured":{"width":60,"height":60},"selected":false,"dragging":false},{"id":"574fa9fe-c44b-4eb5-83fb-cdd8744c2712","type":"mldl","position":{"x":-139.85691053939541,"y":300.8538626612279},"targetPosition":"left","sourcePosition":"right","data":{"type":"mldl"},"measured":{"width":60,"height":60},"selected":false,"dragging":false},{"id":"76a20697-6175-4066-8523-c0a3c6dae6af","type":"trigger","position":{"x":49.4168727512408,"y":7.652091222188886},"targetPosition":"left","sourcePosition":"right","data":{"type":"CONDITIONAL"},"measured":{"width":60,"height":60},"selected":false,"dragging":false},{"id":"2042686e-a825-400d-a084-b1b24cf0e893","type":"trigger","position":{"x":99.03825485911986,"y":159.9984397990106},"targetPosition":"left","sourcePosition":"right","data":{"type":"CONDITIONAL"},"measured":{"width":60,"height":60},"selected":false,"dragging":false},{"id":"1ed6438e-8f61-456a-b7c5-dec5dea05c4e","type":"trigger","position":{"x":85.97999640967797,"y":357.6134176672308},"targetPosition":"left","sourcePosition":"right","data":{"type":"CONDITIONAL"},"measured":{"width":60,"height":60},"selected":false,"dragging":false},{"id":"e1a72c15-47e2-41b1-861d-8d9fe1cddfd4","type":"s3","position":{"x":168.6822999228098,"y":60.755675583252476},"targetPosition":"left","sourcePosition":"right","data":{"type":"s3"},"measured":{"width":60,"height":60},"selected":false,"dragging":false},{"id":"15c13279-1ae6-4cb0-96f6-636b8022762d","type":"s3","position":{"x":240.06744611309205,"y":153.90458585593777},"targetPosition":"left","sourcePosition":"right","data":{"type":"s3"},"measured":{"width":60,"height":60},"selected":false,"dragging":false},{"id":"cd130d72-0564-464a-bcab-aeac0ad3bf1d","type":"s3","position":{"x":230.49138991683458,"y":344.55515921778897},"targetPosition":"left","sourcePosition":"right","data":{"type":"s3"},"measured":{"width":60,"height":60},"selected":false,"dragging":false},{"id":"75330837-9a05-4d6f-a448-5077371b2157","type":"trigger","position":{"x":393.28434525320984,"y":-16.723324550102593},"targetPosition":"left","sourcePosition":"right","data":{"type":"CONDITIONAL"},"measured":{"width":60,"height":60},"selected":false,"dragging":false},{"id":"eec60a87-c389-49ff-9c80-7bf48a1f3a0b","type":"trigger","position":{"x":433.3296711648316,"y":274.91111415409904},"targetPosition":"left","sourcePosition":"right","data":{"type":"CONDITIONAL"},"measured":{"width":60,"height":60},"selected":false,"dragging":false},{"id":"13925cfe-804e-409f-a117-2849ca43adcc","type":"mldl","position":{"x":551.7245477731044,"y":294.9337771099099},"targetPosition":"left","sourcePosition":"right","data":{"type":"mldl"},"measured":{"width":60,"height":60},"selected":false,"dragging":false},{"id":"d109f78c-5174-4356-aa74-ab531fd1a337","type":"dataprep","position":{"x":487.30380608919114,"y":135.62302402671915},"targetPosition":"left","sourcePosition":"right","data":{"type":"dataprep"},"measured":{"width":60,"height":60},"selected":false,"dragging":false}]
// const initEdges = [{"type":"smoothstep","markerEnd":{"type":"arrowclosed","width":20,"height":20,"color":"#FF0072"},"style":{"strokeWidth":2,"stroke":"#FF0072"},"source":"4fb5c387-17c3-4c69-a887-57fa3675b015","target":"574fa9fe-c44b-4eb5-83fb-cdd8744c2712","id":"xy-edge__4fb5c387-17c3-4c69-a887-57fa3675b015-574fa9fe-c44b-4eb5-83fb-cdd8744c2712"},{"type":"smoothstep","markerEnd":{"type":"arrowclosed","width":20,"height":20,"color":"#FF0072"},"style":{"strokeWidth":2,"stroke":"#FF0072"},"source":"4fb5c387-17c3-4c69-a887-57fa3675b015","target":"43450bf1-62f5-40e1-b37d-b0b7b07adf63","id":"xy-edge__4fb5c387-17c3-4c69-a887-57fa3675b015-43450bf1-62f5-40e1-b37d-b0b7b07adf63"},{"type":"smoothstep","markerEnd":{"type":"arrowclosed","width":20,"height":20,"color":"#FF0072"},"style":{"strokeWidth":2,"stroke":"#FF0072"},"source":"4fb5c387-17c3-4c69-a887-57fa3675b015","target":"fd4ee78e-38aa-4f34-909e-3d96e349b046","id":"xy-edge__4fb5c387-17c3-4c69-a887-57fa3675b015-fd4ee78e-38aa-4f34-909e-3d96e349b046"},{"type":"smoothstep","markerEnd":{"type":"arrowclosed","width":20,"height":20,"color":"#FF0072"},"style":{"strokeWidth":2,"stroke":"#FF0072"},"source":"574fa9fe-c44b-4eb5-83fb-cdd8744c2712","target":"1ed6438e-8f61-456a-b7c5-dec5dea05c4e","id":"xy-edge__574fa9fe-c44b-4eb5-83fb-cdd8744c2712-1ed6438e-8f61-456a-b7c5-dec5dea05c4e"},{"type":"smoothstep","markerEnd":{"type":"arrowclosed","width":20,"height":20,"color":"#FF0072"},"style":{"strokeWidth":2,"stroke":"#FF0072"},"source":"43450bf1-62f5-40e1-b37d-b0b7b07adf63","target":"1ed6438e-8f61-456a-b7c5-dec5dea05c4e","id":"xy-edge__43450bf1-62f5-40e1-b37d-b0b7b07adf63-1ed6438e-8f61-456a-b7c5-dec5dea05c4e"},{"type":"smoothstep","markerEnd":{"type":"arrowclosed","width":20,"height":20,"color":"#FF0072"},"style":{"strokeWidth":2,"stroke":"#FF0072"},"source":"43450bf1-62f5-40e1-b37d-b0b7b07adf63","target":"2042686e-a825-400d-a084-b1b24cf0e893","id":"xy-edge__43450bf1-62f5-40e1-b37d-b0b7b07adf63-2042686e-a825-400d-a084-b1b24cf0e893"},{"type":"smoothstep","markerEnd":{"type":"arrowclosed","width":20,"height":20,"color":"#FF0072"},"style":{"strokeWidth":2,"stroke":"#FF0072"},"source":"fd4ee78e-38aa-4f34-909e-3d96e349b046","target":"76a20697-6175-4066-8523-c0a3c6dae6af","id":"xy-edge__fd4ee78e-38aa-4f34-909e-3d96e349b046-76a20697-6175-4066-8523-c0a3c6dae6af"},{"type":"smoothstep","markerEnd":{"type":"arrowclosed","width":20,"height":20,"color":"#FF0072"},"style":{"strokeWidth":2,"stroke":"#FF0072"},"source":"1ed6438e-8f61-456a-b7c5-dec5dea05c4e","target":"cd130d72-0564-464a-bcab-aeac0ad3bf1d","id":"xy-edge__1ed6438e-8f61-456a-b7c5-dec5dea05c4e-cd130d72-0564-464a-bcab-aeac0ad3bf1d"},{"type":"smoothstep","markerEnd":{"type":"arrowclosed","width":20,"height":20,"color":"#FF0072"},"style":{"strokeWidth":2,"stroke":"#FF0072"},"source":"2042686e-a825-400d-a084-b1b24cf0e893","target":"15c13279-1ae6-4cb0-96f6-636b8022762d","id":"xy-edge__2042686e-a825-400d-a084-b1b24cf0e893-15c13279-1ae6-4cb0-96f6-636b8022762d"},{"type":"smoothstep","markerEnd":{"type":"arrowclosed","width":20,"height":20,"color":"#FF0072"},"style":{"strokeWidth":2,"stroke":"#FF0072"},"source":"76a20697-6175-4066-8523-c0a3c6dae6af","target":"e1a72c15-47e2-41b1-861d-8d9fe1cddfd4","id":"xy-edge__76a20697-6175-4066-8523-c0a3c6dae6af-e1a72c15-47e2-41b1-861d-8d9fe1cddfd4"},{"type":"smoothstep","markerEnd":{"type":"arrowclosed","width":20,"height":20,"color":"#FF0072"},"style":{"strokeWidth":2,"stroke":"#FF0072"},"source":"e1a72c15-47e2-41b1-861d-8d9fe1cddfd4","target":"75330837-9a05-4d6f-a448-5077371b2157","id":"xy-edge__e1a72c15-47e2-41b1-861d-8d9fe1cddfd4-75330837-9a05-4d6f-a448-5077371b2157"},{"type":"smoothstep","markerEnd":{"type":"arrowclosed","width":20,"height":20,"color":"#FF0072"},"style":{"strokeWidth":2,"stroke":"#FF0072"},"source":"15c13279-1ae6-4cb0-96f6-636b8022762d","target":"75330837-9a05-4d6f-a448-5077371b2157","id":"xy-edge__15c13279-1ae6-4cb0-96f6-636b8022762d-75330837-9a05-4d6f-a448-5077371b2157"},{"type":"smoothstep","markerEnd":{"type":"arrowclosed","width":20,"height":20,"color":"#FF0072"},"style":{"strokeWidth":2,"stroke":"#FF0072"},"source":"15c13279-1ae6-4cb0-96f6-636b8022762d","target":"eec60a87-c389-49ff-9c80-7bf48a1f3a0b","id":"xy-edge__15c13279-1ae6-4cb0-96f6-636b8022762d-eec60a87-c389-49ff-9c80-7bf48a1f3a0b"},{"type":"smoothstep","markerEnd":{"type":"arrowclosed","width":20,"height":20,"color":"#FF0072"},"style":{"strokeWidth":2,"stroke":"#FF0072"},"source":"cd130d72-0564-464a-bcab-aeac0ad3bf1d","target":"eec60a87-c389-49ff-9c80-7bf48a1f3a0b","id":"xy-edge__cd130d72-0564-464a-bcab-aeac0ad3bf1d-eec60a87-c389-49ff-9c80-7bf48a1f3a0b"},{"type":"smoothstep","markerEnd":{"type":"arrowclosed","width":20,"height":20,"color":"#FF0072"},"style":{"strokeWidth":2,"stroke":"#FF0072"},"source":"eec60a87-c389-49ff-9c80-7bf48a1f3a0b","target":"13925cfe-804e-409f-a117-2849ca43adcc","id":"xy-edge__eec60a87-c389-49ff-9c80-7bf48a1f3a0b-13925cfe-804e-409f-a117-2849ca43adcc"},{"type":"smoothstep","markerEnd":{"type":"arrowclosed","width":20,"height":20,"color":"#FF0072"},"style":{"strokeWidth":2,"stroke":"#FF0072"},"source":"75330837-9a05-4d6f-a448-5077371b2157","target":"d109f78c-5174-4356-aa74-ab531fd1a337","id":"xy-edge__75330837-9a05-4d6f-a448-5077371b2157-d109f78c-5174-4356-aa74-ab531fd1a337"}]
//
// interface RawNodeData {
//   id: string
//   type: string
//   position: { x: number; y: number }
//   targetPosition: string
//   sourcePosition: string
//   data: {
//     type: string
//     [key: string]: unknown
//   }
//   measured: { width: number; height: number }
//   selected: boolean
//   dragging: boolean
// }
//
// const convertToAppNodes = (nodes: RawNodeData[]): AppNode[] => {
//   return nodes.map(node => {
//     // Position 매핑 함수
//     const convertPosition = (pos: string): Position => {
//       switch (pos.toLowerCase()) {
//         case 'left':
//           return Position.Left
//         case 'right':
//           return Position.Right
//         case 'top':
//           return Position.Top
//         case 'bottom':
//           return Position.Bottom
//         default:
//           return Position.Right // 기본값
//       }
//     }
//
//     const baseNode: Node = {
//       ...node,
//       sourcePosition: convertPosition(node.sourcePosition),
//       targetPosition: convertPosition(node.targetPosition),
//       data: {
//         ...node.data,
//         type: node.data.type.toLowerCase()
//       }
//     }
//
//     switch (node.type) {
//       case 'trigger':
//         return baseNode as TriggerNode
//       case 'spotfire':
//         return baseNode as SpotfireJobNode
//       case 's3':
//         return baseNode as S3JobNode
//       case 'dataprep':
//         return baseNode as DataPrepJobNode
//       case 'mldl':
//         return baseNode as MLDLJobNode
//       default:
//         throw new Error(`Unknown node type: ${node.type}`)
//     }
//   })
// }
//
//
// interface RawEdgeData {
//   type: string
//   markerEnd: {
//     type: string
//     width: number
//     height: number
//     color: string
//   }
//   style: {
//     strokeWidth: number
//     stroke: string
//   }
//   source: string
//   target: string
//   id: string
// }
//
// const convertToEdges = (edges: RawEdgeData[]): Edge[] => {
//   return edges.map(edge => ({
//     ...edge,
//     markerEnd: {
//       type: MarkerType.ArrowClosed,
//       width: 20,
//       height: 20,
//       color: '#FF0072'
//     }
//   }))
// }
//

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

  // eslint-disable-next-line react-hooks/exhaustive-deps
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

          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
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

  // overlaps 처리 주석

  // const { getIntersectingNodes } = useReactFlow();
  //
  // const onNodeDrag = useCallback((event: ReactMouseEvent, node: Node) => {
  //   const intersections = getIntersectingNodes(node).map((n) => n.id);
  //
  //   setNodes((ns) =>
  //     ns.map((n) => ({
  //       ...n,
  //       className: intersections.includes(n.id) ? 'highlight' : '',
  //     })),
  //   );
  // }, []);

  // function MiniMapNode({ x, y }:{x:number, y: number}) {
  //   return <circle cx={x} cy={y} r="50" />;
  // }

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
              type: 'smoothstep',
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
            // nodesDraggable={false}          // 노드 드래그 비활성화
            // nodesConnectable={false}        // 노드 연결 비활성화
            // elementsSelectable={false}      // 선택 비활성화
          >
            <Controls showZoom={false} />
            <Background />
            {/*'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'*/}
            <MiniMap
              position={'bottom-right'}
              pannable
              zoomable
              zoomStep={1}
              // nodeComponent={MiniMapNode}
            />
          </ReactFlow>
        </div>
      </div>
    </div>
  )
}



export default Workflow