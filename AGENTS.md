# AGENTS.md — 华天心个人网站 · AI 交接说明

> **这份文件是给「下一个接手这个项目的 AI」看的。**
> 读完它，你应该能立刻明白：这个网站是什么、长什么样、内容的事实边界在哪、改哪里、怎么发、以及**此前一轮对话里已经做过的决定和踩过的坑**。
>
> 最后更新：2026-10-14 · 本地及 `origin/main` 当前为 `f1841ef`；新增浅色背景这批**还未提交/推送**，见第 10 节第 15 条。

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
| 站点体积 | 约 3.6 MB（增加三张局部背景后），无依赖、无构建 |
| 相关文件 | 简历附页：`~/Desktop/求职材料/华天心-简历附页.html` 与 `.pdf` |

> ⚠️ 别去改 `~/Downloads/deepseekharness/我的作品集网站/`——那是一份**过期的早期副本**，`index.html` 已被改名为 `index_副本.html`。真正的项目只在上面那个 GitHub 目录。

---

## 3. 网站长什么样

### 页面（7 个）

| 文件 | 行数 | 内容 |
|---|---|---|
| `index.html` | 262 | 首页：局部自动切换画景 + 关于我 + **9 张技能卡** + **5 张项目卡** + 联系方式 |
| `projects.html` | 732 | 作品详情：**5 个完整案例**（念起 / 心情笔记 / 余白·墨間 / 昼夜 / RAG），每例含导语、设计理念、技术要点、量化数据、图集；底部还有**设计理念**专区（7 条准则 + 10 条否决清单）与技术关键词 |
| `blog.html` | 103 | 文章列表：**1 篇**置顶（→ `blog-rag.html`）。原先那 2 篇假占位文章已于 2026-10-14 删除 |
| `blog-rag.html` | 489 | 长文《我在一台 Mac 上跑通了三套 RAG 系统》完整正文（含表格、代码块、引用） |
| `gallery.html` | 119 | 相册：6 个条目（当前是 SVG 占位图） |
| `resume.html` | 188 | 简历页：个人简介 / 技能 / 教育经历 / 项目经历，带打印按钮 |
| `404.html` | 68 | 找不到页面时的兜底页。**资源必须用绝对路径** `/assets/...`，因为 GitHub Pages 会在任意路径下渲染它，相对路径会 404 |

### 资源

- `assets/css/style.css`（**1774 行**，CSS 变量驱动，全部设计 token 在文件开头）
- `images/backgrounds/sakura.jpg` / `bamboo.jpg` / `landscape.jpg`（约 **260 KB**，浅色顶部局部画景，右侧 **30%** 内每 8 秒轮换；夜间隐藏）
- `assets/js/main.js`（157 行：移动端菜单、昼夜切换、返回顶部、滚动显现动画）
- `images/avatar.svg`（头像 = 昼夜应用图标，**同时充当 favicon**）、`images/gallery1–6.svg`
- `images/og-cover.png`（**1200×630**，分享到微信/钉钉时的卡片图，2026-10-14 新增）
- `images/apple-touch-icon.png`（**180×180**，iOS 添加到主屏幕时的图标，2026-10-14 新增）
- `images/projects/`：4 张封面 + 各项目截图 + 4 张 RAG/念起占位图（共 12 个文件）
- `robots.txt` / `sitemap.xml`（2026-10-14 新增，给搜索引擎看）

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

> ⚠️ `og:image` 和 `canonical` 里的域名是硬编码的。**如果以后换域名或换仓库名，7 个页面都要改。**

### 3.2 无障碍与打印（2026-10-14 补齐）

- **skip-link**：每个页面 `<body>` 后的第一个元素是 `<a class="skip-link" href="#main">跳到正文</a>`，
  平时用 `top: -80px` 藏在屏幕外，按 Tab 才滑出来。对应的 `id="main"` 加在每页第一个内容区块上
  （`index.html` 的 hero id 因此从 `home` 改成了 `main`）。
- **`aria-current`**：导航里当前页那一项带 `aria-current="page"`（`blog-rag.html` 是文章子页，
  给「文章」加的是 `aria-current="true"`），CSS 用 `.nav-links a[aria-current]` 把它染成主题色。
- **`aria-expanded`**：手机菜单按钮带这个属性，`main.js` 开关菜单时同步更新；按 **Esc** 会关掉菜单
  并把焦点还给按钮，**点菜单外面的区域也会关**。
