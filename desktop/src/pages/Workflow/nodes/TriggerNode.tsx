/**
 * TriggerNode - 触发器节点组件
 * 支持三种触发类型：手动触发、定时触发、消息触发
 */

import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { TriggerConfig, TriggerType } from '../workflow.types';
import './nodes.css';

/**
 * 触发器类型图标映射
 */
const triggerIcons: Record<TriggerType, string> = {
  manual: '⚡',
  scheduled: '⏰',
  message: '💬'
};

/**
 * 触发器类型中文名称
 */
const triggerLabels: Record<TriggerType, string> = {
  manual: '手动触发',
  scheduled: '定时触发',
  message: '消息触发'
};

/**
 * TriggerNode 组件属性
 */
interface TriggerNodeProps extends NodeProps {
  data: {
    label: string;
    config: TriggerConfig;
  };
}

/**
 * 触发器节点组件
 */
const TriggerNode: React.FC<TriggerNodeProps> = ({ data }) => {
  const { label, config } = data;
  const triggerType = config.triggerType as TriggerType;
  
  return (
    <div className="workflow-node trigger-node">
      {/* 节点头部 - 红色主题 */}
      <div className="node-header">
        <span className="node-icon">{triggerIcons[triggerType]}</span>
        <span className="node-title">触发器</span>
      </div>
      
      {/* 节点内容 */}
      <div className="node-content">
        <div className="node-label">{label}</div>
        <div className="node-type-badge">
          {triggerLabels[triggerType]}
        </div>
        
        {/* 条件显示 */}
        {triggerType === 'scheduled' && config.cronExpression && (
          <div className="node-detail">
            <span className="detail-label">Cron:</span>
            <span className="detail-value">{config.cronExpression}</span>
          </div>
        )}
        
        {triggerType === 'message' && config.messagePattern && (
          <div className="node-detail">
            <span className="detail-label">匹配:</span>
            <span className="detail-value">{config.messagePattern}</span>
          </div>
        )}
      </div>
      
      {/* 输出 Handle - 只有右侧一个输出 */}
      <Handle
        type="source"
        position={Position.Right}
        className="workflow-handle output-handle"
        id="output"
      />
    </div>
  );
};

export default memo(TriggerNode);