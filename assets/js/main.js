/* =====================================================
   我的作品集网站 - 交互脚本
   这个文件一般不需要改，它负责手机端菜单的打开/关闭
   ===================================================== */

// 找到手机端菜单按钮和导航链接
const toggleBtn = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

// 点击按钮时，切换菜单的显示/隐藏
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

// 记录页面浏览情况（可选，不需要可以删掉）
console.log("🌐 我的作品集网站已加载");
