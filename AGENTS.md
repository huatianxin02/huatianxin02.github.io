# AGENTS.md — 华天心个人网站 · AI 交接说明

> **这份文件是给「下一个接手这个项目的 AI」看的。**
> 读完它，你应该能立刻明白：这个网站是什么、长什么样、内容的事实边界在哪、改哪里、怎么发、以及**此前一轮对话里已经做过的决定和踩过的坑**。
>
> 最后更新：2026-10-14 · 线上仍是 `2d18527`；本地有一批**未提交**的改动（图标 / 分享卡片 / 页脚 / 导航 / 清理占位），见第 13 节。

---

## 1. 一分钟了解

**华天心**（AI 研究员，求职中）的**个人作品集网站**。纯静态 HTML/CSS/JavaScript，没有构建步骤，托管在 GitHub Pages。

作者**不是程序员**——他靠 AI 辅助完成开发。所以：

- **所有回复用中文，口语化，不要甩术语**；要动手时给**精确到「点哪个按钮」**的步骤。
- 他会说"帮我改一下"，那时你要先**读文件确认现状**，再改，不要凭印象猜。

---

## 2. 关键坐标

| 项目 | 值 |
|---|---|
| 线上地址 | https://huatianxin02.github.io |
| 本地仓库 | `/Users/hkd/Documents/GitHub/huatianxin02.github.io` |
| 远程仓库 | `https://github.com/huatianxin02/huatianxin02.github.io.git` |
| GitHub 账号 | `huatianxin02`（仓库主人） |
| 站点体积 | 约 3.6 MB，无依赖、无构建 |
| 相关文件 | 简历附页：`~/Desktop/求职材料/华天心-简历附页.html` 与 `.pdf` |

> ⚠️ 别去改 `~/Downloads/deepseekharness/我的作品集网站/`——那是一份**过期的早期副本**，`index.html` 已被改名为 `index_副本.html`。真正的项目只在上面那个 GitHub 目录。

---

## 3. 网站长什么样

### 页面（6 个）

| 文件 | 行数 | 内容 |
|---|---|---|
| `index.html` | 255 | 首页：渐变主视觉 + 关于我 + **9 张技能卡** + **5 张项目卡** + 联系方式 |
| `projects.html` | 725 | 作品详情：**5 个完整案例**（念起 / 心情笔记 / 余白·墨間 / 昼夜 / RAG），每例含导语、设计理念、技术要点、量化数据、图集；底部还有**设计理念**专区（7 条准则 + 10 条否决清单）与技术关键词 |
| `blog.html` | 96 | 文章列表：**1 篇**置顶（→ `blog-rag.html`）。原先那 2 篇假占位文章已于 2026-10-14 删除 |
| `blog-rag.html` | 482 | 长文《我在一台 Mac 上跑通了三套 RAG 系统》完整正文（含表格、代码块、引用） |
| `gallery.html` | 112 | 相册：6 个条目（当前是 SVG 占位图） |
| `resume.html` | 181 | 简历页：个人简介 / 技能 / 教育经历 / 项目经历，带打印按钮 |

### 资源

- `assets/css/style.css`（**1620 行**，CSS 变量驱动，全部设计 token 在文件开头）
- `assets/js/main.js`（134 行：移动端菜单、昼夜切换、返回顶部、滚动显现动画）
- `images/avatar.svg`（头像 = 昼夜应用图标）、`images/gallery1–6.svg`
- `images/og-cover.png`（**1200×630**，分享到微信/钉钉时的卡片图，2026-10-14 新增）
- `images/apple-touch-icon.png`（**180×180**，iOS 添加到主屏幕时的图标，2026-10-14 新增）
- `images/projects/`：5 张封面 + 各项目截图（`cover-*.jpg` / `*-1.jpg` / `rag-*.svg` 等 16 个文件）

### 3.1 每个页面的 `<head>`（2026-10-14 补齐）

