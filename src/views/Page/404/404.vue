<template>
  <div class="not-found-container">
    <div class="not-found-content">
      <div class="not-found-icon">
        <font-awesome-icon icon="triangle-exclamation" size="8x" />
      </div>
      <h1 class="not-found-title">404</h1>
      <p class="not-found-message">抱歉，您访问的页面不存在或已被移除</p>
      <div class="not-found-actions">
        <button class="home-button" @click="goHome">返回首页</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import "./index.css";
// 添加图标到库中
library.add(faTriangleExclamation);

const router = useRouter();

// 返回上一页
const goBack = () => {
  router.go(-1);
};

// 返回首页
const goHome = () => {
  router.push("/");
};
</script>
