/**
 * 节点组件导出
 * 统一导出所有节点组件供 WorkflowEditor 使用
 */

export { default as TriggerNode } from './TriggerNode';
export { default as AgentNode } from './AgentNode';
export { default as ConditionNode } from './ConditionNode';
export { default as OutputNode } from './OutputNode';

// 节点类型映射，用于 ReactFlow nodeTypes
export const nodeTypes = {
  trigger: null,  // 将在 WorkflowEditor 中导入具体组件
  agent: null,
  condition: null,
  output: null
};