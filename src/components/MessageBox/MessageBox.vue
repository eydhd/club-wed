<template>
  <div class="modal" v-if="visible" @click.self="handleClose">
    <div class="box">
      <!-- 标题区域 -->
      <div class="header" v-if="title">
        <span class="title-text">{{ title }}</span>
      </div>
      <!-- 内容区域 -->
      <div class="content">
        {{ message }}
      </div>
      <!-- 按钮区域 -->
      <div class="footer">
        <Button :data="someData" @click="handleConfirm" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Button from "./components/Button/Button.vue";
import "./index.css";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    Button,
  },
  data() {
    return {
      someData: "confirmText",
    };
  },
  props: {
    // 是否显示弹框
    visible: {
      type: Boolean,
      default: true, // 默认显示
    },
    // 标题
    title: {
      type: String,
      default: "",
    },
    // 内容消息
    message: {
      type: String,
      required: true,
    },
    // 确认按钮文本
    confirmText: {
      type: String,
      default: "确认",
    },
    // 点击外部是否关闭
    closeOnClickOutside: {
      type: Boolean,
      default: true,
    },
  },
  emits: ["confirm", "cancel", "close"],
  methods: {
    handleConfirm() {
      this.$emit("confirm");
    },
    handleClose() {
      if (this.closeOnClickOutside) {
        this.$emit("close");
      }
    },
  },
});
</script>
