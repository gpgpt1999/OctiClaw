/**
 * WorkflowEditor - 可视化工作流编辑器
 * 使用 ReactFlow 实现拖拽式节点编辑
 */

import React, { useCallback, useState } from 'react';
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  Connection,
  Edge,
  Node,
  NodeTypes,
  EdgeTypes,
  ReactFlowProvider,
  Panel
} from 'reactflow';
import 'reactflow/dist/style.css';

// 节点组件
import TriggerNode from './nodes/TriggerNode';
import AgentNode from './nodes/AgentNode';
import ConditionNode from './nodes/ConditionNode';
import OutputNode from './nodes/OutputNode';

// 类型定义
import { WorkflowConfig, WorkflowNodeData, TriggerConfig, AgentConfig, ConditionConfig, OutputConfig } from './workflow.types';

// 状态管理
import { useWorkflowStore } from './workflow.store';

// 样式
import './workflow.css';

/**
 * 节点类型映射
 */
const nodeTypes: NodeTypes = {
  trigger: TriggerNode,
  agent: AgentNode,
  condition: ConditionNode,
  output: OutputNode
};

/**
 * 初始化默认节点
 */
const getInitialNodes = (): Node<WorkflowNodeData>[] => [
  {
    id: 'trigger-1',
    type: 'trigger',
    position: { x: 50, y: 200 },
    data: {
      label: '开始',
      type: 'trigger',
      config: {
        triggerType: 'manual'
      } as TriggerConfig
    }
  }
];

/**
 * WorkflowEditor 内部组件
 */
