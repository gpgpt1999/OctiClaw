/**
 * OctiClaw 工作流类型定义
 * 定义工作流编辑器中使用的所有类型
 */

import { Node, Edge } from 'reactflow';

/**
 * 触发器类型
 */
export type TriggerType = 'manual' | 'scheduled' | 'message';

/**
 * Agent 配置
 */
export interface AgentConfig {
  agentId: string;
  agentName: string;
  description: string;
  inputParams: Record<string, string>;
  outputMapping: Record<string, string>;
}

/**
 * 条件配置
 */
export interface ConditionConfig {
  field: string;
  operator: 'equals' | 'not_equals' | 'contains' | 'greater_than' | 'less_than';
  value: string;
}

/**
 * 工作流节点数据
 */
export interface WorkflowNodeData {
  label: string;
  type: 'trigger' | 'agent' | 'condition' | 'output';
  config: TriggerConfig | AgentConfig | ConditionConfig | OutputConfig;
}

/**
 * 触发器配置
 */
export interface TriggerConfig {
  triggerType: TriggerType;
  cronExpression?: string;
  messagePattern?: string;
}

/**
 * 输出配置
 */
export interface OutputConfig {
  outputType: 'log' | 'webhook' | 'notification';
  target?: string;
}

/**
 * 工作流节点 (扩展 ReactFlow Node)
 */
export type WorkflowNode = Node<WorkflowNodeData>;

/**
 * 工作流边 (扩展 ReactFlow Edge)
 */
export type WorkflowEdge = Edge;

/**
 * 工作流配置
 */
export interface WorkflowConfig {
  id: string;
  name: string;
  description: string;
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  createdAt: string;
  updatedAt: string;
  isTemplate: boolean;
}

/**
 * 工作流运行状态
 */
export interface WorkflowRunStatus {
  workflowId: string;
  status: 'idle' | 'running' | 'completed' | 'failed';
  currentNodeId?: string;
  startTime?: string;
  endTime?: string;
  error?: string;
}

/**
 * 工作流模板
 */
export interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  category: 'content' | 'development' | 'dapp' | 'custom';
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
}