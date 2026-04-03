/**
 * OctiClaw - 侧边栏导航组件
 * 包含：对话 / 工作流 / Skills / 设置
 */

import React from 'react';

export type NavPage = 'chat' | 'workflow' | 'skills' | 'settings';

interface SidebarProps {
  currentPage: NavPage;
  onNavigate: (page: NavPage) => void;
}

const navItems: { id: NavPage; label: string; icon: React.ReactNode }[] = [
  { 
    id: 'chat', 
    label: '对话',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
  },
  { 
    id: 'workflow', 
    label: '工作流',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
  },
  { 
    id: 'skills', 
    label: 'Skills',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
  },
  { 
    id: 'settings', 
    label: '设置',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
      </svg>
    ),
  },
];

export const Sidebar: React.FC<SidebarProps> = ({ currentPage, onNavigate }) => {
  return (
    <nav
      style={{
        width: '200px',
        background: 'linear-gradient(180deg, #E53E3E 0%, #C53030 100%)',
        display: 'flex',
        flexDirection: 'column',
        paddingTop: '16px',
        flexShrink: 0,
        boxShadow: '2px 0 8px rgba(229, 62, 62, 0.3)',
      }}
    >
      {/* 顶部 Logo 区域 */}
      <div style={{
        padding: '8px 16px 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
      }}>
        {/* 八爪鱼吉祥物 */}
        <div 
          dangerouslySetInnerHTML={{ __html: getOctopusSVG() }}
          style={{ width: '56px', height: '56px', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}
        />
        <span style={{ 
          color: '#FFFFFF', 
          fontSize: '18px', 
          fontWeight: 700,
          letterSpacing: '1px',
          textShadow: '0 1px 2px rgba(0,0,0,0.2)',
        }}>
          OctiClaw
        </span>
      </div>

      {/* 导航项 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', padding: '0 8px', flex: 1 }}>
        {navItems.map((item) => {
          const isActive = currentPage === item.id;
          return (
            <NavItem 
              key={item.id}
              item={item}
              isActive={isActive}
              onClick={() => onNavigate(item.id)}
            />
          );
        })}
      </div>

      {/* 底部：版本信息 */}
      <div style={{
        padding: '16px',
        textAlign: 'center',
        color: 'rgba(255,255,255,0.6)',
        fontSize: '11px',
        borderTop: '1px solid rgba(255,255,255,0.15)',
      }}>
        v0.1.0
      </div>
    </nav>
  );
};

// 单个导航项
interface NavItemProps {
  item: { id: NavPage; label: string; icon: React.ReactNode };
  isActive: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ item, isActive, onClick }) => (
  <button
    onClick={onClick}
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '10px 14px',
      borderRadius: '8px',
      border: 'none',
      background: isActive ? 'rgba(255,255,255,0.25)' : 'transparent',
      color: isActive ? '#FFFFFF' : 'rgba(255,255,255,0.8)',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: isActive ? 600 : 400,
      transition: 'all 0.15s ease',
      textAlign: 'left',
      width: '100%',
    }}
    onMouseEnter={(e) => {
      if (!isActive) {
        e.currentTarget.style.background = 'rgba(255,255,255,0.12)';
        e.currentTarget.style.color = '#FFFFFF';
      }
    }}
    onMouseLeave={(e) => {
      if (!isActive) {
        e.currentTarget.style.background = 'transparent';
        e.currentTarget.style.color = 'rgba(255,255,255,0.8)';
      }
    }}
  >
    <span style={{ flexShrink: 0 }}>{item.icon}</span>
    {item.label}
  </button>
);

function getOctopusSVG() {
  return `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="50" cy="40" rx="28" ry="24" fill="#FFFFFF"/>
      <circle cx="40" cy="36" r="6" fill="#E53E3E"/>
      <circle cx="60" cy="36" r="6" fill="#E53E3E"/>
      <circle cx="42" cy="35" r="2.5" fill="white"/>
      <circle cx="62" cy="35" r="2.5" fill="white"/>
      <path d="M 43 47 Q 50 53 57 47" stroke="#FC8181" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <path d="M 22 55 Q 15 70 18 85" stroke="#FFFFFF" stroke-width="7" fill="none" stroke-linecap="round"/>
      <path d="M 32 58 Q 28 75 30 90" stroke="#FFFFFF" stroke-width="7" fill="none" stroke-linecap="round"/>
      <path d="M 44 60 Q 44 78 42 92" stroke="#FFFFFF" stroke-width="7" fill="none" stroke-linecap="round"/>
      <path d="M 56 60 Q 56 78 58 92" stroke="#FFFFFF" stroke-width="7" fill="none" stroke-linecap="round"/>
      <path d="M 68 58 Q 72 75 70 90" stroke="#FFFFFF" stroke-width="7" fill="none" stroke-linecap="round"/>
      <path d="M 78 55 Q 85 70 82 85" stroke="#FFFFFF" stroke-width="7" fill="none" stroke-linecap="round"/>
      <ellipse cx="30" cy="44" rx="5" ry="3" fill="#FEB2B2" opacity="0.8"/>
      <ellipse cx="70" cy="44" rx="5" ry="3" fill="#FEB2B2" opacity="0.8"/>
    </svg>
  `;
}

export default Sidebar;