const WorkflowEditorInner: React.FC = () => {
  // 从 Store 获取状态
  const { 
    currentWorkflow, 
    runStatus,
    updateCurrentNodes, 
    updateCurrentEdges,
    setRunStatus,
    resetRunStatus
  } = useWorkflowStore();

  // ReactFlow 内部状态
  const [nodes, setNodes, onNodesChange] = useNodesState(
    currentWorkflow?.nodes || getInitialNodes()
  );
  const [edges, setEdges, onEdgesChange] = useEdgesState(
    currentWorkflow?.edges || []
  );

  // 编辑模式状态
  const [isEditing, setIsEditing] = useState(false);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  /**
   * 处理节点连接
   */
  const onConnect = useCallback(
    (params: Connection) => {
      const newEdge: Edge = {
        ...params,
        id: `edge-${Date.now()}`,
        type: 'smoothstep',
        animated: true,
        style: { stroke: '#e53935', strokeWidth: 2 }
      };
      setEdges((eds) => addEdge(newEdge, eds));
    },
    [setEdges]
  );

  /**
   * 处理节点/边变化 - 同步到 Store
   */
  const handleNodesChange = useCallback(
    (changes: any) => {
      onNodesChange(changes);
      // 更新 Store
      setTimeout(() => {
        updateCurrentNodes(nodes);
      }, 0);
    },
    [onNodesChange, nodes, updateCurrentNodes]
  );

  const handleEdgesChange = useCallback(
    (changes: any) => {
      onEdgesChange(changes);
      setTimeout(() => {
        updateCurrentEdges(edges);
      }, 0);
    },
    [onEdgesChange, edges, updateCurrentEdges]
  );

  /**
   * 处理节点双击 - 进入编辑模式
   */
  const onNodeDoubleClick = useCallback(
    (event: React.MouseEvent, node: Node) => {
      setSelectedNodeId(node.id);
      setIsEditing(true);
    },
    []
  );

  /**
   * 处理边创建完成
   */
  const onEdgeCreated = useCallback(
    (edge: Edge) => {
      updateCurrentEdges([...edges, edge]);
    },
    [edges, updateCurrentEdges]
  );

  /**
   * 添加新节点
   */
  const addNode = (type: 'trigger' | 'agent' | 'condition' | 'output') => {
    const newNode: Node<WorkflowNodeData> = {
      id: `${type}-${Date.now()}`,
      type,
      position: { x: 300 + Math.random() * 200, y: 100 + Math.random() * 200 },
      data: getDefaultNodeData(type)
    };
    setNodes((nds) => [...nds, newNode]);
  };

  /**
   * 获取默认节点数据
   */
  const getDefaultNodeData = (type: string): WorkflowNodeData => {
    switch (type) {
      case 'trigger':
        return {
          label: '新触发器',
          type: 'trigger',
          config: { triggerType: 'manual' } as TriggerConfig
        };
      case 'agent':
        return {
          label: '新 Agent',
          type: 'agent',
          config: {
            agentId: '',
            agentName: '',
            description: '',
            inputParams: {},
            outputMapping: {}
          } as AgentConfig
        };
      case 'condition':
        return {
          label: '条件判断',
          type: 'condition',
          config: [{
            field: '',
            operator: 'equals',
            value: ''
          }] as ConditionConfig[]
        };
      case 'output':
        return {
          label: '输出',
          type: 'output',
          config: { outputType: 'log' } as OutputConfig
        };
      default:
        return { label: '节点', type: 'agent', config: {} };
    }
  };

  /**
   * 删除选中节点
   */
  const deleteSelectedNodes = () => {
    const selectedNodes = nodes.filter((n) => n.selected);
    if (selectedNodes.length > 0) {
      setNodes((nds) => nds.filter((n) => !n.selected));
    }
  };

  /**
   * 保存工作流
   */
  const saveWorkflow = () => {
    const workflow: WorkflowConfig = {
      id: currentWorkflow?.id || `workflow-${Date.now()}`,
      name: currentWorkflow?.name || '未命名工作流',
      description: currentWorkflow?.description || '',
      nodes,
      edges,
      createdAt: currentWorkflow?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isTemplate: false
    };
    console.log('保存工作流:', workflow);
    alert('工作流已保存!');
  };

  /**
   * 运行工作流
   */
  const runWorkflow = async () => {
    if (nodes.length === 0) {
      alert('请先添加节点');
      return;
    }

    setRunStatus({
      workflowId: currentWorkflow?.id || '',
      status: 'running',
      startTime: new Date().toISOString()
    });

    // 模拟工作流执行
    try {
      // TODO: 实际执行工作流
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      setRunStatus({
        workflowId: currentWorkflow?.id || '',
        status: 'completed',
        startTime: new Date().toISOString(),
        endTime: new Date().toISOString()
      });
      alert('工作流执行完成!');
    } catch (error) {
      setRunStatus({
        workflowId: currentWorkflow?.id || '',
        status: 'failed',
        error: String(error)
      });
      alert('工作流执行失败');
    }
  };

  /**
   * 清空画布
   */
  const clearCanvas = () => {
    if (confirm('确定要清空画布吗?')) {
      setNodes([]);
      setEdges([]);
      resetRunStatus();
    }
  };

  return (
    <div className="workflow-editor-container">
      {/* 工具栏 */}
      <div className="workflow-toolbar">
        <div className="toolbar-left">
          <h2 className="toolbar-title">工作流编辑器</h2>
          {currentWorkflow && (
            <span className="workflow-name">{currentWorkflow.name}</span>
          )}
        </div>
        
        <div className="toolbar-center">
          {/* 添加节点按钮 */}
          <button
            className="toolbar-btn add-trigger"
            onClick={() => addNode('trigger')}
            title="添加触发器"
          >
            ⚡ 触发器
          </button>
          <button
            className="toolbar-btn add-agent"
            onClick={() => addNode('agent')}
            title="添加 Agent"
          >
            🤖 Agent
          </button>
          <button
            className="toolbar-btn add-condition"
            onClick={() => addNode('condition')}
            title="添加条件判断"
          >
            🔀 条件
          </button>
          <button
            className="toolbar-btn add-output"
            onClick={() => addNode('output')}
            title="添加输出"
          >
            📤 输出
          </button>
        </div>
        
        <div className="toolbar-right">
          <button
            className="toolbar-btn delete"
            onClick={deleteSelectedNodes}
            title="删除选中"
          >
            🗑️ 删除
          </button>
          <button
            className="toolbar-btn clear"
            onClick={clearCanvas}
            title="清空画布"
          >
            🧹 清空
          </button>
          <button
            className="toolbar-btn save"
            onClick={saveWorkflow}
            title="保存工作流"
          >
            💾 保存
          </button>
          <button
            className={`toolbar-btn run ${runStatus.status === 'running' ? 'running' : ''}`}
            onClick={runWorkflow}
            disabled={runStatus.status === 'running'}
            title="运行工作流"
          >
            {runStatus.status === 'running' ? '⏳ 运行中...' : '▶️ 运行'}
          </button>
        </div>
      </div>

      {/* ReactFlow 画布 */}
      <div className="reactflow-wrapper">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={handleNodesChange}
          onEdgesChange={handleEdgesChange}
          onConnect={onConnect}
          onNodeDoubleClick={onNodeDoubleClick}
          onEdgeCreated={onEdgeCreated}
          nodeTypes={nodeTypes}
          fitView
          snapToGrid
          snapGrid={[15, 15]}
          defaultEdgeOptions={{
            type: 'smoothstep',
            animated: true,
            style: { stroke: '#e53935', strokeWidth: 2 }
          }}
        >
          {/* 背景 */}
          <Background color="#e53935" gap={15} size={1} />
          
          {/* 控件 */}
          <Controls className="workflow-controls" />
          
          {/* 缩略图 */}
          <MiniMap
            className="workflow-minimap"
            nodeColor="#e53935"
            maskColor="rgba(229, 57, 53, 0.1)"
          />
          
          {/* 顶部 Panel */}
          <Panel position="top-right" className="workflow-panel">
            <div className="panel-info">
              <span>节点: {nodes.length}</span>
              <span>连线: {edges.length}</span>
            </div>
          </Panel>
        </ReactFlow>
      </div>

      {/* 节点编辑弹窗 (简化版) */}
      {isEditing && selectedNodeId && (
        <div className="node-edit-modal" onClick={() => setIsEditing(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>编辑节点</h3>
            <p>节点ID: {selectedNodeId}</p>
            <p>双击节点可进行详细配置 (待实现)</p>
            <button onClick={() => setIsEditing(false)}>关闭</button>
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * WorkflowEditor 主组件 (带 Provider)
 */
const WorkflowEditor: React.FC = () => {
  return (
    <ReactFlowProvider>
      <WorkflowEditorInner />
    </ReactFlowProvider>
  );
};

export default WorkflowEditor;