/**
 * ConditionNode - 条件判断节点组件
 * 支持 if/else 逻辑，多条件判断
 */

import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { ConditionConfig } from '../workflow.types';
import './nodes.css';

/**
 * 操作符中文映射
 */
const operatorLabels: Record<ConditionConfig['operator'], string> = {
  equals: '等于',
  not_equals: '不等于',
  contains: '包含',
  greater_than: '大于',
  less_than: '小于'
};

/**
 * ConditionNode 组件属性
 */
interface ConditionNodeProps extends NodeProps {
  data: {
    label: string;
    config: ConditionConfig[];
  };
}

/**
 * 条件节点组件
 * 
 * 支持多条件判断，每个条件包含：
 * - field: 字段名
 * - operator: 操作符
 * - value: 比较值
 */
const ConditionNode: React.FC<ConditionNodeProps> = ({ data }) => {
  const { label, config } = data;
  const conditions = Array.isArray(config) ? config : [config];
  
  return (
    <div className="workflow-node condition-node">
      {/* 输入 Handle - 左侧 */}
      <Handle
        type="target"
        position={Position.Left}
        className="workflow-handle input-handle"
        id="input"
      />
      
      {/* 节点头部 */}
      <div className="node-header">
        <span className="node-icon">🔀</span>
        <span className="node-title">条件判断</span>
      </div>
      
      {/* 节点内容 */}
      <div className="node-content">
        <div className="node-label">{label}</div>
        
        {/* 条件列表 */}
        <div className="condition-list">
          {conditions.map((condition, index) => (
            <div key={index} className="condition-item">
              <span className="condition-field">{condition.field || '字段'}</span>
              <span className="condition-operator">
                {operatorLabels[condition.operator] || condition.operator}
              </span>
              <span className="condition-value">{condition.value || '值'}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* 真输出 Handle - 右侧上 */}
      <Handle
        type="source"
        position={Position.Right}
        className="workflow-handle output-handle true-handle"
        id="true"
        style={{ top: '35%' }}
      />
      
      {/* 假输出 Handle - 右侧下 */}
      <Handle
        type="source"
        position={Position.Right}
        className="workflow-handle output-handle false-handle"
        id="false"
        style={{ top: '65%' }}
      />
      
      {/* 分支标签 */}
      <div className="branch-labels">
        <span className="branch-label true-label">是</span>
        <span className="branch-label false-label">否</span>
      </div>
    </div>
  );
};

export default memo(ConditionNode);