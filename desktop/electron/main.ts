/**
 * OctiClaw Desktop - Electron Main Process
 *
 * 功能：
 * - 创建无边框主窗口（1200x800）
 * - 系统托盘支持
 * - 自动更新支持
 * - IPC 通信
 * - SiliconFlow AI 对话（内置免费 Qwen2.5 模型）
 */

import { app, BrowserWindow, ipcMain, Tray, Menu, nativeImage, shell } from 'electron';
import { autoUpdater } from 'electron-updater';
import path from 'path';
import { fileURLToPath } from 'url';

// 获取当前文件目录
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 环境判断
const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged;

// SiliconFlow 配置
const SILICONFLOW_CONFIG = {
  apiUrl: 'https://api.siliconflow.cn/v1/chat/completions',
  defaultModel: 'Qwen/Qwen2.5-7B-Instruct',
  // 免费模型列表
  freeModels: [
    'Qwen/Qwen2.5-7B-Instruct',
    'deepseek-ai/DeepSeek-V2.5',
    'Pro/Qwen/Qwen2.5-72B-Instruct',
  ],
};

// 持久化存储（使用文件存储 API Key）
const CONFIG_PATH = path.join(app.getPath('userData'), 'config.json');

async function loadConfig(): Promise<Record<string, string>> {
  try {
    const fs = await import('fs/promises');
    const data = await fs.readFile(CONFIG_PATH, 'utf-8');
    return JSON.parse(data);
  } catch {
    return {};
  }
}

async function saveConfig(config: Record<string, string>): Promise<void> {
  try {
    const fs = await import('fs/promises');
    await fs.writeFile(CONFIG_PATH, JSON.stringify(config, null, 2), 'utf-8');
  } catch (err) {
    console.error('[OctiClaw] Failed to save config:', err);
  }
}

// 窗口实例
let mainWindow: BrowserWindow | null = null;
let tray: Tray | null = null;

/**
 * 创建主窗口
 */
function createWindow(): void {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    frame: false,
    transparent: false,
    backgroundColor: '#FFF5F5',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, '../preload/preload.js'),
      sandbox: false,
    },
    icon: path.join(__dirname, '../../build/icon.png'),
    show: false,
  });

  mainWindow.once('ready-to-show', () => {
    mainWindow?.show();
  });

  if (isDev) {
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });
}

/**
 * 创建系统托盘
 */
function createTray(): void {
  const iconPath = path.join(__dirname, '../../build/tray-icon.png');
  const icon = nativeImage.createFromPath(iconPath);

  tray = new Tray(icon);

  const contextMenu = Menu.buildFromTemplate([
    { label: '显示主窗口', click: () => mainWindow?.show() },
    { label: '隐藏主窗口', click: () => mainWindow?.hide() },
    { type: 'separator' },
    { label: '检查更新', click: () => checkForUpdates() },
    { type: 'separator' },
    { label: '退出', click: () => app.quit() },
  ]);

  tray.setToolTip('OctiClaw - AI Agent 桌面助手');
  tray.setContextMenu(contextMenu);
  tray.on('click', () => mainWindow?.show());
}

/**
 * 检查更新
 */
function checkForUpdates(): void {
  if (isDev) {
    console.log('开发模式，跳过自动更新检查');
    return;
  }
  autoUpdater.checkForUpdatesAndNotify();
}

/**
 * 调用 SiliconFlow AI
 */
