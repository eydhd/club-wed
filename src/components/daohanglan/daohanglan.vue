<template>
  <div class="daohanglan">
    <button
      v-for="btn in buttons"
      :key="btn.path"
      :value="btn.value"
      @click="$router.push(btn.path)"
    >
      {{ btn.text }}
    </button>
  </div>
</template>

<script lang="ts">
import './index.css'
import { defineComponent } from 'vue'

// 定义按钮数据的接口，明确类型
interface ButtonItem {
  value: string // 按钮的值
  text: string // 按钮显示内容
  path: string // 路由路径（确保为 string 类型，用于 key）
}

export default defineComponent({
  props: {
    buttons: {
      type: Array as () => ButtonItem[], // 指定数组类型
      required: true,
      validator: (value: ButtonItem[]) => {
        return value.every(
          (btn) =>
            typeof btn.value === 'string' &&
            typeof btn.text === 'string' &&
            typeof btn.path === 'string', // 确保 path 是字符串
        )
      },
    },
  },
})
</script>
