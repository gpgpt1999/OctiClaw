# OctiClaw Desktop

> AI Agent 桌面应用 · OctiClaw 🐙

## 技术栈

- **Electron** - 跨平台桌面框架
- **React 18** - UI 组件库
- **TypeScript** - 类型安全
- **Vite** - 极速构建工具
- **Tailwind CSS** - 样式框架

## 快速开始

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 构建 Windows 安装包
npm run build
```

## 项目结构

```
desktop/
├── electron/          # Electron 主进程代码
│   ├── main.ts       # 主进程入口
│   └── preload.ts    # 预加载脚本（安全桥接）
├── src/              # React 前端代码
│   ├── App.tsx       # 主应用组件
│   ├── main.tsx      # React 入口
│   ├── components/   # 通用组件
│   │   ├── TitleBar.tsx   # 自定义标题栏
│   │   └── Sidebar.tsx    # 侧边栏导航
│   ├── pages/        # 页面组件
│   │   ├── Chat.tsx      # 对话页面
│   │   ├── Workflow.tsx  # 工作流页面（占位）
│   │   ├── Skills.tsx    # Skills 管理页面
│   │   └── Settings.tsx  # 设置页面
│   └── styles/       # 样式配置
│       └── theme.ts  # 红色系主题配置
├── index.html        # HTML 入口
├── package.json
├── vite.config.ts    # Vite 配置
└── tsconfig.json     # TypeScript 配置
```

## 功能特性

- 🐙 **红色可爱八爪鱼主题** - OctiClaw 专属红色系配色
- 💬 **对话界面** - 类似 OpenClaw 的聊天体验
- ⚡ **工作流编排** - 可视化流程设计器（开发中）
- 🧩 **Skills 管理** - 安装和管理扩展插件
- ⚙️ **系统托盘** - 最小化到托盘，后台运行
- 🔄 **自动更新** - 使用 electron-updater 无缝更新

## 开发说明

### 环境要求

- Node.js >= 18.0.0
- npm >= 9.0.0

### 窗口控制

使用自定义标题栏替代系统窗口边框，支持：
- 最小化 / 最大化 / 关闭
- 拖拽移动窗口

### IPC 通信

渲染进程通过 `window.electronAPI` 安全访问：
- `window.electronAPI.window.*` - 窗口控制
- `window.electronAPI.app.*` - 应用信息
- `window.electronAPI.update.*` - 自动更新

---

Built with ❤️ by OctiClaw Team