6 个页面的 `<head>` 结构一致，除标题/描述外都带这几样：

- **图标**：`<link rel="icon" type="image/svg+xml" href="images/avatar.svg">` + `apple-touch-icon`。
  favicon 直接复用了头像那个文件，**没有单独画**——想换图标，换 `avatar.svg` 即可。
- **`theme-color` × 2**：日间 `#f9f6ef` / 夜间 `#0e0e11`，用 `media="(prefers-color-scheme: ...)"` 区分，
  控制手机浏览器地址栏的配色。
- **分享卡片**：`og:type` / `og:site_name` / `og:title` / `og:description` / `og:url` / `og:image`（+宽高）
  / `twitter:card`。`og:image` 统一指向 `images/og-cover.png`，用**绝对网址**（`https://huatianxin02.github.io/...`），
  这是分享平台的要求，不能写相对路径。
- **`<link rel="canonical">`**：每页指向自己的绝对网址。

> ⚠️ `og:image` 和 `canonical` 里的域名是硬编码的。**如果以后换域名或换仓库名，6 个页面都要改。**

### 交互功能

移动端汉堡菜单、**昼夜切换**（右上角显示「夜」/「昼」，写入 `localStorage`，默认跟随系统）、滚动渐入动画（IntersectionObserver）、返回顶部按钮、简历页一键打印/存 PDF。

---

## 4. 设计系统：昼夜风格（**最重要的约束**）

当前视觉语言**不是**苹果官网风格了（历史上有过，已被替换），而是取自作者自己三款应用——**昼夜 Zhouye / 余白 Yohaku / 墨間 Sumi**——的设计语言。

### 4.1 全部 Token 都在 `style.css` 顶部

日间 `:root` / 夜间 `body.dark`，**改主题色只需改 `--accent` 一处**。

| Token | 日间（余白） | 夜间（墨間） |
|---|---|---|
| `--accent` 主题色 | `#8c5a3c` 陶土 | `#a292c4` 藤 |
| `--ink` 墨色 | `#1b1b21` | `#e9e5db` |
| `--text` 正文 | `#2a2521` | `#e9e5db` |
| `--text-muted` | `#6e665c` | `#9a958c` |
| `--bg` 底色 | `#f9f6ef` 暖纸 | `#0e0e11` 蓝调炭黑 |
| `--bg-alt` | `#f3eee4` | `#131317` |
| `--card-bg` 卡片 | `rgba(255,255,255,.72)` | `#131317` |
| `--border` | `rgba(27,27,33,.1)` | `#26262c` |
| `--shadow` | 一层极淡投影 | **`none`** |
| `--radius-lg` / `--radius` | 18px / 14px | 14px / 12px |
| `--heading-weight` | **600** | **300** |
| `--heading-tracking` | **−0.022em** | **+0.075em** |

### 4.2 三条铁律（改错了就会"不像"）

1. **不用纯黑，也不用纯白。** 日间是暖纸不是 `#fff`，夜间是蓝调炭黑不是 `#000`，正文也不纯白（留一点和纸微黄）。
2. **日间靠投影表达卡片边界，夜间改用 1px 细线。** 暗色下投影会浮成灰块，所以 `--shadow: none`。
   > ⚠️ 因此夜间**绝对不能**写 `box-shadow: 0 0 0 1px X, var(--shadow)` 这类组合——`none` 混进多值里会让整条声明失效。要描边就用独立的一层。
3. **标题靠字重与字距表现安静，不靠装饰。** 字重/字距必须走 `var(--heading-weight)` / `var(--heading-tracking)`，这样昼夜切换时标题气质会跟着变。

### 4.3 母题：「縦罫＋節」

小标签（`个人主页`、项目序号、简历小标题）左侧一道 **1px 主题色竖线** + **宽字距**。这是整套设计的签名，新增标签类元素时请沿用。

### 4.4 文案规范

