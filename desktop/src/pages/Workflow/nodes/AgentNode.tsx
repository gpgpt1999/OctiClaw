/**
 * AgentNode - Agent 节点组件
 * 显示 Agent 名称和图标，支持输入/输出端口配置，双击编辑
 */

import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { AgentConfig } from '../workflow.types';
import './nodes.css';

/**
 * AgentNode 组件属性
 */
interface AgentNodeProps extends NodeProps {
  data: {
    label: string;
    config: AgentConfig;
  };
}

/**
 * AgentNode 组件
 * 支持：
 * - 左侧输入 Handle
 * - 右侧输出 Handle
 * - 双击编辑 Agent 配置
 */
const AgentNode: React.FC<AgentNodeProps> = ({ data, selected }) => {
  const { label, config } = data;
  
  return (
    <div className={`workflow-node agent-node ${selected ? 'selected' : ''}`}>
      {/* 输入 Handle - 左侧 */}
      <Handle
        type="target"
        position={Position.Left}
        className="workflow-handle input-handle"
        id="input"
      />
      
      {/* 节点头部 */}
      <div className="node-header">
        <span className="node-icon">🤖</span>
        <span className="node-title">Agent</span>
      </div>
      
      {/* 节点内容 */}
      <div className="node-content">
        <div className="node-label">{label}</div>
        
        {/* Agent 描述 */}
        {config.description && (
          <div className="node-description">{config.description}</div>
        )}
        
        {/* 输入参数预览 */}
        {config.inputParams && Object.keys(config.inputParams).length > 0 && (
          <div className="node-params">
            <span className="params-label">输入:</span>
            <span className="params-count">{Object.keys(config.inputParams).length}</span>
          </div>
        )}
        
        {/* 输出映射预览 */}
        {config.outputMapping && Object.keys(config.outputMapping).length > 0 && (
          <div className="node-params">
            <span className="params-label">输出:</span>
            <span className="params-count">{Object.keys(config.outputMapping).length}</span>
          </div>
        )}
      </div>
      
      {/* 双击提示 */}
      <div className="node-hint">双击编辑配置</div>
      
      {/* 输出 Handle - 右侧 */}
      <Handle
        type="source"
        position={Position.Right}
        className="workflow-handle output-handle"
        id="output"
      />
    </div>
  );
};

export default memo(AgentNode);