# OctiClaw Skills Market API

> 版本：1.0.0 | 状态：草稿设计

本文档描述 OctiClaw Skills 市场的 REST API 接口设计，供前端客户端和第三方集成使用。

---

## 概述

- **Base URL:** `https://api.octiclaw.ai/v1`
- **协议:** HTTPS
- **格式:** JSON
- **认证:** Bearer Token（可选，部分接口需要）
- **版本:** v1

---

## 通用响应格式

### 成功响应

```json
{
  "success": true,
  "data": { ... },
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 100
  }
}
```

### 错误响应

```json
{
  "success": false,
  "error": {
    "code": "SKILL_NOT_FOUND",
    "message": "找不到指定的 Skill",
    "details": "Skill ID 'xxx' 不存在"
  }
}
```

---

## 接口列表

### 1. 获取所有 Skills

```
GET /skills
```

**查询参数：**

| 参数 | 类型 | 必填 | 描述 | 示例 |
|------|------|------|------|------|
| category | string | ❌ | 按分类筛选 | `productivity` |
| tag | string | ❌ | 按标签筛选 | `weather` |
| search | string | ❌ | 关键词搜索 | `search` |
| page | number | ❌ | 页码（默认 1） | `1` |
| limit | number | ❌ | 每页数量（默认 20） | `20` |
| sort | string | ❌ | 排序字段 | `popularity` |
| order | string | ❌ | 排序方向 | `desc` |

**示例请求：**
```
GET /skills?category=productivity&page=1&limit=10
```

**示例响应：**

```json
{
  "success": true,
  "data": [
    {
      "id": "web-search",
      "name": "网页搜索",
      "icon": "🔍",
      "description": "集成多搜索引擎...",
      "category": "productivity",
      "tags": ["搜索", "联网"],
      "version": "1.0.0",
      "author": "OctiClaw Team",
      "installs": 15420,
      "rating": 4.9,
      "isPreinstalled": true,
      "isFeatured": true,
      "updatedAt": "2026-03-15"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 10,
    "totalPages": 1
  }
}
```

---

### 2. 获取 Skill 详情

```
GET /skills/:id
```

**路径参数：**

| 参数 | 类型 | 描述 |
|------|------|------|
| id | string | Skill 唯一标识符 |

**示例请求：**
```
GET /skills/web-search
```

**示例响应：**

```json
{
  "success": true,
  "data": {
    "id": "web-search",
    "name": "网页搜索",
    "icon": "🔍",
    "description": "集成多搜索引擎，支持实时联网搜索...",
    "longDescription": "...",
    "category": "productivity",
    "tags": ["搜索", "联网", "查询", "research"],
    "version": "1.0.0",
    "author": "OctiClaw Team",
    "homepage": "https://octiclaw.ai/skills/web-search",
    "repository": "https://github.com/octiclaw/web-search",
    "license": "MIT",
    "installs": 15420,
    "rating": 4.9,
    "reviews": 312,
    "isPreinstalled": true,
    "isFeatured": true,
    "dependencies": [],
    "permissions": ["network"],
    "screenshots": [],
    "changelog": [
      {
        "version": "1.0.0",
        "date": "2026-03-15",
        "changes": ["初始版本发布"]
      }
    ],
    "metadata": {
      "compatibility": ">=2.0.0",
      "updatedAt": "2026-03-15",
      "createdAt": "2025-12-01"
    }
  }
}
```

---

### 3. 安装 Skill

```
POST /skills/install
```

**请求头：**

| 头 | 必填 | 描述 |
|----|------|------|
| Content-Type | ✅ | application/json |
| Authorization | ❌ | Bearer Token |

**请求体：**

| 参数 | 类型 | 必填 | 描述 |
|------|------|------|------|
| skillId | string | ✅ | 要安装的 Skill ID |
| version | string | ❌ | 指定版本（默认最新） |
| options | object | ❌ | 安装选项（如配置参数） |

**示例请求：**
```json
{
  "skillId": "web-search",
  "version": "1.0.0",
  "options": {
    "autoEnable": true
  }
}
```

**示例响应：**

```json
{
  "success": true,
  "data": {
    "skillId": "web-search",
    "name": "网页搜索",
    "status": "installed",
    "installedAt": "2026-04-03T10:30:00Z",
    "version": "1.0.0",
    "message": "Skill 安装成功，已自动启用"
  }
}
```

---

### 4. 卸载 Skill

```
DELETE /skills/:id
```

**路径参数：**

| 参数 | 类型 | 描述 |
|------|------|------|
| id | string | Skill 唯一标识符 |

**查询参数：**

| 参数 | 类型 | 必填 | 描述 |
|------|------|------|------|
| keepConfig | boolean | ❌ | 是否保留配置（默认 false） |

