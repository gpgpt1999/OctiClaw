/**
 * OctiClaw Desktop - Electron Main Process
 * 
 * 功能：
 * - 创建无边框主窗口（1200x800）
 * - 系统托盘支持
 * - 自动更新支持
 * - IPC 通信
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
    frame: false, // 无边框，使用自定义标题栏
    transparent: false,
    backgroundColor: '#FFF5F5', // 红色主题背景
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, '../preload/index.js'),
      sandbox: false,
    },
    icon: path.join(__dirname, '../../build/icon.png'),
    show: false, // 初始隐藏，等待加载完成
  });

  // 窗口准备就绪后显示
  mainWindow.once('ready-to-show', () => {
    mainWindow?.show();
  });

  // 加载页面
  if (isDev) {
    // 开发模式加载 Vite 开发服务器
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  } else {
    // 生产模式加载打包后的文件
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  // 处理外部链接
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });
}

/**
 * 创建系统托盘
 */
function createTray(): void {
  // 创建托盘图标（16x16 红色八爪鱼简化图标）
  const iconPath = path.join(__dirname, '../../build/tray-icon.png');
  const icon = nativeImage.createFromPath(iconPath);
  
  tray = new Tray(icon);
  
  const contextMenu = Menu.buildFromTemplate([
    { 
      label: '显示主窗口', 
      click: () => mainWindow?.show() 
    },
    { 
      label: '隐藏主窗口', 
      click: () => mainWindow?.hide() 
    },
    { type: 'separator' },
    { 
      label: '检查更新', 
      click: () => checkForUpdates() 
    },
    { type: 'separator' },
    { 
      label: '退出', 
      click: () => {
        app.quit();
      }
    },
  ]);
  
  tray.setToolTip('OctiClaw - AI Agent 桌面助手');
  tray.setContextMenu(contextMenu);
  
  // 点击托盘图标显示窗口
  tray.on('click', () => {
    mainWindow?.show();
  });
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
 * 设置 IPC 通信
 */
function setupIPC(): void {
  // 窗口控制
  ipcMain.handle('window:minimize', () => {
    mainWindow?.minimize();
  });
  
  ipcMain.handle('window:maximize', () => {
    if (mainWindow?.isMaximized()) {
      mainWindow.unmaximize();
    } else {
      mainWindow?.maximize();
    }
  });
  
  ipcMain.handle('window:close', () => {
    mainWindow?.hide(); // 最小化到托盘而不是退出
  });
  
  ipcMain.handle('window:isMaximized', () => {
    return mainWindow?.isMaximized() ?? false;
  });
  
  // 应用信息
  ipcMain.handle('app:getVersion', () => {
    return app.getVersion();
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
