# 我的作品集网站

这是一个**个人作品集 / 简历网站**模板，纯静态网页，完全免费，不需要懂编程也能使用。

## 一、文件结构

```
我的作品集网站/
├── index.html            ← 网站的主要页面（改内容基本只动这个文件）
├── assets/
│   ├── css/style.css     ← 网站样式（想换颜色、字体改这里，也可以不改）
│   └── js/main.js        ← 交互脚本（一般不用改）
├── images/               ← 放你的头像和作品图片
└── README.md             ← 本说明文件
```

## 二、先在电脑上预览

最简单的方法：

1. 双击打开 `index.html`，用浏览器（Chrome / Edge）就能看到效果。
2. 桌面和手机端都是自适应布局，可以缩放窗口看看效果。

> 提示：如果你在浏览器里改了代码，刷新一下页面就能看到变化。

## 三、怎么修改内容

打开 `index.html`，用任何文本编辑器（推荐 **VS Code**，免费）编辑即可。
我在文件里用中文注释标出了可以改的地方，例如：

- `<title>我的作品集 | 个人主页</title>` → 浏览器标签页标题
- `你好，我是 李明` → 你的名字
- `设计师 / 开发者 / 创作者` → 你的身份标签
- `你好！我是一名热爱创作的年轻人……` → 你的自我介绍
- `所在城市：北京` → 你的信息
- 技能卡片、作品卡片 → 想加就复制一段 `div`，想删就删掉对应的 `div`

### 添加图片

1. 把图片放进 `images` 文件夹。
2. 修改 `index.html` 中对应的 `src`，例如：

```html
<img src="images/avatar.jpg" alt="头像" />
```

把 `avatar.jpg` 改成你图片的文件名。

没有头像/图片时，把对应的 `<img ...>` 那一行删掉即可，页面不会报错。

### 修改颜色 / 字体（可选）

打开 `assets/css/style.css`，最上面的 `:root` 里有颜色变量：

```css
--primary: #4f6ef7;   /* 主色 */
--accent: #ff6b6b;    /* 强调色 */
```

把 etc 这些 `#xxxxxx` 换成你想要的颜色就行。

## 四、怎么发布到网上（免费）

推荐使用 **GitHub Pages**（免费），按下面步骤操作：

### 前置准备

- 注册一个 [GitHub](https://github.com) 账号，免费。
- 在电脑上安装 [Git](https://git-scm.com/downloads)。

### 步骤 1：在 GitHub 上新建仓库

1. 登录 GitHub，点右上角 **+** → **New repository**。
2. 仓库名填 `username.github.io`（`username` 换成你的 GitHub 用户名）。
3. 勾选 **Public**，点 **Create repository**。

> 为什么这么命名？用这个仓库名部署后，你的网址就是 `https://username.github.io`，就是你的主页。

### 步骤 2：把网站文件上传到仓库

在终端里进入网站文件夹，执行：

```bash
cd 我的作品集网站

git init
git add .
git commit -m "我的作品集网站"
git branch -M main
git remote add origin https://github.com/你的用户名/你的仓库名.git
git push -u origin main
```

> 地址会提示你填 GitHub 用户名和密码 / 访问令牌。

**如果不想用命令行：** 直接在 GitHub 仓库页面点 **Add file → Upload files**，把 `index.html` 和 `assets`、`images` 文件夹拖进去也可。

### 步骤 3：开启 GitHub Pages

1. 进入仓库 **Settings**。
2. 左侧找到 **Pages**。
3. 在 **Source** 选择 `Deploy from a branch`，分支选 `main`，目录选 `/ (root)`，点 **Save**。
4. 等 1~2 分钟，访问 `https://你的用户名.github.io` 就能看到网站了。

### 步骤 4（可选）：绑定自己的域名

如果你有域名，可到域名服务商把域名解析（CNAME / A 记录）指向 GitHub，再在 Pages 设置里填域名并开启 HTTPS。

## 五、另一种更简单的发布方式（推荐新手）

使用 **Vercel** 或 **Netlify**（都免费）：

1. 把网站上传到 GitHub 仓库（同上）。
2. 注册 [Vercel](https://vercel.com) 或用 GitHub 登录。
3. 点 **Add New → Project**，选择你的仓库，直接点 **Deploy**。
4. 部署完成后获得 `xxx.vercel.app` 免费地址，还能一键绑定自己的域名。

> 这种方式不用在 GitHub 里手动开启 Pages，部署更直观。

## 六、之后怎么更新内容

每改一次内容，就把更新后的文件同步到 GitHub，网站会自动更新：

```bash
git add .
git commit -m "更新内容"
git push
```

如果是用 Vercel / Netlify，只要把新文件推送到 GitHub，网站也会自动重新部署。

---

有任何一步不明白，可以随时把报错信息或截图发给我，我帮你处理。
