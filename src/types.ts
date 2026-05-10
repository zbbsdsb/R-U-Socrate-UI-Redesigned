export type AgentRole = 'RESEARCHER' | 'ENGINEER' | 'ANALYZER';

export interface Thought {
  id: string;
  role: AgentRole;
  content: string;
  timestamp: Date;
  type: 'hypothesis' | 'code' | 'analysis' | 'status';
}

export interface SandboxStatus {
  isRunning: boolean;
  uptime?: string;
  load?: number;
}

export interface Experiment {
  id: string;
  params: Record<string, any>;
  result: string;
  timestamp: Date;
}
