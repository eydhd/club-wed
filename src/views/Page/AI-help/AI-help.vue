<template>
  <Return />
  <Tuo :data="someData" />
  <returns />
  <div class="AI-help"></div>
</template>
<script>
import Return from '@/components/return/return.vue'
import Tuo from '@/components/tuo/tuo.vue'
import returns from '@/components/return/returns.vue'
import { start } from 'qiankun'

onMounted(() => {
  start()
})
export default {
  data() {
    return {
      someData: 'AI-聊天室',
    }
  },
}
</script>
