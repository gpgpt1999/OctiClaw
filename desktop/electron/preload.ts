/**
 * OctiClaw Desktop - Preload Script
 * 
 * 瀹夊叏妗ユ帴锛氫娇鐢?contextBridge 鏆撮湶 API 缁欐覆鏌撹繘绋? * 閬垮厤鐩存帴鏆撮湶 Node.js/Electron API
 */

import { contextBridge, ipcRenderer } from 'electron';

// 瀹氫箟鏆撮湶鐨?API 绫诲瀷
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
}

// 鏆撮湶瀹夊叏鐨?API
contextBridge.exposeInMainWorld('electronAPI', {
  // 绐楀彛鎺у埗
  window: {
    minimize: () => ipcRenderer.invoke('window:minimize'),
    maximize: () => ipcRenderer.invoke('window:maximize'),
    close: () => ipcRenderer.invoke('window:close'),
    isMaximized: () => ipcRenderer.invoke('window:isMaximized'),
  },
  
  // 搴旂敤淇℃伅
  app: {
    getVersion: () => ipcRenderer.invoke('app:getVersion'),
  },
  
  // 鑷姩鏇存柊
  update: {
    check: () => ipcRenderer.invoke('update:check'),
    onAvailable: (callback: () => void) => {
      ipcRenderer.on('update:available', callback);
    },
    onDownloaded: (callback: () => void) => {
      ipcRenderer.on('update:downloaded', callback);
    },
  },

  // AI 瀵硅瘽
  chat: {
    sendMessage: (message: string): Promise<{ success: boolean; content?: string; error?: string }> =>
      ipcRenderer.invoke('chat:sendMessage', message),
  },
} as ElectronAPI);

// 澹版槑鍏ㄥ眬绫诲瀷
declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}
