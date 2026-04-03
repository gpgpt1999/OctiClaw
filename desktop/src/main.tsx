/**
 * OctiClaw - React 应用入口
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// 全局样式（Tailwind 兼容）
const globalStyles = document.createElement('style');
globalStyles.textContent = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body, #root { height: 100%; }
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    background: #FFF5F5;
    overflow: hidden;
  }
  /* 滚动条样式 */
  ::-webkit-scrollbar { width: 6px; height: 6px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: #FEB2B2; border-radius: 3px; }
  ::-webkit-scrollbar-thumb:hover { background: #FC8181; }
  /* 加载动画 */
  @keyframes bounce {
    0%, 80%, 100% { transform: scale(0); }
    40% { transform: scale(1); }
  }
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
`;
document.head.appendChild(globalStyles);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
