<template>
  <div class="tou">
    <!-- 使用 show 变量 -->
    <h1>博客 {{ data }}</h1>
    <p id="dataTimeDisplay"></p>
  </div>
</template>
<script>
import './index.css'
import dayjs from 'dayjs' // 引入day.js

export default {
  props: ['data'],
  data() {
    return {
      show: false, // 定义 show 变量并初始化为 false
    }
  },
  name: 'Tuo',
  mounted() {
    function updateTime() {
      // 使用day.js格式化时间
      const timeStr = dayjs().format('YYYY-MM-DD HH:mm:ss')
      const dataTimeDisplay = document.getElementById('dataTimeDisplay')
      if (dataTimeDisplay) {
        dataTimeDisplay.textContent = timeStr
      }
    }

    setInterval(updateTime, 1000)
    updateTime()
  },
}
</script>