- **中性陈述，不用感叹号，不喊口号。** 参考作者自己的话术：「今天，慢慢来。」「今夜的事」「谢谢你，给今天留了一点时间。」
- **不要装饰性 emoji。** 全站 emoji 已被刻意清除（曾经的 📄📝📷📧🌙 等都去掉了）。唯一例外是功能性的「夜 / 昼」两个汉字。
- 汉字行高偏松（正文 1.7），留白优先。

### 4.5 已验证的对比度（改动后请保持）

日间正文 14.05:1 / 次要 5.23:1 / 主题色 5.34:1；夜间正文 15.32:1 / 次要 6.47:1 / 主题色 6.83:1。
**全部 ≥ 4.5:1** 是作者自己的验收线，改颜色后必须重算。

---

## 5. 内容事实（**不要编造，不要"美化"**）

作者对数据真实性非常在意，项目里**主动标注了能力边界**。请保持这个习惯。

### 5.1 个人信息

- 姓名 **华天心** ｜ 身份 **AI 研究员** ｜ 状态 **求职中**
- 教育：**贵州中医药大学 · 中西医临床医学**
- 邮箱：`2870432094@qq.com` ｜ GitHub：`huatianxin02`
- 首页信息栏：身份 / 状态 / 方向（AI 研究 / 客户端开发）/ 教育 / 邮箱

### 5.2 五个项目与已核验数字

| 项目 | 关键事实 |
|---|---|
| **念起 nianqi**（macOS 原生 / Android / Web） | 20 个 Swift 文件 4741 行，裸 `swiftc` 构建出 2.5 MB `.app`，零第三方依赖；78 项 CDP 断言（功能 37 / 视觉 22 / 端到端 19）；Android 包 50468 字节、零运行时权限；正文对比度 3.64 → 9.74 |
| **心情笔记 MoodNotes**（macOS / Android / HarmonyOS / iOS / Web） | app.js 5358 行，跨端移植零改动；9 套共 **529 项**自动化测试；HAP 492603 字节；Android 仅 4 项权限、**不含 INTERNET** |
| **余白 Yohaku · 墨間 Sumi**（macOS ×2 / Android） | Swift 1964 + 1522 行；XCTest 11 用例；96 项断言（53 / 28 / 15）；横向溢出 0px、最小字号 ≥11px、可点元素 ≥44px |
| **昼夜 Zhouye**（Android） | Java 296 行 + 915 行 Web 层；minSdk 26 / targetSdk 36；22 项断言全过；APK 160846 字节 |
| **汽车工艺文档智能问答助手**（RAG） | 三套链路（自研 11 模块 / Dify 1.17.1 15 容器 / RAGFlow v0.20.3 DeepDoc 5 容器）；25 题评估集（20 可答 + 5 反幻觉拒答）：混合检索 Hit@1 **100%**、拒答正确率 100%（5/5）、**幻觉率 0.0%**、平均延迟 4.39 秒；索引片段 128 → 104 |

**自动断言总数 725 项** = 78 + 529 + 96 + 22。

### 5.3 必须保留的边界声明

`projects.html` 与简历附页里明确写了：

- RAG 项目是**独立完成的个人项目，不是团队交付**；5 类工艺文档是**按行业规范构造的仿真数据**，非企业真实资料。
- 向量库是自研 numpy 实现、104 片段规模，**未做生产规模验证**（生产应迁 FAISS / Milvus）。
- RAGFlow 本轮**只验证 DeepDoc 解析**，其检索问答链路未配置；社区镜像是 amd64，在 M1 上靠转译运行。
- Android 端到端验证用的是**模拟器，不是真机**。

> 删掉这些"不体面"的句子 = 破坏了这个项目最重要的品质。作者宁可写清楚边界。

---

## 6. 常见编辑任务

### 加一个项目
1. 复制 `projects.html` 里一个完整的 `<article class="project-case" id="...">` 块，改 `id`（锚点用）。
2. 在 `index.html` 复制一张 `<div class="project-card">`。
3. 图片放 `images/projects/`，封面命名 `cover-<名字>.jpg`。

