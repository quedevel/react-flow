export type WorkerTypes =
  | 'Standard'
  | 'G.1X'
  | 'G.2X'
  | 'G.025X'
  | 'G.4X'
  | 'G.8X'
  | 'Z.2X'


export enum NodeTypes {
  TRIGGER = 'TRIGGER',
  JOB = 'JOB',
}

export type WorkflowStatus =
  | 'Completed'
  | 'Progress'
  | 'Scheduled'


export type TriggerType = 'ON_DEMAND' | 'SCHEDULE' | 'CONDITIONAL'

export type JobState =
  | 'STARTING'
  | 'RUNNING'
  | 'STOPPING'
  | 'STOPPED'
  | 'SUCCEEDED'
  | 'FAILED'
  | 'TIMEOUT'
  | 'ERROR'
  | 'WAITING'
  | 'EXPIRED'