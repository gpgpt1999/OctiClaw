/**
 * OctiClaw - Skills 管理页面
 * 显示已安装的 Skills 和可安装的 Skills
 */

import React, { useState } from 'react';

interface Skill {
  id: string;
  name: string;
  description: string;
  author: string;
  version: string;
  installed: boolean;
}

// 模拟已安装的 Skills
const installedSkills: Skill[] = [
  {
    id: 'chat',
    name: 'Chat',
    description: '核心对话能力，连接 AI 大模型进行智能对话',
    author: 'OctiClaw',
    version: '1.0.0',
    installed: true,
  },
  {
    id: 'weather',
    name: 'Weather Advisor',
    description: '智能天气顾问，提供实时天气查询和出行建议',
    author: 'OctiClaw',
    version: '1.0.0',
    installed: true,
  },
  {
    id: 'email',
    name: 'Email Skill',
    description: '统一邮件管理，支持多平台邮箱收发',
    author: 'OctiClaw',
    version: '1.0.0',
    installed: true,
  },
];

// 模拟可安装的 Skills
const availableSkills: Skill[] = [
  {
    id: 'code-review',
    name: 'Code Review',
    description: '自动化代码审查，支持 GitHub PR 评审',
    author: 'Community',
    version: '0.9.0',
    installed: false,
  },
  {
    id: 'web-scraper',
    name: 'Web Scraper',
    description: '网页内容抓取与提取，支持多种网站结构',
    author: 'Community',
    version: '1.2.0',
    installed: false,
  },
  {
    id: 'file-organizer',
    name: 'File Organizer',
    description: '智能文件整理，自动归类桌面和下载文件夹',
    author: 'OctiClaw',
    version: '1.0.0',
    installed: false,
  },
  {
    id: 'news-digest',
    name: 'News Digest',
    description: '多源新闻聚合摘要，每日热点速递',
    author: 'Community',
    version: '0.8.0',
    installed: false,
  },
];

type Tab = 'installed' | 'available';

export const SkillsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('installed');
  const [skills, setSkills] = useState<Skill[]>([
    ...installedSkills,
    ...availableSkills,
  ]);
  const [installingId, setInstallingId] = useState<string | null>(null);

  const installedList = skills.filter((s) => s.installed);
  const availableList = skills.filter((s) => !s.installed);

  const handleInstall = async (skill: Skill) => {
    setInstallingId(skill.id);
    // 模拟安装过程
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSkills((prev) =>
      prev.map((s) => (s.id === skill.id ? { ...s, installed: true } : s))
    );
    setInstallingId(null);
  };

  const handleUninstall = async (skill: Skill) => {
    setSkills((prev) =>
      prev.map((s) => (s.id === skill.id ? { ...s, installed: false } : s))
    );
  };

  const currentList = activeTab === 'installed' ? installedList : availableList;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '16px' }}>
      {/* 标题 */}
      <div style={{ marginBottom: '16px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#E53E3E', margin: '0 0 4px 0' }}>
          Skills 管理
        </h2>
        <p style={{ fontSize: '13px', color: '#A0AEC0', margin: 0 }}>
          扩展 OctiClaw 的能力，安装更多 Skills
        </p>
      </div>

      {/* 标签页 */}
      <div style={{ display: 'flex', gap: '4px', marginBottom: '16px', background: '#FFFFFF', padding: '4px', borderRadius: '10px', width: 'fit-content' }}>
        <TabButton 
          label={`已安装 (${installedList.length})`} 
          active={activeTab === 'installed'} 
          onClick={() => setActiveTab('installed')} 
        />
        <TabButton 
          label={`发现 (${availableList.length})`} 
          active={activeTab === 'available'} 
          onClick={() => setActiveTab('available')} 
        />
      </div>

      {/* 技能卡片列表 */}
      <div style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {currentList.length === 0 ? (
          <EmptyState tab={activeTab} />
        ) : (
          currentList.map((skill) => (
            <SkillCard
              key={skill.id}
              skill={skill}
              isInstalling={installingId === skill.id}
              onInstall={() => handleInstall(skill)}
              onUninstall={() => handleUninstall(skill)}
            />
          ))
        )}
      </div>
    </div>
  );
};

