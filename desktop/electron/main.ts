/**
 * OctiClaw Desktop - Electron Main Process
 * 
 * 鍔熻兘锛? * - 鍒涘缓鏃犺竟妗嗕富绐楀彛锛?200x800锛? * - 绯荤粺鎵樼洏鏀寔
 * - 鑷姩鏇存柊鏀寔
 * - IPC 閫氫俊
 */

import { app, BrowserWindow, ipcMain, Tray, Menu, nativeImage, shell } from 'electron';
import { autoUpdater } from 'electron-updater';
import path from 'path';
import { fileURLToPath } from 'url';

// 鑾峰彇褰撳墠鏂囦欢鐩綍
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 鐜鍒ゆ柇
const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged;

// 绐楀彛瀹炰緥
let mainWindow: BrowserWindow | null = null;
let tray: Tray | null = null;

/**
 * 鍒涘缓涓荤獥鍙? */
function createWindow(): void {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    frame: false, // 鏃犺竟妗嗭紝浣跨敤鑷畾涔夋爣棰樻爮
    transparent: false,
    backgroundColor: '#FFF5F5', // 绾㈣壊涓婚鑳屾櫙
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, '../preload/preload.js'),
      sandbox: false,
    },
    icon: path.join(__dirname, '../../build/icon.png'),
    show: false, // 鍒濆闅愯棌锛岀瓑寰呭姞杞藉畬鎴?  });

  // 绐楀彛鍑嗗灏辩华鍚庢樉绀?  mainWindow.once('ready-to-show', () => {
    mainWindow?.show();
  });

  // 鍔犺浇椤甸潰
  if (isDev) {
    // 寮€鍙戞ā寮忓姞杞?Vite 寮€鍙戞湇鍔″櫒
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  } else {
    // 鐢熶骇妯″紡鍔犺浇鎵撳寘鍚庣殑鏂囦欢
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  // 澶勭悊澶栭儴閾炬帴
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });
}

/**
 * 鍒涘缓绯荤粺鎵樼洏
 */
function createTray(): void {
  // 鍒涘缓鎵樼洏鍥炬爣锛?6x16 绾㈣壊鍏埅楸肩畝鍖栧浘鏍囷級
  const iconPath = path.join(__dirname, '../../build/tray-icon.png');
  const icon = nativeImage.createFromPath(iconPath);
  
  tray = new Tray(icon);
  
  const contextMenu = Menu.buildFromTemplate([
    { 
      label: '鏄剧ず涓荤獥鍙?, 
      click: () => mainWindow?.show() 
    },
    { 
      label: '闅愯棌涓荤獥鍙?, 
      click: () => mainWindow?.hide() 
    },
    { type: 'separator' },
    { 
      label: '妫€鏌ユ洿鏂?, 
      click: () => checkForUpdates() 
    },
    { type: 'separator' },
    { 
      label: '閫€鍑?, 
      click: () => {
        app.quit();
      }
    },
  ]);
  
  tray.setToolTip('OctiClaw - AI Agent 妗岄潰鍔╂墜');
  tray.setContextMenu(contextMenu);
  
  // 鐐瑰嚮鎵樼洏鍥炬爣鏄剧ず绐楀彛
  tray.on('click', () => {
    mainWindow?.show();
  });
}

/**
 * 妫€鏌ユ洿鏂? */
function checkForUpdates(): void {
  if (isDev) {
    console.log('寮€鍙戞ā寮忥紝璺宠繃鑷姩鏇存柊妫€鏌?);
    return;
  }
  
  autoUpdater.checkForUpdatesAndNotify();
}

/**
 * 璁剧疆 IPC 閫氫俊
 */
function setupIPC(): void {
  // 绐楀彛鎺у埗
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
    mainWindow?.hide(); // 鏈€灏忓寲鍒版墭鐩樿€屼笉鏄€€鍑?  });
  
  ipcMain.handle('window:isMaximized', () => {
    return mainWindow?.isMaximized() ?? false;
  });
  
  // 搴旂敤淇℃伅
  ipcMain.handle('app:getVersion', () => {
    return app.getVersion();
  });
  
  // AI 瀵硅瘽锛氫唬鐞嗗埌 OpenClaw Gateway
  ipcMain.handle('chat:sendMessage', async (_, message: string) => {
    const GATEWAY_TOKEN = 'f017284a880fadcfeade0a7fc8095deb62adcde72f792f15';
    const GATEWAY_URL = 'http://localhost:28789/v1/chat/completions';
    const MODEL = 'qclaw/modelroute';

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 15000);

      const response = await fetch(GATEWAY_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${GATEWAY_TOKEN}`,
        },
        body: JSON.stringify({
          model: MODEL,
          messages: [{ role: 'user', content: message }],
          stream: false,
          max_tokens: 2048,
          temperature: 0.8,
        }),
        signal: controller.signal,
      });
      clearTimeout(timeout);

      if (!response.ok) {
        throw new Error(`Gateway responded with status ${response.status}`);
      }

      const data = await response.json() as {
        choices?: Array<{ message?: { content?: string } }>;
        error?: { message?: string };
      };

      if (data.error) {
        return { success: false, error: data.error.message };
      }

      const content = data.choices?.[0]?.message?.content ?? '';
      return { success: true, content };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      console.error('[OctiClaw] AI Gateway error:', errorMessage);
      return {
        success: false,
        error: `AI 鏈嶅姟鏆傛椂涓嶅彲鐢紙${errorMessage}锛夛紝璇锋鏌?OpenClaw Gateway 鏄惁杩愯涓€俙,
      };
    }
  });

  // 鑷姩鏇存柊
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

// 搴旂敤灏辩华
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

// 鎵€鏈夌獥鍙ｅ叧闂椂锛坢acOS 闄ゅ锛?app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// 瀹夊叏璁剧疆锛氱姝㈠鑸埌鏈煡鏉ユ簮
app.on('web-contents-created', (_, contents) => {
  contents.on('will-navigate', (event) => {
    event.preventDefault();
  });
});