- **`:focus-visible`**：只在键盘操作时显示 2px 主题色描边，鼠标点击不出现，保持画面安静。
- **`color-scheme`**：`:root` 是 `light`，`body.dark` 是 `dark`，`applyTheme()` 里还会同步
  `document.documentElement.style.colorScheme`。**本站主题靠 class 切换、不靠系统设置**，
  所以不能只写 `:root { color-scheme: light dark }` —— 那样滚动条会跟着系统走，而不是跟着按钮走。
- **打印**：`@media print` 里必须保留 `.reveal { opacity: 1 !important; transform: none !important; }`。
  **删掉它，简历页打印出来就是 3 张白纸**（滚动淡入动画靠 JS 加 `.is-visible` 才显形，打印时观察器不触发）。

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

### 4.6 浅色局部画景（2026-10-14）

日间的首页、作品、文章列表、相册、简历、404 顶部，以及 RAG 长文开头的右侧，
有 **樱花 → 竹林 → 水墨山水** 三张自动轮换的极浅画景。三个素材在 `images/backgrounds/`，
`.scenery` 层由 CSS 控制，**宽度 `min(30%, 420px)`，绝不能超过顶部区域宽度的 1/3**；
长文只点缀前 `min(440px, 75vh)`，不覆盖正文阅读区域。
`scenery-cycle` 总周期 **24 秒**，每张 **8 秒**，淡入淡出，无需 JavaScript；
`aria-hidden="true"` 告诉读屏软件忽略装饰图；夜间 `body.dark .scenery {display:none}` 保留纯墨色；
系统选择「减弱动态效果」时停止轮换，固定樱花；打印时不显示。
此素材是**装饰背景，不是项目截图或相册照片**，不得拿它冒充真实作品记录。

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

> ⚠️ **别再把同一张图存两份。** 2026-10-14 删掉了 4 组重复（`cover-nianqi` = `nianqi-3`、
> `cover-mood` = `mood-1`、`cover-yohaku` = `yohaku-1`、`cover-zhouye` = `zhouye-1`），省了约 590 KB。
> 现在首页封面和项目页的那张截图**指向同一个文件**。想确认有没有新的重复，用：
> ```bash
> cd images/projects && md5 *.jpg *.svg | sort | awk '{h[$1]=h[$1]" "$2} END{for(k in h) if (split(h[k],a," ")>1) print k, h[k]}'
> ```

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

# 5) 打印简历不能是白纸（数 PDF 里的文字操作符，应该成千上万，不能是 0）
#    命令见第 11 节；期望：PDF 约 500 KB、文字操作符 3000 左右

# 6) 手机宽度下长文表格能横向滑动（期望 scrollWidth > clientWidth 且 overflowX=auto）
#    用 --window-size=390,900 + --dump-dom 取测得的数值

# 7) 线上验证（推送后）
for p in "" projects.html blog-rag.html blog.html resume.html gallery.html robots.txt sitemap.xml; do
  echo "$(curl -s -o /dev/null -m 20 -w '%{http_code}' https://huatianxin02.github.io/$p)  /$p"
