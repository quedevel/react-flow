import type { Edge, Node } from '@xyflow/react'
import { JobState, TriggerType, WorkerTypes } from '../util/Constants'

export interface TriggerCondition {
  jobName?: string
  state?: JobState
}

export interface Predicate {
  logical?: 'AND' | 'ANY'
  conditions?: TriggerCondition[]
}

export interface TriggerAction {
  jobName?: string
  arguments?: Record<string, string>
}

export type TriggerNodeData = {
  type: TriggerType
  name?: string
  description?: string
  schedule?: string
  predicate?: Predicate
  actions?: TriggerAction[]
}

export type TriggerNode = Node<TriggerNodeData, 'trigger'>

type BasicJobNodeData = {
  type: 'basic'
  name?: string
  role?: string
  description?: string
  command?: JobCommand
  numberOfWorkers?: number
  workerType?: WorkerTypes
}
export type BasicJobNode = Node<BasicJobNodeData, 'basic'>

type S3JobNodeData = {
  type: 's3'
  name?: string
  description?: string
  args?: Record<string, string>
}
export type S3JobNode = Node<S3JobNodeData, 's3'>

type DataPrepJobNodeData = {
  type: 'dataprep'
  name?: string
  description?: string
  args?: Record<string, string>
}
export type DataPrepJobNode = Node<DataPrepJobNodeData, 'dataprep'>

type MLDLJobNodeData = {
  type: 'mldl'
  name?: string
  description?: string
  args?: Record<string, string>
}
export type MLDLJobNode = Node<MLDLJobNodeData, 'mldl'>

type SpotfireJobNodeData = {
  type: 'spotfire'
  name?: string
  description?: string
  args?: Record<string, string>
}
export type SpotfireJobNode = Node<SpotfireJobNodeData, 'spotfire'>

export type AppNode =
  | BasicJobNode
  | TriggerNode
  | S3JobNode
  | DataPrepJobNode
  | MLDLJobNode
  | SpotfireJobNode

export interface JobCommand {
  name: string
  scriptLocation: string
}

export interface FlowData {
  workflowId: string
  nodes: Node<AppNode>[]
  edges: Edge[]
}
