# Web Development Skill

**Skill ID:** `web-dev`
**版本:** 1.0.0
**图标:** 🌐

---

## 描述

前端开发助手，支持 HTML/CSS/JavaScript/React/Vue 代码编写，UI 设计还原，响应式布局，浏览器自动化，页面截图等开发任务。

---

## 使用场景

- 快速搭建网页
- 编写前端组件
- 响应式布局开发
- 浏览器自动化操作
- 页面截图和抓取
- 代码审查和优化

---

## 触发关键词

- "写网页"、"做个网站"
- "前端开发"
- "HTML"、"CSS"
- "自动化浏览器"
- "截取网页"

---

## 支持技术栈

| 技术 | 说明 |
|------|------|
| HTML5 | 语义化标签 |
| CSS3 | Flexbox / Grid / 动画 |
| JavaScript | 原生 JS + ES6+ |
| React | 函数组件 + Hooks |
| Vue | Composition API |
| TypeScript | 类型安全 |

---

## 基本用法

### 创建网页

```
写一个个人简历网页
```

```
做一个产品展示页面
```

### 自动化浏览器

```
打开 github.com 并截图
```

```
填写这个表单并提交
```

### 响应式开发

```
做一个移动端优先的响应式布局
```

### 代码审查

```
优化这段 CSS 代码
```

---

## 工具调用

### 前端代码生成

```json
{
  "tool": "write",
  "path": "index.html",
  "content": "<!DOCTYPE html>..."
}
```

### 浏览器自动化

```json
{
  "tool": "browser",
  "action": "open",
  "url": "https://example.com"
}
```

```json
{
  "tool": "browser",
  "action": "screenshot"
}
```

---

## 依赖说明

| 依赖 | 是否必需 | 说明 |
|------|----------|------|
| Node.js | ✅ | 前端开发工具链 |
| npm | ✅ | 包管理 |
| 浏览器 | ❌ | 浏览器自动化需要 |

---

## 示例对话

**用户：** 做一个简单的个人主页

**助手：** 正在生成代码...

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>我的个人主页</title>
  <style>
    body { font-family: system-ui; max-width: 800px; margin: 0 auto; padding: 2rem; }
    .avatar { width: 120px; height: 120px; border-radius: 50%; background: #ddd; }
    h1 { color: #333; }
    .skills { display: flex; gap: 8px; flex-wrap: wrap; }
    .tag { background: #e0e7ff; color: #4338ca; padding: 4px 12px; border-radius: 999px; }
  </style>
</head>
<body>
  <img src="avatar.jpg" alt="头像" class="avatar">
  <h1>张三</h1>
  <p>全栈开发工程师 | 热爱技术 | 持续学习</p>
  <div class="skills">
    <span class="tag">Python</span>
    <span class="tag">React</span>
    <span class="tag">Node.js</span>
  </div>
</body>
</html>
```

✅ 代码已写入 `index.html`，在浏览器中打开预览？

---

_OctiClaw Skills — 让 AI 助手为你所用_