### 加一篇文章
1. 复制 `blog-rag.html` 作为正文模板（结构：`.article-head` + `.article-body`）。
2. 在 `blog.html` 复制一张 `<div class="post-card">`，链到新文件。置顶那篇用 `class="post-card featured"`。

### 换图 / 压缩图（macOS 自带命令）
```bash
sips -Z 1600 -s format jpeg -s formatOptions 82 原图.png --out images/projects/新名.jpg
```

### 换主题色
只改 `style.css` 的 `--accent` / `--accent-hover`（日间）与 `body.dark` 里对应两行（夜间），然后重算对比度。

### 换分享卡片图 / 图标
- **分享卡片**：重新生成一张 **1200×630** 的 PNG，覆盖 `images/og-cover.png` 就行
  （6 个页面的 `og:image` 都指向它，改一处全站生效）。
  生成办法：写个 HTML 再用无头 Chrome 截图，把 `--window-size` 设成 `1200,630`（命令见第 11 节）。
- **图标**：直接替换 `images/avatar.svg` —— favicon 和页面头像用的是**同一个文件**，改一处两处都变。
  `images/apple-touch-icon.png`（180×180）要单独重新生成。

---

## 7. 发布流程

网站由 **GitHub Pages** 托管，从 `main` 分支发布。

1. 打开 **GitHub Desktop** → 确认仓库是 `huatianxin02.github.io`
2. 左下角填 Summary（**写清楚改了什么**，别再写 `000`）
3. 点 **Commit to main** → 点 **Push origin**
4. 等 **1–2 分钟** Pages 重新构建，浏览器按 **⌘ + Shift + R** 强制刷新

### 7.1 认证踩坑记录（**已解决，但会复现**）

这台 Mac 是**用迁移助理从另一台 Mac 克隆来的**，克隆过来的钥匙串令牌在新机器上解不开。症状：

- GitHub Desktop 的「Settings → Accounts」**显示已登录 `huatianxin02`**，但一推送就报
  `Authentication failed ... You may need to log out and log back in to refresh your token.`

**解法（一行）**：Settings → Accounts → **Sign Out** → 再 **Sign in to GitHub.com** → 浏览器授权 → 回 Desktop 点 **Push origin**。

### 7.2 备用通道：SSH（走 443 端口）

这台机器上 **HTTPS 到 github.com 经常超时**（`SSL_ERROR_SYSCALL`），但 **SSH 通畅**。已配置：

```
~/.ssh/config →
Host github.com
  HostName ssh.github.com      # 走 443，绕开被干扰的 22 端口与 HTTPS
  Port 443
  User git
  IdentityFile ~/.ssh/id_ed25519_github
  IdentitiesOnly yes
  AddKeysToAgent yes
  UseKeychain yes
```

两把已生成的密钥：
- `~/.ssh/id_ed25519_github` → 已加到 **jiakson** 账号（但 jiakson **对本仓库无写权限**）
- `~/.ssh/id_ed25519_github_huatianxin02` → **还没加到任何账号**；若要启用 SSH 推送，需把它加到 `huatianxin02` 账号并把 `IdentityFile` 指回它

> 诊断命令：`ssh -T git@github.com` 会回显认证到哪个账号（`Hi <用户名>!`）；`git push --dry-run origin main` 可只测权限不真推。

---

## 8. 改完必须做的验证

作者的原话是「把好不好看变成可测量的数字」。改完请至少跑一遍：

