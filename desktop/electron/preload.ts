/**
 * OctiClaw Desktop - Preload Script
 *
 * 安全桥接：使用 contextBridge 暴露 API 给渲染进程
 * 避免直接暴露 Node.js/Electron API
 */

import { contextBridge, ipcRenderer } from 'electron';

// 定义暴露的 API 类型
export interface ElectronAPI {
  window: {
    minimize: () => Promise<void>;
    maximize: () => Promise<void>;
    close: () => Promise<void>;
    isMaximized: () => Promise<boolean>;
  };
  app: {
    getVersion: () => Promise<string>;
  };
  update: {
    check: () => Promise<{ available: boolean }>;
    onAvailable: (callback: () => void) => void;
    onDownloaded: (callback: () => void) => void;
  };
  chat: {
    sendMessage: (message: string) => Promise<{ success: boolean; content?: string; error?: string }>;
  };
  settings: {
    get: () => Promise<{
      siliconflowApiKey: string;
      aiModel: string;
      theme: string;
      language: string;
      autoStart: boolean;
      minimizeToTray: boolean;
      notifications: boolean;
    }>;
    set: (settings: Record<string, string>) => Promise<{ success: boolean }>;
    getAvailableModels: () => Promise<string[]>;
  };
}

// 暴露安全的 API
contextBridge.exposeInMainWorld('electronAPI', {
  // 窗口控制
  window: {
    minimize: () => ipcRenderer.invoke('window:minimize'),
    maximize: () => ipcRenderer.invoke('window:maximize'),
    close: () => ipcRenderer.invoke('window:close'),
    isMaximized: () => ipcRenderer.invoke('window:isMaximized'),
  },

  // 应用信息
  app: {
    getVersion: () => ipcRenderer.invoke('app:getVersion'),
  },

  // 自动更新
  update: {
    check: () => ipcRenderer.invoke('update:check'),
    onAvailable: (callback: () => void) => {
      ipcRenderer.on('update:available', callback);
    },
    onDownloaded: (callback: () => void) => {
      ipcRenderer.on('update:downloaded', callback);
    },
  },

  // AI 对话
  chat: {
    sendMessage: (message: string): Promise<{ success: boolean; content?: string; error?: string }> =>
      ipcRenderer.invoke('chat:sendMessage', message),
  },

  // 设置管理
  settings: {
    get: () => ipcRenderer.invoke('settings:get'),
    set: (settings: Record<string, string>) => ipcRenderer.invoke('settings:set', settings),
    getAvailableModels: () => ipcRenderer.invoke('settings:getAvailableModels'),
  },
} as ElectronAPI);

// 声明全局类型
declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}
