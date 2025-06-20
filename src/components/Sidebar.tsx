import { useDnD } from '../context/DnDContext'
import { useReactFlow } from '@xyflow/react'
import * as React from 'react'
import * as process from 'process'
import { v4 as uuidv4 } from 'uuid'
import { AppNode, FlowData } from '../types/FlowType'
import type { Edge, Node } from '@xyflow/react'
import { httpClient } from '../services/api-httpclient'


const Sidebar = () => {
  const { onDragStart } = useDnD()
  const { getNodes, getEdges } = useReactFlow();
  return (
    <aside>
      <div className="description">You can drag these nodes to the pane on the right.</div>
      <div
        className="dndnode output"
        draggable
        onDragStart={(e) => onDragStart(e, 'trigger', { triggerType: 'ON_DEMAND' })}
      >
        Trigger - On Demand ( {process.env.REACT_APP_API_URL}, {process.env.REACT_APP_COMMON} )
      </div>

      <div
        className="dndnode output"
        draggable
        onDragStart={(e) => onDragStart(e, 'trigger', { triggerType: 'SCHEDULE' })}
      >
        Trigger - Schedule
      </div>

      <div
        className="dndnode output"
        draggable
        onDragStart={(e) => onDragStart(e, 'trigger', { triggerType: 'CONDITIONAL' })}
      >
        Trigger - Conditional
      </div>

      <div className="dndnode output" onDragStart={(e) => onDragStart(e, 'spotfire')} draggable>
        Spotfire
      </div>
      <div className="dndnode output" onDragStart={(e) => onDragStart(e, 's3')} draggable>
        S3
      </div>
      <div className="dndnode output" onDragStart={(e) => onDragStart(e, 'dataprep')} draggable>
        DataPrep
      </div>
      <div className="dndnode output" onDragStart={(e) => onDragStart(e, 'mldl')} draggable>
        MLDL
      </div>
      <div className="dndnode" onClick={() => {
        console.log(JSON.stringify(getNodes()))
        console.log(JSON.stringify(getEdges()))
      }}>
        전체 데이터 버튼
      </div>
      <div className="dndnode" onClick={() => {
        getNodes().filter(n => n?.selected).forEach((node) => {
          console.log('선택됨!!', node.id, node.data.label)
        })
        getEdges().filter(e => e?.selected).forEach((edge) => {
          console.log('선택됨!!', JSON.stringify(edge))
        })
      }}>
        선택된 데이터 버튼
      </div>
      <div className="dndnode" onClick={() => {
        const nodes = getNodes()
        const edges = getEdges()

        // ✅ 1. 시작 트리거 검증
        const startTriggers = nodes.filter(
          (n) =>
            n.type === 'trigger' &&
            (n.data.type === 'ON_DEMAND' || n.data.type === 'SCHEDULE')
        )

        if (startTriggers.length !== 1) {
          console.log(
            `⚠️ 시작 트리거는 ON_DEMAND 또는 SCHEDULE 중 하나만 존재해야 합니다. 현재 ${startTriggers.length}개입니다.`
          )
        } else {
          console.log('✅ 시작 트리거 개수 OK')
        }

        // ✅ 2. 연결성 검증 (모든 노드가 하나의 그래프에 포함)
        const visited = new Set<string>()
        const adjacency: Record<string, string[]> = {}

        edges.forEach((e) => {
          if (!adjacency[e.source]) adjacency[e.source] = []
          if (!adjacency[e.target]) adjacency[e.target] = []
          adjacency[e.source].push(e.target)
          adjacency[e.target].push(e.source)
        })

        if (nodes.length > 0) {
          const startNodeId = nodes[0].id
          const dfs = (id: string) => {
            if (visited.has(id)) return
            visited.add(id)
            for (const neighbor of adjacency[id] || []) {
              dfs(neighbor)
            }
          }
          dfs(startNodeId)
        }

        if (visited.size !== nodes.length) {
          console.log(
            `⚠️ 모든 노드가 연결되어 있지 않습니다. 총 ${nodes.length}개 중 ${visited.size}개만 연결됨.`
          )
        } else {
          console.log('✅ 모든 노드가 하나의 그래프로 연결됨')
        }

        // ✅ 3. 시작 트리거 외 모든 노드는 반드시 edge.target 에 존재해야 함
        const startTriggerId = startTriggers[0]?.id
        const targetIds = new Set(edges.map((e) => e.target))

        const invalidNodes = nodes.filter(
          (n) => n.id !== startTriggerId && !targetIds.has(n.id)
        )

        if (invalidNodes.length > 0) {
          console.log(
            `⚠️ 시작 트리거를 제외한 노드 중 ${invalidNodes.length}개가 어떤 엣지의 target에도 포함되지 않았습니다. 연결되지 않은 노드 ID: ${invalidNodes.map(n => n.id).join(', ')}`
          )
        } else {
          console.log('✅ 시작 트리거 외 모든 노드가 적절히 연결되어 있음 (엣지 target 포함)')
        }

        // ✅ 4. 단말 노드 검증 (leaf node 중 trigger 금지)
        const sourceIds = new Set(edges.map((e) => e.source))
        const leafNodes = nodes.filter((n) => !sourceIds.has(n.id))

        console.log('🌿 단말 노드 목록:', leafNodes.map((n) => ({ id: n.id, type: n.data.type })))

        const leafTriggers = leafNodes.filter((n) => n.type === 'trigger')

        if (leafTriggers.length > 0) {
          console.log(
            `⚠️ 단말 노드 중 trigger 타입 노드가 존재합니다. 잘못된 워크플로우입니다. 문제 노드: ${leafTriggers.map(n => n.id).join(', ')}`
          )
        } else {
          console.log('✅ 단말 노드 중 trigger 노드는 없습니다.')
        }
      }}>
        검증 확인 버튼
      </div>
      <div className="dndnode" onClick={() => {
        const flowData: FlowData = {
          workflowId: uuidv4(),
          nodes: getNodes() as unknown as Node<AppNode>[],
          edges: getEdges()
        }

        httpClient.post({path:'/save', data:flowData}).then((res) => {console.log(res)})

      }}>
        test: request
      </div>
      <div className="dndnode" onClick={() => {
      }}>
        test: response
      </div>
    </aside>
  );
};

export default Sidebar;