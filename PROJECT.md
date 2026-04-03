# OctiClaw 项目文档

## 项目概述
- **名称**: OctiClaw
- **定位**: 类 OpenClaw 的 AI Agent 桌面软件，支持一键安装
- **吉祥物**: 红色可爱八爪鱼 🐙
- **核心功能**:
  1. 一键安装（Windows/Mac/Linux）
  2. 用户自定义 Agent 工作流
  3. 预装热门 Skills
  4. 官方下载网站

## 技术栈
- **桌面端**: Electron + React + TypeScript
- **工作流引擎**: 自研可视化编排（ReactFlow）
- **官网**: Next.js + Tailwind CSS + Vercel 部署
- **安装包**: electron-builder（NSIS/DMG/AppImage）
- **后端**: Node.js + Express（技能市场 API）

## 项目结构
```
OctiClaw/
├── desktop/          # Electron 桌面应用
├── website/          # 官方下载网站
├── skills/           # 预装 Skills 包
├── installer/        # 安装包配置
└── assets/           # 品牌资产（Logo/图标）
```

## 里程碑
- [ ] M1: 品牌设计（Logo + 配色）
- [ ] M2: 桌面应用框架搭建
- [ ] M3: Agent 工作流编排功能
- [ ] M4: 预装 Skills 集成
- [ ] M5: 官网开发
- [ ] M6: 一键安装包制作

*创建时间: 2026-04-03*
