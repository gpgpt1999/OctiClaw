/**
 * OutputNode - 输出节点组件
 * 工作流的终点，输出结果
 */

import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { OutputConfig } from '../workflow.types';
import './nodes.css';

/**
 * 输出类型图标映射
 */
const outputIcons: Record<OutputConfig['outputType'], string> = {
  log: '📋',
  webhook: '🔗',
  notification: '🔔'
};

/**
 * 输出类型中文名称
 */
const outputLabels: Record<OutputConfig['outputType'], string> = {
  log: '日志输出',
  webhook: 'WebHook',
  notification: '通知推送'
};

/**
 * OutputNode 组件属性
 */
interface OutputNodeProps extends NodeProps {
  data: {
    label: string;
    config: OutputConfig;
  };
}

/**
 * 输出节点组件
 * 工作流的终点节点，用于输出结果
 */
const OutputNode: React.FC<OutputNodeProps> = ({ data }) => {
  const { label, config } = data;
  const outputType = config.outputType;
  
  return (
    <div className="workflow-node output-node">
      {/* 输入 Handle - 左侧 */}
      <Handle
        type="target"
        position={Position.Left}
        className="workflow-handle input-handle"
        id="input"
      />
      
      {/* 节点头部 - 绿色主题表示完成 */}
      <div className="node-header output-header">
        <span className="node-icon">{outputIcons[outputType]}</span>
        <span className="node-title">输出</span>
      </div>
      
      {/* 节点内容 */}
      <div className="node-content">
        <div className="node-label">{label}</div>
        <div className="node-type-badge output-badge">
          {outputLabels[outputType]}
        </div>
        
        {/* 目标地址 */}
        {config.target && (
          <div className="node-detail">
            <span className="detail-label">目标:</span>
            <span className="detail-value">{config.target}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(OutputNode);