```bash
cd /Users/hkd/Documents/GitHub/huatianxin02.github.io

# 1) CSS 花括号配平
echo "{ = $(grep -o '{' assets/css/style.css | wc -l), } = $(grep -o '}' assets/css/style.css | wc -l)"

# 2) JS 语法
node --check assets/js/main.js

# 3) 页面可访问性 + 内部链接 + 图片引用（用 Python 解析 HTML 做配平与存在性检查）
# 4) 分享卡片和图标文件在不在
ls -la images/og-cover.png images/apple-touch-icon.png   # og-cover 应为 1200×630
# 5) 线上验证（推送后）
for p in "" projects.html blog-rag.html blog.html resume.html gallery.html; do
  echo "$(curl -s -o /dev/null -m 20 -w '%{http_code}' https://huatianxin02.github.io/$p)  /$p"
done
```

Pages 重新构建期间，**新文件会短暂 404**（旧文件仍 200）——属正常，等 1–2 分钟再试。

---

## 9. 已知待办 / 悬而未决

> 2026-10-14 清掉了一批：页脚年份（2024→2026）、页脚残留的爱心 emoji、`main.js` 里的调试日志、
> `blog.html` 两篇假文章、导航里缺的「简历」入口；并补上了 favicon 与分享卡片。
> 下面这些是**仍然存在**的问题。

1. **念起的 macOS 截图缺失** —— `images/projects/nianqi-1.svg` 还是占位图，其他项目都有真截图。等作者提供。
2. **心情笔记测试数口径不一** —— 简历与本站写 **529 项**，但某份设计文档写 **540 项**，作者尚未确认。
3. **相册仍是占位图** —— `images/gallery1–6.svg`，未放真实照片。
4. **`.DS_Store` 在磁盘上仍存在**（已被 `.gitignore` 忽略，不影响仓库）。
5. **提交信息质量差** —— 历史上出现过 `000` 这种信息，请提醒作者写清楚。
6. **简历附页未入库** —— `~/Desktop/求职材料/` 下的 HTML/PDF 还没放进仓库；若作者想要一个可分享的链接，可复制为 `resume-appendix.html` / `.pdf` 并推送。

---

## 10. 记忆：这个网站是怎么变成现在这样的

按时间顺序（**已完成的决定，不要推翻重来**）：

1. **从零建站** —— 作者不会编程，目标是个人作品集/简历站，选 GitHub Pages 免费托管。
2. **内容与结构** —— 确定为「首页 + 作品 + 文章 + 相册 + 简历」五个板块；导航做了移动端适配。
3. **深色模式** —— 加了昼夜切换与返回顶部。**当时是手动改文件**。
4. **填真实内容** —— 姓名华天心、邮箱 2870432094@qq.com、真实项目。
5. **第一版美化：苹果官网风格** —— SF 字体栈、`#0071e3` 蓝、24px 大圆角、毛玻璃导航、渐变标题。**（已被替换）**
6. **补项目经历与配图** —— 5 个项目入库，作者提供了 8 张真实截图。
7. **加入设计理念** —— 把作者自己的设计准则（7 条 + 10 条否决清单）做成了 `projects.html#philosophy`。
8. **加入 RAG 项目** —— 同时把一篇 263 行的项目复盘《我在一台 Mac 上跑通了三套 RAG 系统》做成 `blog-rag.html` 并置顶。
9. **第二版美化：昼夜风格（当前）** —— 作者要求"改成和昼夜类似"。做法是**重定义 CSS 变量**（比全站重写安全），再追加一层覆盖块：标题走 `--heading-weight/tracking`、按钮改用 `--btn-*`、切换按钮改成「夜 / 昼」两个字、加「縦罫＋節」竖线母题、卡片在夜间改 1px 细线。**全站 emoji 同时清除。**
10. **身份/教育/头像定稿** —— 身份改 AI 研究员、状态求职中、教育贵州中医药大学中西医临床医学；头像从 `deepseek_whale_maid.png` 换成**用 apk 里矢量参数复刻的昼夜图标**（暖纸底 + 半明半暗的圆）。
11. **认证风波** —— 推送连续失败，最终确认是迁移克隆导致的令牌失效；`Sign Out / Sign In` 后推送成功，`2d18527` 已上线，全站验收通过。
12. **简历附页** —— 把网站内容提炼成 2 页 A4 的求职附页（HTML + PDF），加了「AI 协作学习」一条：熟练使用 **Codex、Claude Code、WorkBuddy、DeepSeek Harness** 辅助开发，并通过文档、实测与自动化测试验证 AI 输出。
13. **补门面 + 清理旧账（2026-10-14）** —— 一次全站审计发现：页脚还停在 2024 且留着全站唯一的装饰 emoji、没有 favicon（线上 `/favicon.ico` 返回 404）、没有分享卡片（把链接发给 HR 只有一行光秃秃的网址）。于是：页脚统一改成 `© 2026 华天心`；6 个页面 `<head>` 补上 favicon / `theme-color` / `og:` 分享卡片 / `canonical`；分享图和 iOS 图标用**无头 Chrome 截图**现生成（`images/og-cover.png`、`images/apple-touch-icon.png`）；导航补上「简历」；删掉 `blog.html` 两篇假文章；清掉 `main.js` 的 `console.log` 和一句过时注释。
    **这批改动尚未提交**（工作区里 `M` 状态）。审计里还剩三件没做，按性价比排序：① 4 组重复图片（`cover-*.jpg` 和第一张截图是同一个文件）冗余约 590 KB；② 23 个 `<img>` 全都没有 `width`/`height` 和 `loading="lazy"`，会有点布局抖动；③ 图片没有 WebP 版本。