**示例请求：**
```
DELETE /skills/web-search?keepConfig=true
```

**示例响应：**

```json
{
  "success": true,
  "data": {
    "skillId": "web-search",
    "status": "uninstalled",
    "configPreserved": true,
    "message": "Skill 已卸载，配置已保留"
  }
}
```

---

### 5. 获取分类列表

```
GET /skills/categories
```

**示例响应：**

```json
{
  "success": true,
  "data": [
    {
      "id": "productivity",
      "name": "效率工具",
      "nameEn": "Productivity",
      "icon": "⚡",
      "description": "提升日常工作效率的工具",
      "skillCount": 4,
      "featured": ["web-search", "weather"]
    },
    {
      "id": "development",
      "name": "开发工具",
      "nameEn": "Development",
      "icon": "🔧",
      "description": "程序员和开发者的得力助手",
      "skillCount": 2,
      "featured": ["code-runner", "web-dev"]
    },
    {
      "id": "content",
      "name": "内容创作",
      "nameEn": "Content Creation",
      "icon": "✍️",
      "description": "写作、创意、媒体内容生产",
      "skillCount": 2,
      "featured": ["news-summary"]
    },
    {
      "id": "data",
      "name": "数据处理",
      "nameEn": "Data Processing",
      "icon": "📈",
      "description": "PDF、Excel、数据分析工具",
      "skillCount": 2,
      "featured": ["pdf", "xlsx"]
    }
  ]
}
```

---

### 6. 获取热门/推荐 Skills

```
GET /skills/featured
```

**查询参数：**

| 参数 | 类型 | 必填 | 描述 |
|------|------|------|------|
| type | string | ❌ | 类型：featured/popular/new（默认 featured） |
| limit | number | ❌ | 返回数量（默认 5） |

**示例响应：**

```json
{
  "success": true,
  "data": {
    "title": "本周热门 Skills",
    "subtitle": "最受用户欢迎的工具",
    "skills": [
      { "id": "web-search", "name": "网页搜索", "icon": "🔍", ... },
      { "id": "weather", "name": "天气查询", "icon": "🌤️", ... }
    ]
  }
}
```

---

### 7. 更新 Skill（开发者接口）

```
PUT /skills/:id
```

**请求体：** 包含要更新的字段

```json
{
  "name": "网页搜索（增强版）",
  "version": "1.1.0",
  "description": "新增 Bing 搜索支持..."
}
```

---

### 8. 获取 Skill 版本信息

```
GET /skills/:id/versions
```

**示例响应：**

```json
{
  "success": true,
  "data": {
    "current": "1.0.0",
    "latest": "1.2.0",
    "versions": [
      { "version": "1.2.0", "date": "2026-04-01", "status": "stable" },
      { "version": "1.1.0", "date": "2026-03-10", "status": "stable" },
      { "version": "1.0.0", "date": "2025-12-01", "status": "deprecated" }
    ]
  }
}
```

---

## 错误码

| 错误码 | HTTP 状态码 | 说明 |
|--------|-------------|------|
| `SKILL_NOT_FOUND` | 404 | Skill 不存在 |
| `CATEGORY_NOT_FOUND` | 404 | 分类不存在 |
| `ALREADY_INSTALLED` | 409 | Skill 已安装 |
| `NOT_INSTALLED` | 409 | Skill 未安装 |
| `INSTALL_FAILED` | 500 | 安装失败 |
| `UNINSTALL_FAILED` | 500 | 卸载失败 |
| `INVALID_VERSION` | 400 | 版本格式错误 |
| `INVALID_PARAM` | 400 | 参数格式错误 |
| `RATE_LIMITED` | 429 | 请求频率超限 |
| `UNAUTHORIZED` | 401 | 未授权 |

---

## 认证说明

| 接口 | 认证要求 |
|------|----------|
| GET /skills | 公开 |
| GET /skills/:id | 公开 |
| GET /skills/categories | 公开 |
| GET /skills/featured | 公开 |
| POST /skills/install | 需要认证 |
| DELETE /skills/:id | 需要认证 |
| PUT /skills/:id | 需要认证（开发者） |

---

## 速率限制

- 未认证：60 请求/分钟
- 已认证：300 请求/分钟
- 返回 `X-RateLimit-Remaining` 和 `X-RateLimit-Reset` 头

---

## SDK 示例

### JavaScript / Node.js

```javascript
const response = await fetch('https://api.octiclaw.ai/v1/skills');
const { data } = await response.json();
console.log(data);
```

### Python

```python
import requests

resp = requests.get('https://api.octiclaw.ai/v1/skills/featured')
data = resp.json()['data']
print(data)
```

---

_OctiClaw — 让 AI 助手为你所用_
