/**
 * OctiClaw 工作流状态管理 (Zustand Store)
 * 管理工作流列表、当前编辑状态、运行状态等
 */

import { create } from 'zustand';
import { WorkflowNode, WorkflowEdge, WorkflowConfig, WorkflowRunStatus, WorkflowTemplate } from './workflow.types';

// 预设模板导入
import contentTemplate from './templates/template-content.json';
import devTemplate from './templates/template-dev.json';
import dappTemplate from './templates/template-dapp.json';

/**
 * 工作流 Store 状态接口
 */
interface WorkflowState {
  // 工作流列表
  workflows: WorkflowConfig[];
  
  // 当前编辑的工作流
  currentWorkflow: WorkflowConfig | null;
  
  // 工作流运行状态
  runStatus: WorkflowRunStatus;
  
  // 模板列表
  templates: WorkflowTemplate[];
  
  // 节点/边的选择状态
  selectedNodes: string[];
  selectedEdges: string[];
  
  // Actions
  setWorkflows: (workflows: WorkflowConfig[]) => void;
  addWorkflow: (workflow: WorkflowConfig) => void;
  updateWorkflow: (id: string, updates: Partial<WorkflowConfig>) => void;
  deleteWorkflow: (id: string) => void;
  
  setCurrentWorkflow: (workflow: WorkflowConfig | null) => void;
  updateCurrentNodes: (nodes: WorkflowNode[]) => void;
  updateCurrentEdges: (edges: WorkflowEdge[]) => void;
  
  setRunStatus: (status: WorkflowRunStatus) => void;
  resetRunStatus: () => void;
  
  setSelectedNodes: (nodeIds: string[]) => void;
  setSelectedEdges: (edgeIds: string[]) => void;
  
  loadTemplate: (template: WorkflowTemplate) => void;
  clearCurrentWorkflow: () => void;
}

// 预设模板列表
const presetTemplates: WorkflowTemplate[] = [
  {
    id: 'template-content',
    name: '内容创作流水线',
    description: '自动化内容创作流程：研究 → 写作 → 排版 → 发布',
    category: 'content',
    nodes: contentTemplate.nodes as WorkflowNode[],
    edges: contentTemplate.edges as WorkflowEdge[]
  },
  {
    id: 'template-dev',
    name: '代码开发流水线',
    description: '完整软件开发流程：需求分析 → 架构设计 → 编码 → 测试 → 文档',
    category: 'development',
    nodes: devTemplate.nodes as WorkflowNode[],
    edges: devTemplate.edges as WorkflowEdge[]
  },
  {
    id: 'template-dapp',
    name: 'DAPP 开发流水线',
    description: '去中心化应用开发：需求分析 → 合约设计 → 合约开发 → 前端开发 → 测试部署',
    category: 'dapp',
    nodes: dappTemplate.nodes as WorkflowNode[],
    edges: dappTemplate.edges as WorkflowEdge[]
  }
];

/**
 * 创建工作流 Store
 */
export const useWorkflowStore = create<WorkflowState>((set, get) => ({
  // 初始状态
  workflows: [],
  currentWorkflow: null,
  runStatus: {
    workflowId: '',
    status: 'idle'
  },
  templates: presetTemplates,
  selectedNodes: [],
  selectedEdges: [],
  
  // 设置工作流列表
  setWorkflows: (workflows) => set({ workflows }),
  
  // 添加工作流
  addWorkflow: (workflow) => set((state) => ({
    workflows: [...state.workflows, workflow]
  })),
  
  // 更新工作流
  updateWorkflow: (id, updates) => set((state) => ({
    workflows: state.workflows.map((wf) =>
      wf.id === id ? { ...wf, ...updates, updatedAt: new Date().toISOString() } : wf
    )
  })),
  
  // 删除工作流
  deleteWorkflow: (id) => set((state) => ({
    workflows: state.workflows.filter((wf) => wf.id !== id)
  })),
  
  // 设置当前工作流
  setCurrentWorkflow: (workflow) => set({ currentWorkflow: workflow }),
  
  // 更新当前工作流的节点
  updateCurrentNodes: (nodes) => set((state) => ({
    currentWorkflow: state.currentWorkflow
      ? { ...state.currentWorkflow, nodes, updatedAt: new Date().toISOString() }
      : null
  })),
  
  // 更新当前工作流的边
  updateCurrentEdges: (edges) => set((state) => ({
    currentWorkflow: state.currentWorkflow
      ? { ...state.currentWorkflow, edges, updatedAt: new Date().toISOString() }
      : null
  })),
  
  // 设置运行状态
  setRunStatus: (status) => set({ runStatus: status }),
  
  // 重置运行状态
  resetRunStatus: () => set({
    runStatus: { workflowId: '', status: 'idle' }
  }),
  
  // 设置选中的节点
  setSelectedNodes: (nodeIds) => set({ selectedNodes: nodeIds }),
  
  // 设置选中的边
  setSelectedEdges: (edgeIds) => set({ selectedEdges: edgeIds }),
  
  // 加载模板
  loadTemplate: (template) => {
    const newWorkflow: WorkflowConfig = {
      id: `workflow-${Date.now()}`,
      name: template.name,
      description: template.description,
      nodes: template.nodes.map((node) => ({
        ...node,
        id: `${node.id}-${Date.now()}`
      })),
      edges: template.edges,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isTemplate: false
    };
    set({ currentWorkflow: newWorkflow });
  },
  
  // 清空当前工作流
  clearCurrentWorkflow: () => set({
    currentWorkflow: null,
    selectedNodes: [],
    selectedEdges: []
  })
}));

export default useWorkflowStore;