done
# 404 页要挑一个不存在的地址来验：
curl -s -o /dev/null -m 20 -w '%{http_code}\n' https://huatianxin02.github.io/this-page-does-not-exist
```

Pages 重新构建期间，**新文件会短暂 404**（旧文件仍 200）——属正常，等 1–2 分钟再试。

---

## 9. 已知待办 / 悬而未决

> 2026-10-14 清掉了两批。**第一批**：页脚年份（2024→2026）、页脚残留的爱心 emoji、`main.js` 里的调试日志、
> `blog.html` 两篇假文章、导航里缺的「简历」入口，并补上 favicon 与分享卡片。
> **第二批**：打印空白页、手机表格被裁、锚点被导航压住、暗色滚动条、无障碍标记、标题层级、
> 过期的 `README.md`、4 组重复图片、图片懒加载，并新增 `robots.txt` / `sitemap.xml` / `404.html`。
> 下面这些是**仍然存在**的问题。

1. **念起的 macOS 截图缺失** —— `images/projects/nianqi-1.svg` 还是占位图，其他项目都有真截图。等作者提供。
2. **心情笔记测试数口径不一** —— 简历与本站写 **529 项**，但某份设计文档写 **540 项**，作者尚未确认。
3. **相册仍是占位图** —— `images/gallery1–6.svg`，未放真实照片。
4. **`.DS_Store` 在磁盘上仍存在**（已被 `.gitignore` 忽略，不影响仓库）。
5. **提交信息质量差** —— 历史上出现过 `000` 这种信息；2026-10-14 的提交是 `20261014.2`，比 `000` 好，但仍看不出改了什么。请提醒作者写清楚。
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
13. **补门面 + 清理旧账（2026-10-14，第一批）** —— 一次全站审计发现：页脚还停在 2024 且留着全站唯一的装饰 emoji、没有 favicon（线上 `/favicon.ico` 返回 404）、没有分享卡片（把链接发给 HR 只有一行光秃秃的网址）。于是：页脚统一改成 `© 2026 华天心`；6 个页面 `<head>` 补上 favicon / `theme-color` / `og:` 分享卡片 / `canonical`；分享图和 iOS 图标用**无头 Chrome 截图**现生成（`images/og-cover.png`、`images/apple-touch-icon.png`）；导航补上「简历」；删掉 `blog.html` 两篇假文章；清掉 `main.js` 的 `console.log` 和一句过时注释。已推送为 `3d0d310`。
14. **修 bug + 无障碍 + 去重（2026-10-14，第二批）** —— 往深挖了一层，挖到两个**会丢内容的真 bug**：
    - ① **打印简历出来是 3 张白纸** —— 无头 Chrome 打出的 PDF 只有 1877 字节、**0 个文字操作符**；根因是滚动淡入动画 `.reveal { opacity: 0 }` 在打印时不被解除（内容透明但仍占版面，所以是 3 页空白）。在 `@media print` 里强制显形后变成 **528708 字节、3033 个文字操作符**。
    - ② **手机上长文表格第 4 列被裁且滑不回来** —— `table { width: 100% }` 没有滚动容器，`body { overflow-x: hidden }` 又把溢出裁掉。改成 `display: block; overflow-x: auto` + 单元格 `white-space: nowrap` 后，实测 390px 下 `scrollWidth=917 > clientWidth=440`、`overflowX=auto`，可横向滑动。

    另外修了：锚点跳转被吸顶导航压住（`scroll-margin-top` 的选择器只写了 `section[id]`，5 个项目锚点却挂在 `<article class="project-case">` 上）、暗色模式滚动条仍是浅色（缺 `color-scheme`）、`resume.html` 有两个 `<h1>`、`blog.html` 从 h1 直接跳 h3、`README.md` 还是模板说明。

    还加了：skip-link、`aria-expanded`、`aria-current` + 导航当前页高亮、`:focus-visible`、菜单的 Esc / 点击外部关闭、22 张图 `loading="lazy" decoding="async"`、`robots.txt` / `sitemap.xml` / `404.html`。

    删掉 4 个与封面 md5 完全相同的重复图片（`nianqi-3` / `mood-1` / `yohaku-1` / `zhouye-1`），`projects.html` 改指 `cover-*`，`images/` 从 1.9 MB 降到 1.3 MB。此批已提交至 `f1841ef`。

    > **一处自我纠错**：上一轮我说「`<img>` 没有 `width`/`height` 会导致布局抖动」，这是**错的** ——
    > `.project-card img`(200px) / `.gallery-item img`(230px) / `.case-gallery img`(235px) 都已经用 CSS
    > 固定了高度，不存在 CLS，所以**没有**加尺寸属性。以后别再照抄那个结论。

    仍未做：4 张占位图（念起 macOS + RAG 三张）、相册 6 张占位图、图片没有 WebP 版本。前两项需要作者提供真图。
15. **简约风格增加轮换背景（2026-10-14）** —— 作者要求浅色樱花、竹林、水墨山水轮换，画面占比不超过 1/3。新生成并压缩的三张 JPG 共约 260 KB，放 `images/backgrounds/`；
    6 个页面的顶部 `.scenic-hero` 和 RAG 文章开头复用 3 层纯 CSS 动画，右侧画景宽度上限 **30%**；
    每 8 秒换一张、24 秒一轮。手机 390px 宽度实测画景 117px、无页面横向溢出；轮换在 0 / 8 / 16 秒依次只显示樱花 / 竹林 / 山水。
    暗色模式隐藏画景；减弱动态时仅显示静态樱花；打印完全隐藏。此次**本地尚未提交/推送**。

### 作者的工作偏好（照做就对了）

- **要可测量。** 他喜欢"对比度 3.64 → 9.74"这种话，不喜欢"更好看了"。
- **要诚实标注边界。** 见第 5.3 节。
- **验证后再说话。** 声称"已上线"之前，必须 curl 过线上页面。
- **一步步教。** 涉及 GitHub 操作时给按钮级步骤，并提醒 `⌘ + Shift + R`。

---

## 11. 这台机器的环境（给 AI 的操作提示）

- 系统 **macOS**（Apple Silicon，M1）。Git：`/opt/homebrew/bin/git`（2.49.0）。
- **读图**：用 Read 工具**直接读 PNG/JPG 是可以的**（2026-10-14 实测成功，能看到内容并判断排版）。
  旧记录里「本机模型不支持读图」的说法**已不成立**，别再拿它当借口跳过视觉检查。
  万一某次读图失败，再退回 macOS Vision OCR（`VNRecognizeTextRequest`，`recognitionLanguages = ["zh-Hans","en-US"]`）。
- **PDF 读不了**（Read 会报 "Cannot display content of binary file"）。想知道 PDF 里有没有内容，
  直接解压它的流、数文字操作符：
  ```python
  import re, zlib
  data = open('x.pdf','rb').read()
  print('大小', len(data), '页数', len(re.findall(rb'/Type\s*/Page[^s]', data)))
  for s in re.findall(rb'stream\r?\n(.*?)\r?\nendstream', data, re.S):
      try:
          d = zlib.decompress(s)
          print('流', len(d), '字节，文字操作符', len(re.findall(rb'(Tj|TJ)', d)))
      except Exception:
          pass
  ```
  **「打印出来是白纸」就是这么发现的**：3 页 PDF、1877 字节、每页只有一个白色填充矩形、0 个 `Tj`。
- **Chrome 无头模式**（本机已装 Google Chrome）是这个项目最好用的验证工具：截图、打印 PDF、跑 JS 都行。

  ```bash
  CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

  # 截图（--window-size=390,900 就是手机宽度）
  "$CHROME" --headless=new --no-sandbox --disable-gpu --hide-scrollbars --no-first-run \
    --force-prefers-reduced-motion --user-data-dir=/tmp/c1 --window-size=1280,900 \
    --virtual-time-budget=5000 --screenshot=/tmp/out.png "file:///绝对路径/页面.html"

  # 打印 PDF
  "$CHROME" --headless=new --no-sandbox --disable-gpu --no-first-run \
    --user-data-dir=/tmp/c2 --no-pdf-header-footer --virtual-time-budget=4000 \
    --print-to-pdf=/tmp/out.pdf "file:///绝对路径/resume.html"
  ```

  - **必须加 `--no-sandbox`**。不加会随机报 `GPU process isn't usable. Goodbye.` 然后什么都不输出。
  - **截图时必须加 `--force-prefers-reduced-motion`**。不加的话 `.reveal` 元素还在淡入途中，
    截图会一片发暗，很容易误判成「样式坏了」。
  - **每次换一个 `--user-data-dir`**（`/tmp/c1`、`/tmp/c2`…），复用同一个会抢锁失败。
  - 想看 JS 算出来的值（比如表格到底能不能横向滑动），在页面里把结果写进 DOM，再用 `--dump-dom` 抓出来，
    比截图可靠。注意 `--dump-dom` 抓得早，IntersectionObserver 可能还没触发，
    **别用它判断「元素显没显形」**。
  - `task_policy_set ... invalid argument` / `CVDisplayLink ... failed` 是**无害噪音**。
  - 本地用 `file://` 打开时，页面里的**绝对路径**（如 `/assets/css/style.css`）会指向文件系统根目录而失效。
    要验这类页面（比如 `404.html`），先用 Python 把路径换成绝对文件路径生成一份临时副本。
- **不要起后台 HTTP 服务**（`python3 -m http.server &`）——在这个 shell 里会把命令挂到超时。做静态验证（grep / 文件存在性检查 / 无头截图）就够了。
- **`sed -i ''` 在这台机器上不可靠** —— 实测报 `sed: ...: No such file or directory`。
  要批量替换文本，直接用 Python 读写文件。
- **`grep --include=*.html` 在 zsh 下会被当成 glob 报错**（`no matches found`）。用 Grep 工具，或先 `grep -r pattern .` 再过滤。
- `edit` 工具在文件被其他命令改过之后会报 "file changed since it was read"，**先重新 read 一小段再改**。
- 同一个文件的多次 `edit` 可以放在同一条消息里（按顺序执行，不会互相覆盖）。

---

## 12. 一句话总结给下一个 AI

**这是一个"用可验证性对抗自我美化"的作品集站**：视觉上是安静克制的昼夜双主题，内容上是带真实数字和诚实边界的工程记录。
改它的时候，宁可少加一个动效，也不要加一句编造的数字。
