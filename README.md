# huatianxin02.github.io

华天心（AI 研究员）的个人作品集网站。纯静态 HTML / CSS / JavaScript —— 没有构建步骤、没有第三方依赖，托管在 GitHub Pages。

线上地址：<https://huatianxin02.github.io>

## 网站包含什么

| 页面 | 内容 |
|---|---|
| `index.html` | 首页：关于我、9 张技能卡、5 张项目卡、联系方式 |
| `projects.html` | 作品详情：5 个完整案例 + 设计理念（7 条准则 / 10 条否决清单） |
| `blog.html` | 文章列表 |
| `blog-rag.html` | 长文《我在一台 Mac 上跑通了三套 RAG 系统》 |
| `gallery.html` | 相册 |
| `resume.html` | 简历页，可一键打印 / 存 PDF |
| `404.html` | 找不到页面时的兜底页 |

## 目录结构

```
.
├── *.html                    ← 7 个页面
├── assets/css/style.css      ← 全部样式；设计 token 集中在文件开头
├── assets/js/main.js         ← 交互：手机菜单、昼夜切换、返回顶部、滚动淡入
├── images/                   ← 头像、分享卡片、iOS 图标、相册
├── images/projects/          ← 项目封面与截图
├── robots.txt / sitemap.xml  ← 给搜索引擎看的
└── AGENTS.md                 ← 给接手这个项目的 AI 看的完整交接说明
```

## 本地预览

直接双击 `index.html`，用浏览器打开就行。窗口拉窄一点可以看到手机端的布局。

## 发布

仓库从 `main` 分支经 GitHub Pages 发布。改完内容后在 GitHub Desktop 里
**Commit to main** → **Push origin**，等 1–2 分钟，再按 **⌘ + Shift + R** 强制刷新。

## 设计

视觉语言取自作者自己的三款应用（昼夜 / 余白 / 墨間）：日间是暖纸面，夜间是蓝调炭黑，
**不用纯黑，也不用纯白**。日间顶部右侧有樱花、竹林、水墨山水轮换的浅色画景，
最多占宽度 30%；夜间自动隐藏。想换主题色，只改 `style.css` 里的 `--accent` 一处即可。

## 想改内容？

先读 [`AGENTS.md`](./AGENTS.md)。里面写了每一处内容在哪里、有哪些不能违反的设计约束、
这个网站是怎么一步步变成现在这样的，以及已知的待办。
