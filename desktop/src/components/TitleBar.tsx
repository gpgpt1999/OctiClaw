/**
 * OctiClaw - 自定义标题栏组件
 * 无边框窗口的标题栏，带拖拽区域和窗口控制按钮
 */

import React, { useState, useEffect } from 'react';
import { theme } from '../styles/theme';

interface TitleBarProps {
  title?: string;
}

export const TitleBar: React.FC<TitleBarProps> = ({ 
  title = 'OctiClaw - AI Agent 桌面助手' 
}) => {
  const [isMaximized, setIsMaximized] = useState(false);

  useEffect(() => {
    // 获取初始最大化状态
    if (window.electronAPI) {
      window.electronAPI.window.isMaximized().then(setIsMaximized);
    }
  }, []);

  const handleMinimize = () => {
    window.electronAPI?.window.minimize();
  };

  const handleMaximize = async () => {
    await window.electronAPI?.window.maximize();
    const maximized = await window.electronAPI?.window.isMaximized();
    setIsMaximized(maximized ?? false);
  };

  const handleClose = () => {
    window.electronAPI?.window.close();
  };

  return (
    <div 
      className="title-bar"
      style={{
        height: '36px',
        background: 'linear-gradient(135deg, #E53E3E 0%, #C53030 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: '12px',
        paddingRight: '4px',
        WebkitAppRegion: 'drag', // 拖拽区域
        userSelect: 'none',
        flexShrink: 0,
      }}
    >
      {/* 左侧：Logo + 标题 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {/* OctiClaw 八爪鱼图标 */}
        <div 
          dangerouslySetInnerHTML={{ __html: getOctopusSVG() }}
          style={{ width: '22px', height: '22px' }}
        />
        <span style={{ 
          color: '#FFFFFF', 
          fontSize: '13px', 
          fontWeight: 600,
          letterSpacing: '0.3px',
        }}>
          {title}
        </span>
      </div>

      {/* 右侧：窗口控制按钮 */}
      <div style={{ 
        display: 'flex', 
        WebkitAppRegion: 'no-drag', // 按钮区域不拖拽
      }}>
        {/* 最小化 */}
        <WindowButton 
          onClick={handleMinimize}
          icon={getMinimizeIcon()}
          title="最小化"
        />
        {/* 最大化/还原 */}
        <WindowButton 
          onClick={handleMaximize}
          icon={isMaximized ? getRestoreIcon() : getMaximizeIcon()}
          title={isMaximized ? '还原' : '最大化'}
        />
        {/* 关闭 */}
        <WindowButton 
          onClick={handleClose}
          icon={getCloseIcon()}
          title="关闭"
          isClose
        />
      </div>
    </div>
  );
};

// 单个窗口按钮
interface WindowButtonProps {
  onClick: () => void;
  icon: React.ReactNode;
  title: string;
  isClose?: boolean;
}

const WindowButton: React.FC<WindowButtonProps> = ({ onClick, icon, title, isClose }) => (
  <button
    onClick={onClick}
    title={title}
    aria-label={title}
    style={{
      width: '46px',
      height: '36px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      transition: 'background 0.15s ease',
      color: '#FFFFFF',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.background = isClose ? '#FC8181' : 'rgba(255,255,255,0.15)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.background = 'transparent';
    }}
    onMouseDown={(e) => {
      e.currentTarget.style.background = isClose ? '#F56565' : 'rgba(255,255,255,0.25)';
    }}
    onMouseUp={(e) => {
      e.currentTarget.style.background = isClose ? '#FC8181' : 'rgba(255,255,255,0.15)';
    }}
  >
    {icon}
  </button>
);

// === SVG 图标 ===
function getMinimizeIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <rect y="5" width="12" height="2" rx="1" fill="currentColor"/>
    </svg>
  );
}

function getMaximizeIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <rect x="0.5" y="0.5" width="11" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    </svg>
  );
}

function getRestoreIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <rect x="2.5" y="0.5" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <rect x="0.5" y="2.5" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5" fill="#C53030"/>
    </svg>
  );
}

function getCloseIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function getOctopusSVG() {
  return `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="50" cy="40" rx="28" ry="24" fill="#FFFFFF"/>
      <circle cx="40" cy="36" r="5" fill="#E53E3E"/>
      <circle cx="60" cy="36" r="5" fill="#E53E3E"/>
      <circle cx="42" cy="36" r="2" fill="white"/>
      <circle cx="62" cy="36" r="2" fill="white"/>
      <path d="M 44 47 Q 50 51 56 47" stroke="#C53030" stroke-width="2" fill="none" stroke-linecap="round"/>
      <path d="M 22 55 Q 15 70 18 85" stroke="#FFFFFF" stroke-width="7" fill="none" stroke-linecap="round"/>
      <path d="M 32 58 Q 28 75 30 90" stroke="#FFFFFF" stroke-width="7" fill="none" stroke-linecap="round"/>
      <path d="M 44 60 Q 44 78 42 92" stroke="#FFFFFF" stroke-width="7" fill="none" stroke-linecap="round"/>
      <path d="M 56 60 Q 56 78 58 92" stroke="#FFFFFF" stroke-width="7" fill="none" stroke-linecap="round"/>
      <path d="M 68 58 Q 72 75 70 90" stroke="#FFFFFF" stroke-width="7" fill="none" stroke-linecap="round"/>
      <path d="M 78 55 Q 85 70 82 85" stroke="#FFFFFF" stroke-width="7" fill="none" stroke-linecap="round"/>
    </svg>
  `;
}

export default TitleBar;
