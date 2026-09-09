/* =====================================================
   华天心的网站 - 交互脚本
   这个文件一般不需要改，它负责：
   1. 手机端菜单的打开/关闭
   2. 深色模式一键切换（会记住你的选择）
   3. 返回顶部按钮
   ===================================================== */

/* ---------- 1. 手机端菜单 ---------- */
const toggleBtn = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (toggleBtn && navLinks) {
  toggleBtn.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  // 点击菜单里的某个链接后，自动收起菜单
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
    });
  });
}

/* ---------- 2. 深色模式 ---------- */
const themeToggle = document.querySelector(".theme-toggle");

function applyTheme(theme) {
  const isDark = theme === "dark";
  document.body.classList.toggle("dark", isDark);
  if (themeToggle) {
    // 深色模式时显示☀️（点了能回到浅色），浅色模式时显示🌙
    themeToggle.textContent = isDark ? "☀️" : "🌙";
  }
  // 记住选择，下次打开网站还是这个模式
  localStorage.setItem("theme", theme);
}

// 打开网站时：优先用上次的选择，没有就跟随系统设置
(function initTheme() {
  const saved = localStorage.getItem("theme");
  const prefersDark =
    window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(saved || (prefersDark ? "dark" : "light"));
})();

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const isDark = document.body.classList.contains("dark");
    applyTheme(isDark ? "light" : "dark");
  });
}

/* ---------- 3. 返回顶部 ---------- */
const backToTop = document.getElementById("backToTop");

if (backToTop) {
  // 向下滚动超过 300px 后显示按钮
  window.addEventListener("scroll", () => {
    backToTop.classList.toggle("show", window.scrollY > 300);
  });

  // 点击后平滑回到顶部
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

console.log("🌐 华天心的网站已加载");
