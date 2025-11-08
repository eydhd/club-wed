<template>
  <div class="login-register-container">
    <button class="login-btn">登陆</button>
    <span class="separator">|</span>
    <button class="register-btn">注册</button>
  </div>
</template>
<style scoped>
.login-register-container {
  /* 定位到右上角 */
  position: absolute;
  top: 20px;
  right: 20px;
  /* 横向排列元素 */
  display: flex;
  align-items: center;
  gap: 15px; /* 元素间距 */
}

.login-btn,
.register-btn {
  padding: 6px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

/* 登录按钮样式 */
.login-btn {
  background-color: #0c192c;
  color: #333;
}

.login-btn:hover {
  border-color: #409eff;
  color: #409eff;
}

/* 注册按钮样式 */
.register-btn {
  background-color: #0c192c;
  color: #333;
}

.register-btn:hover {
  border-color: #409eff;
  color: #409eff;
}

/* 分隔符样式 */
.separator {
  color: #0c192c;
  font-size: 16px;
}
</style>
