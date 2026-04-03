# Code Runner Skill

**Skill ID:** `code-runner`
**版本:** 1.0.0
**图标:** 💻

---

## 描述

多语言代码执行环境，支持 Python、JavaScript、Shell、PowerShell 等语言的代码执行。内置沙箱环境，支持代码片段运行、脚本创建和调试。

---

## 使用场景

- 快速运行 Python/JavaScript 代码片段
- 自动化任务脚本
- 数据处理和分析
- 系统管理任务
- 编写和测试代码

---

## 触发关键词

- "运行代码"、"执行代码"
- "写个脚本"、"运行脚本"
- "执行这段 Python"
- "run this code"

---

## 支持的语言

| 语言 | 执行方式 | 说明 |
|------|----------|------|
| Python | `python` | 需要 Python 环境 |
| JavaScript | `node` | 需要 Node.js 环境 |
| Shell | `bash` | Unix/Linux shell |
| PowerShell | `powershell` | Windows shell |
| Batch | `cmd` | Windows batch |

---

## 基本用法

### 运行 Python 代码

```
运行这段 Python：
print("Hello, World!")
```

```
写个 Python 脚本计算斐波那契数列
```

### 运行 JavaScript 代码

```
运行这段 JS：
console.log([1,2,3].map(x => x * 2));
```

### 执行 Shell 命令

```
执行 ls -la
```

```
运行 git status
```

### 创建脚本文件

```
创建一个 Python 脚本 backup.py，备份指定文件夹
```

---

## 工具调用

此 Skill 使用 `exec` 工具执行代码：

```json
{
  "tool": "exec",
  "command": "python -c \"print('Hello')\"",
  "workdir": "/path/to/workspace"
}
```

---

## 依赖说明

| 依赖 | 是否必需 | 说明 |
|------|----------|------|
| Node.js | ⚠️ | 执行 JavaScript 需要 |
| Python | ⚠️ | 执行 Python 代码需要 |
| Bash | ❌ | Unix/Linux 系统自带 |
| PowerShell | ❌ | Windows 系统自带 |

> 建议：安装 Node.js 和 Python 以获得完整功能

---

## 安全限制

- 禁止执行恶意代码
- 禁止访问系统敏感目录
- 网络访问受策略控制
- 文件写入受工作目录限制

---

## 示例对话

**用户：** 写个 Python 脚本列出当前目录所有文件

**助手：** 正在执行...

```python
import os

for item in os.listdir('.'):
    if os.path.isfile(item):
        print(f"📄 {item}")
    else:
        print(f"📁 {item}/")
```

**执行结果：**
```
📄 README.md
📁 node_modules/
📄 package.json
📁 src/
📄 tsconfig.json
```

---

_OctiClaw Skills — 让 AI 助手为你所用_
