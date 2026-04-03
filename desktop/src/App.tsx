/**
 * OctiClaw - 主应用组件
 * 
 * 整体布局：
 * - 自定义标题栏（TitleBar）
 * - 侧边栏（Sidebar）
 * - 主内容区域（根据当前页面显示不同组件）
 */

import React, { useState } from 'react';
import { TitleBar } from './components/TitleBar';
import { Sidebar, NavPage } from './components/Sidebar';
import { ChatPage } from './pages/Chat';
import { WorkflowPage } from './pages/Workflow';
import { SkillsPage } from './pages/Skills';

// 设置页面（内联，暂不需要独立文件）
import { SettingsPage } from './pages/Settings';

// 页面组件映射
const pages: Record<NavPage, React.FC> = {
  chat: ChatPage,
  workflow: WorkflowPage,
  skills: SkillsPage,
  settings: SettingsPage,
};

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<NavPage>('chat');

  const PageComponent = pages[currentPage];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        backgroundColor: '#FFF5F5',
        overflow: 'hidden',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      {/* 自定义标题栏 */}
      <TitleBar />

      {/* 主体区域：侧边栏 + 内容 */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* 侧边栏 */}
        <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />

        {/* 主内容区域 */}
        <main
          style={{
            flex: 1,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#FFF5F5',
          }}
        >
          <PageComponent />
        </main>
      </div>
    </div>
  );
};

export default App;
