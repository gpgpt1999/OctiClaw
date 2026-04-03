# PDF Skill

**Skill ID:** `pdf`
**版本:** 1.0.0
**图标:** 📄

---

## 描述

全功能 PDF 处理工具箱，支持 PDF 创建、合并、拆分、旋转、加水印、OCR 识别、文本提取、页面操作等一切 PDF 相关需求。

---

## 使用场景

- 将 Word/图片转为 PDF
- 合并多个 PDF 为一个
- 从 PDF 提取文字内容
- 扫描件 OCR 识别
- 给 PDF 添加水印
- 拆分或旋转 PDF 页面

---

## 触发关键词

- "PDF"、"处理 PDF"
- "合并 PDF"、"拆分 PDF"
- "PDF 转文字"、"OCR"
- "加水印"、"旋转 PDF"

---

## 基本用法

### 合并 PDF

```
把这两个 PDF 合并成一个
```

```
把 folder 里的所有 PDF 合并
```

### 拆分 PDF

```
把 PDF 的第 3-5 页拆出来
```

```
把这个 PDF 按每 10 页拆分
```

### 提取文字

```
提取这个 PDF 的文字内容
```

### OCR 识别

```
OCR 识别这张扫描件
```

### 创建 PDF

```
把这份文档转成 PDF
```

```
创建一份 PDF 格式的报告
```

---

## 工具调用

此 Skill 使用 Python 执行 PDF 操作：

```python
# 使用 PyPDF2 / pdfplumber / reportlab
import pdfplumber

with pdfplumber.open("input.pdf") as pdf:
    text = ""
    for page in pdf.pages:
        text += page.extract_text()
```

---

## 依赖说明

| 依赖 | 是否必需 | 说明 |
|------|----------|------|
| Python | ✅ | 运行 PDF 处理脚本 |
| pdfplumber | ✅ | 文本提取 |
| PyPDF2 | ✅ | PDF 操作 |
| pytesseract | ❌ | OCR 识别需要 |

---

## 示例对话

**用户：** 把 test.pdf 的第 1-3 页拆出来

**助手：** 正在处理...

✅ **PDF 处理完成**

| 操作 | 结果 |
|------|------|
| 输入文件 | test.pdf (共 10 页) |
| 提取页面 | 1-3 |
| 输出文件 | test_pages_1-3.pdf |
| 文件大小 | 2.3 MB |

文件已保存到当前目录。

---

_OctiClaw Skills — 让 AI 助手为你所用_
