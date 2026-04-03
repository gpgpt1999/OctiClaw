# OctiClaw 预装 Skills 清单

> 版本：1.0.0 | 更新日期：2026-04-03

OctiClaw 为用户提供 10 个精心挑选的预装 Skills，开箱即用，涵盖日常生活、工作效率、内容创作和数据处理等核心场景。

---

## 📦 预装 Skills 一览

| # | 图标 | 名称 | ID | 分类 | 使用频率 |
|---|------|------|-----|------|----------|
| 1 | 🔍 | 网页搜索 | `web-search` | productivity | ⭐⭐⭐⭐⭐ |
| 2 | 📁 | 文件处理 | `file-manager` | productivity | ⭐⭐⭐⭐⭐ |
| 3 | 💻 | 代码执行 | `code-runner` | development | ⭐⭐⭐⭐ |
| 4 | 📧 | 邮件收发 | `email` | productivity | ⭐⭐⭐⭐⭐ |
| 5 | 🌤️ | 天气查询 | `weather` | productivity | ⭐⭐⭐⭐⭐ |
| 6 | 📰 | 新闻摘要 | `news-summary` | content | ⭐⭐⭐ |
| 7 | 📄 | PDF 处理 | `pdf` | data | ⭐⭐⭐⭐ |
| 8 | 📊 | Excel 处理 | `xlsx` | data | ⭐⭐⭐⭐ |
| 9 | 🎨 | 图像生成 | `image-gen` | content | ⭐⭐⭐⭐ |
| 10 | 🌐 | 网站开发 | `web-dev` | development | ⭐⭐⭐ |

---

## 1. 🔍 网页搜索 (web-search)

**Skill ID:** `web-search`

**描述：** 集成多搜索引擎，支持实时联网搜索、关键词提取、新闻聚合。覆盖 Google、Bing、百度等国内外主流引擎。

**使用场景：**
- 查询实时信息（股价、天气、新闻）
- 验证事实和数据
- 搜索教程、资源和参考资料

**触发关键词：** "搜一下"、"搜索"、"网上"、"look up"

**依赖：** 无（内置联网工具）

---

## 2. 📁 文件处理 (file-manager)

**Skill ID:** `file-manager`

**描述：** 智能文件管理器，支持文件扫描、自动归类、批量重命名、复制移动、查找重复文件、清理整理桌面等功能。

**使用场景：**
- 整理混乱的桌面
- 批量重命名文件
- 查找指定类型的文件
- 清理临时文件

**触发关键词：** "整理文件"、"整理桌面"、"桌面整理"

**依赖：** 无（文件系统访问权限）

---

## 3. 💻 代码执行 (code-runner)

**Skill ID:** `code-runner`

**描述：** 支持多语言代码执行（Python、JavaScript、Shell、PowerShell），内置沙箱环境，支持代码片段运行、脚本创建和调试。

**使用场景：**
- 快速运行 Python/JS 脚本
- 自动化任务脚本
- 数据处理和分析
- 系统管理任务

**触发关键词：** "运行代码"、"执行脚本"、"写个脚本"

**依赖：** Node.js / Python 环境

---

## 4. 📧 邮件收发 (email)

**Skill ID:** `email`

**描述：** 统一邮件管理，支持 IMAP/SMTP 协议收发邮件，支持 Gmail、QQ邮箱、163邮箱、企业邮箱等各类邮箱。

**使用场景：**
- 查看未读邮件
- 发送带附件的邮件
- 按关键词搜索邮件
- 批量标记已读/未读

**触发关键词：** "发邮件"、"查看邮件"、"读邮件"

**依赖：** IMAP/SMTP 邮箱配置

---

## 5. 🌤️ 天气查询 (weather)

**Skill ID:** `weather`

**描述：** 实时天气查询，提供当前天气、未来7天预报、穿衣指数、出行建议等贴心提醒。

**使用场景：**
- 出门前查看天气
- 安排出行计划
- 穿衣搭配建议

**触发关键词：** "天气"、"下雨吗"、"温度"

**依赖：** 无（内置天气 API）

---

## 6. 📰 新闻摘要 (news-summary)

**Skill ID:** `news-summary**

**描述：** 多源新闻聚合，自动从 RSS 订阅源抓取科技、财经、国际等分类新闻，生成智能摘要。

**使用场景：**
- 每日新闻简报
- 行业动态追踪
- 热点事件了解

**触发关键词：** "新闻"、"今日头条"、"有什么新闻"

**依赖：** 无（RSS 订阅源）

---

## 7. 📄 PDF 处理 (pdf)

**Skill ID:** `pdf`

**描述：** 全功能 PDF 工具箱，支持 PDF 创建、合并、拆分、旋转、加水印、OCR 识别、文本提取等功能。

**使用场景：**
- 将文档转为 PDF
- 合并多个 PDF
- 扫描件 OCR 识别
- PDF 内容搜索

**触发关键词：** "PDF"、"合并PDF"、"PDF转文字"

**依赖：** Python（pdf 相关库）

---

## 8. 📊 Excel 处理 (xlsx)

**Skill ID:** `xlsx`

**描述：** 专业 Excel 表格处理，支持读写 .xlsx/.csv 文件，数据清洗，公式计算，图表生成，数据透视表等。

**使用场景：**
- 处理表格数据
- 生成数据报告
- 批量数据清洗
- 数据可视化

**触发关键词：** "Excel"、"表格"、"xlsx"、"处理数据"

**依赖：** Python（openpyxl / pandas）

---

## 9. 🎨 图像生成 (image-gen)

**Skill ID:** `image-gen`

**描述：** AI 驱动的图像生成，支持文生图、图生图、图片编辑、Logo 设计、海报制作等。

**使用场景：**
- 创作配图
- 设计海报/Banner
- 生成 Logo 概念
- 图片风格迁移

**触发关键词：** "生成图片"、"画一张"、"设计图片"

**依赖：** 图像生成 API（如 DALL·E / Stable Diffusion）

---

## 10. 🌐 网站开发 (web-dev)

**Skill ID:** `web-dev`

**描述：** 前端开发助手，支持 HTML/CSS/JavaScript/React/Vue 代码编写，UI 设计还原，响应式布局，浏览器自动化等。

**使用场景：**
- 快速搭建网页
- 编写前端组件
- 自动化浏览器操作
- 页面截图和抓取

**触发关键词：** "写网页"、"前端开发"、"做个网站"

**依赖：** Node.js

---

## 🗂️ 分类索引

### productivity（效率工具）
- web-search、file-manager、email、weather

### development（开发工具）
- code-runner、web-dev

### content（内容创作）
- news-summary、image-gen

### data（数据处理）
- pdf、xlsx

---

## 🔧 安装说明

预装 Skills 已内置，随 OctiClaw 启动自动加载。如需添加更多 Skills，请访问 Skills 市场或使用命令：
```
/install-skill <skill-name>
```

## 📥 安装所有预装 Skills

```bash
node install-skills.js
```

---

_OctiClaw — 让 AI 助手为你所用_
