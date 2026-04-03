interface WindowElectronAPI {
  minimize: () => void;
  maximize: () => void;
  close: () => void;
  isMaximized: () => Promise<boolean>;
  onMaximizedChange?: (callback: (isMaximized: boolean) => void) => void;
}

interface ElectronAppAPI {
  getVersion: () => Promise<string>;
}

interface ElectronChatAPI {
  sendMessage: (message: string) => Promise<{ success: boolean; content?: string; error?: string }>;
}

interface ElectronSettingsAPI {
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
}

interface ElectronUpdateAPI {
  check: () => Promise<{ available: boolean }>;
  onAvailable?: (callback: () => void) => void;
  onDownloaded?: (callback: () => void) => void;
}

interface ElectronAPI {
  window: WindowElectronAPI;
  app: ElectronAppAPI;
  chat?: ElectronChatAPI;
  update?: ElectronUpdateAPI;
  settings?: ElectronSettingsAPI;
  getStore?: (key: string) => Promise<unknown>;
  setStore?: (key: string, value: unknown) => Promise<void>;
  selectDirectory?: () => Promise<string | null>;
  openExternal?: (url: string) => void;
  showItemInFolder?: (path: string) => void;
}

interface Window {
  electronAPI: ElectronAPI;
}