// 标签页按钮
const TabButton: React.FC<{ label: string; active: boolean; onClick: () => void }> = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    style={{
      padding: '6px 16px',
      borderRadius: '7px',
      border: 'none',
      background: active ? '#E53E3E' : 'transparent',
      color: active ? '#FFFFFF' : '#A0AEC0',
      cursor: 'pointer',
      fontSize: '13px',
      fontWeight: active ? 600 : 400,
      transition: 'all 0.15s ease',
    }}
  >
    {label}
  </button>
);

// 单个 Skill 卡片
const SkillCard: React.FC<{
  skill: Skill;
  isInstalling: boolean;
  onInstall: () => void;
  onUninstall: () => void;
}> = ({ skill, isInstalling, onInstall, onUninstall }) => (
  <div
    style={{
      background: '#FFFFFF',
      borderRadius: '12px',
      padding: '16px',
      border: '1px solid #FED7D7',
      display: 'flex',
      alignItems: 'center',
      gap: '14px',
      boxShadow: '0 1px 3px rgba(229, 62, 62, 0.06)',
    }}
  >
    {/* 技能图标 */}
    <div
      style={{
        width: '48px',
        height: '48px',
        borderRadius: '12px',
        background: skill.installed ? '#FFF5F5' : '#F7FAFC',
        border: `1px solid ${skill.installed ? '#FEB2B2' : '#E2E8F0'}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        fontSize: '22px',
      }}
    >
      {skill.installed ? '🐙' : '📦'}
    </div>

    {/* 信息 */}
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
        <span style={{ fontSize: '15px', fontWeight: 600, color: '#1A202C' }}>{skill.name}</span>
        <span style={{ fontSize: '11px', color: '#A0AEC0', background: '#F7FAFC', padding: '1px 6px', borderRadius: '4px' }}>
          v{skill.version}
        </span>
        {skill.installed && (
          <span style={{ fontSize: '11px', color: '#48BB78', background: '#F0FFF4', padding: '1px 6px', borderRadius: '4px' }}>
            已安装
          </span>
        )}
      </div>
      <p style={{ fontSize: '12px', color: '#A0AEC0', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {skill.description}
      </p>
      <span style={{ fontSize: '11px', color: '#CBD5E0' }}>by {skill.author}</span>
    </div>

    {/* 操作按钮 */}
    <div style={{ flexShrink: 0 }}>
      {skill.installed ? (
        <button
          onClick={onUninstall}
          style={{
            padding: '6px 14px',
            borderRadius: '7px',
            border: '1px solid #FEB2B2',
            background: 'transparent',
            color: '#E53E3E',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: 500,
            transition: 'all 0.15s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#FFF5F5';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
          }}
        >
          卸载
        </button>
      ) : (
        <button
          onClick={onInstall}
          disabled={isInstalling}
          style={{
            padding: '6px 14px',
            borderRadius: '7px',
            border: 'none',
            background: isInstalling ? '#FEB2B2' : '#E53E3E',
            color: '#FFFFFF',
            cursor: isInstalling ? 'not-allowed' : 'pointer',
            fontSize: '12px',
            fontWeight: 500,
            transition: 'all 0.15s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          {isInstalling ? (
            <>
              <LoadingSpinner />
              安装中...
            </>
          ) : (
            '安装'
          )}
        </button>
      )}
    </div>
  </div>
);

// 加载旋转器
const LoadingSpinner: React.FC = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ animation: 'spin 1s linear infinite' }}>
    <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
  </svg>
);

// 空状态
const EmptyState: React.FC<{ tab: Tab }> = ({ tab }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '200px', color: '#A0AEC0' }}>
    <span style={{ fontSize: '40px', marginBottom: '12px' }}>{tab === 'installed' ? '📦' : '🔍'}</span>
    <p style={{ fontSize: '14px' }}>
      {tab === 'installed' ? '还没有安装任何 Skill' : '没有找到更多 Skills'}
    </p>
  </div>
);

export default SkillsPage;
