/**
 * OctiClaw - 工作流页面
 * 占位页面，后续由工作流 Agent 完善
 */

import React from 'react';

export const WorkflowPage: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        gap: '16px',
        color: '#E53E3E',
      }}
    >
      {/* 装饰性图标 */}
      <div
        dangerouslySetInnerHTML={{ __html: getOctopusWorkflowSVG() }}
        style={{ width: '80px', height: '80px', opacity: 0.8 }}
      />
      
      <h2 style={{ 
        fontSize: '22px', 
        fontWeight: 700, 
        color: '#E53E3E',
        margin: 0,
      }}>
        OctiClaw Workflow
      </h2>
      
      <p style={{ 
        fontSize: '14px', 
        color: '#A0AEC0',
        margin: 0,
        textAlign: 'center',
        maxWidth: '320px',
      }}>
        工作流编辑器正在开发中...<br/>
        即将支持可视化流程编排、节点拖拽和自动化执行。
      </p>
      
      {/* 进度指示器 */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          marginTop: '8px',
        }}
      >
        {['设计器', '节点库', '执行引擎', '发布'].map((step, i) => (
          <div key={step} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: i === 0 ? '#E53E3E' : '#FED7D7',
              }}
            />
            <span style={{ fontSize: '11px', color: '#A0AEC0' }}>{step}</span>
            {i < 3 && (
              <div style={{ width: '20px', height: '1px', background: '#FED7D7', marginLeft: '4px' }} />
            )}
          </div>
        ))}
      </div>
      
      {/* 联系提示 */}
      <p style={{
        fontSize: '12px',
        color: '#A0AEC0',
        marginTop: '24px',
      }}>
        了解更多，请联系 OctiClaw 工作流 Agent
      </p>
    </div>
  );
};

function getOctopusWorkflowSVG() {
  return `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="50" cy="40" rx="28" ry="24" fill="#FFF5F5" stroke="#E53E3E" stroke-width="2"/>
      <circle cx="40" cy="36" r="5" fill="#E53E3E"/>
      <circle cx="60" cy="36" r="5" fill="#E53E3E"/>
      <circle cx="41" cy="35" r="2" fill="white"/>
      <circle cx="61" cy="35" r="2" fill="white"/>
      <path d="M 44 47 Q 50 52 56 47" stroke="#FEB2B2" stroke-width="2" fill="none" stroke-linecap="round"/>
      <path d="M 22 55 Q 15 70 18 85" stroke="#E53E3E" stroke-width="6" fill="none" stroke-linecap="round" stroke-dasharray="4 2"/>
      <path d="M 32 58 Q 28 75 30 90" stroke="#E53E3E" stroke-width="6" fill="none" stroke-linecap="round" stroke-dasharray="4 2"/>
      <path d="M 44 60 Q 44 78 42 92" stroke="#E53E3E" stroke-width="6" fill="none" stroke-linecap="round" stroke-dasharray="4 2"/>
      <path d="M 56 60 Q 56 78 58 92" stroke="#E53E3E" stroke-width="6" fill="none" stroke-linecap="round" stroke-dasharray="4 2"/>
      <path d="M 68 58 Q 72 75 70 90" stroke="#E53E3E" stroke-width="6" fill="none" stroke-linecap="round" stroke-dasharray="4 2"/>
      <path d="M 78 55 Q 85 70 82 85" stroke="#E53E3E" stroke-width="6" fill="none" stroke-linecap="round" stroke-dasharray="4 2"/>
    </svg>
  `;
}

export default WorkflowPage;