### 作者的工作偏好（照做就对了）

- **要可测量。** 他喜欢"对比度 3.64 → 9.74"这种话，不喜欢"更好看了"。
- **要诚实标注边界。** 见第 5.3 节。
- **验证后再说话。** 声称"已上线"之前，必须 curl 过线上页面。
- **一步步教。** 涉及 GitHub 操作时给按钮级步骤，并提醒 `⌘ + Shift + R`。

---

## 11. 这台机器的环境（给 AI 的操作提示）

- 系统 **macOS**（Apple Silicon，M1）。Git：`/opt/homebrew/bin/git`（2.49.0）。
- **本机模型不支持读图**：`read_image` 会报 "does not declare image input"，`describe_image` 因 baseURL 配置问题不可用。
  **读截图/PDF 的办法**：用 macOS Vision 做 OCR——
  `swift /tmp/ocr.swift <图片路径>`（脚本若已丢失，用 Vision 框架 + `VNRecognizeTextRequest`，`recognitionLanguages = ["zh-Hans","en-US"]` 重建）。
  PDF 可先用 PDFKit 渲染成 PNG 再 OCR。
- **生成 PDF**：用 Chrome 无头模式（本机已装 Google Chrome）——
  ```bash
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu \
    --no-first-run --user-data-dir=/tmp/chrome-print-profile \
    --no-pdf-header-footer --virtual-time-budget=3000 \
    --print-to-pdf=/tmp/out.pdf "file:///tmp/in.html"
  ```
  > 中文路径先 `cp` 到 `/tmp` 的 ASCII 路径再用，避免 URL 编码问题。
  > 开头那两行 `task_policy_set ... invalid argument` 和 `CVDisplayLink ... failed` 是**无害噪音**，只要末尾出现 `bytes written to file` 就成功了。
- **不要起后台 HTTP 服务**（`python3 -m http.server &`）——在这个 shell 里会把命令挂到超时。做静态验证（grep / 文件存在性检查）就够了。
- `edit` 工具在文件被其他命令（如 `sed`）改过之后会报 "file changed since it was read"，**先重新 read 一小段再改**。
- 批量文本替换用 `sed -i ''`（BSD 语法，注意 `''`）。

---

## 12. 一句话总结给下一个 AI

**这是一个"用可验证性对抗自我美化"的作品集站**：视觉上是安静克制的昼夜双主题，内容上是带真实数字和诚实边界的工程记录。
改它的时候，宁可少加一个动效，也不要加一句编造的数字。