async function callSiliconFlowAI(apiKey: string, model: string, message: string): Promise<{ success: boolean; content?: string; error?: string }> {
  const systemPrompt = `你是一个友善、智能的 AI 助手，名叫 OctiClaw（八爪章）。你的目标是帮助用户回答问题、解决问题。请用简洁、有帮助的方式回答。`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30000);

  try {
    const response = await fetch(SILICONFLOW_CONFIG.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: model || SILICONFLOW_CONFIG.defaultModel,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message },
        ],
        stream: false,
        max_tokens: 2048,
        temperature: 0.7,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!response.ok) {
      let errorDetail = `HTTP ${response.status}`;
      try {
        const errBody = await response.json() as { error?: { message?: string } };
        errorDetail = errBody?.error?.message || errorDetail;
      } catch {}
      throw new Error(errorDetail);
    }

    const data = await response.json() as {
      choices?: Array<{ message?: { content?: string } }>;
      error?: { message?: string };
    };

    if (data.error) {
      return { success: false, error: data.error.message };
    }

    const content = data.choices?.[0]?.message?.content ?? '';
    if (!content) {
      return { success: false, error: 'AI 返回内容为空，请稍后重试。' };
    }

    return { success: true, content };
  } catch (err) {
    clearTimeout(timeout);
    const msg = err instanceof Error ? err.message : String(err);
    console.error('[OctiClaw] SiliconFlow AI error:', msg);
    return {
      success: false,
      error: `AI 服务请求失败：${msg}\n\n请检查 API Key 是否正确，或前往 https://cloud.siliconflow.cn 注册获取免费 API Key。`,
    };
  }
}

/**
 * 设置 IPC 通信
 */
function setupIPC(): void {
  // 窗口控制
  ipcMain.handle('window:minimize', () => mainWindow?.minimize());
  ipcMain.handle('window:maximize', () => {
    if (mainWindow?.isMaximized()) {
      mainWindow.unmaximize();
    } else {
      mainWindow?.maximize();
    }
  });
  ipcMain.handle('window:close', () => mainWindow?.hide());
  ipcMain.handle('window:isMaximized', () => mainWindow?.isMaximized() ?? false);

  // 应用信息
  ipcMain.handle('app:getVersion', () => app.getVersion());

  // ========== AI 对话（SiliconFlow） ==========
  ipcMain.handle('chat:sendMessage', async (_, message: string) => {
    const config = await loadConfig();
    const apiKey = config.siliconflowApiKey || '';

    if (!apiKey) {
      return {
        success: false,
        error: '请先在设置页面配置 SiliconFlow API Key。\n\n免费注册：https://cloud.siliconflow.cn\n\n免费模型：Qwen2.5-7B-Instruct',
      };
    }

    const model = config.aiModel || SILICONFLOW_CONFIG.defaultModel;
    return await callSiliconFlowAI(apiKey, model, message);
  });

  // ========== 设置管理 ==========
  ipcMain.handle('settings:get', async () => {
    const config = await loadConfig();
    return {
      siliconflowApiKey: config.siliconflowApiKey || '',
      aiModel: config.aiModel || SILICONFLOW_CONFIG.defaultModel,
      theme: config.theme || 'light',
      language: config.language || 'zh-CN',
      autoStart: config.autoStart === 'true',
      minimizeToTray: config.minimizeToTray !== 'false',
      notifications: config.notifications !== 'false',
    };
  });

  ipcMain.handle('settings:set', async (_, settings: Record<string, string>) => {
    const config = await loadConfig();
    Object.assign(config, settings);
    await saveConfig(config);
    return { success: true };
  });

  ipcMain.handle('settings:getAvailableModels', () => {
    return SILICONFLOW_CONFIG.freeModels;
  });

  // 自动更新
  ipcMain.handle('update:check', async () => {
    try {
      const result = await autoUpdater.checkForUpdates();
      return { available: result?.updateInfo?.version !== app.getVersion() };
    } catch {
      return { available: false };
    }
  });

  autoUpdater.on('update-available', () => {
    mainWindow?.webContents.send('update:available');
  });
  autoUpdater.on('update-downloaded', () => {
    mainWindow?.webContents.send('update:downloaded');
  });
}

// 应用就绪
app.whenReady().then(() => {
  createWindow();
  createTray();
  setupIPC();
  checkForUpdates();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// 所有窗口关闭时（macOS 除外）
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// 安全设置：禁止导航到未知来源
app.on('web-contents-created', (_, contents) => {
  contents.on('will-navigate', (event) => {
    event.preventDefault();
  });
});
