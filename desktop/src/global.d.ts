interface WindowElectronAPI {
  minimize: () => void;
  maximize: () => void;
  close: () => void;
  isMaximized: () => Promise<boolean>;
  onMaximizedChange: (callback: (isMaximized: boolean) => void) => void;
}

interface ElectronAppAPI {
  getVersion: () => Promise<string>;
}

interface ElectronChatAPI {
  sendMessage: (message: string) => Promise<{ success: boolean; content?: string; error?: string }>;
}

interface ElectronAPI {
  window: WindowElectronAPI;
  app: ElectronAppAPI;
  chat?: ElectronChatAPI;
  getStore: (key: string) => Promise<any>;
  setStore: (key: string, value: any) => Promise<void>;
  selectDirectory: () => Promise<string | null>;
  openExternal: (url: string) => void;
  showItemInFolder: (path: string) => void;
}

interface Window {
  electronAPI: ElectronAPI;
}
