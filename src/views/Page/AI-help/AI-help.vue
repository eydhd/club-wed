<template>
  <Return />
  <Tuo :data="someData" />
  <returns />
  <div id="AI-help"></div>
</template>
<script>
import Return from '@/components/return/return.vue'
import Tuo from '@/components/tuo/tuo.vue'
import returns from '@/components/return/returns.vue'
import { start } from 'qiankun'

export default {
  data() {
    return {
      someData: 'AI-聊天室',
    }
  },
  // 将 onMounted 放在 mounted 钩子中
  mounted() {
    start()
  },
}
</script>
<style scoped>
.ai-help-container {
  width: 100%;
  height: 100vh;
}
</style>
