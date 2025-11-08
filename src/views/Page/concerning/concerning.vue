<template>
  <Return />
  <Tuo :data="someData" />
  <Returns />
</template>
<script>
import Return from '@/components/return/return.vue'
import Returns from '@/components/return/returns.vue'
import Tuo from '@/components/tuo/tuo.vue'

export default {
  data() {
    return {
      someData: '关于', // 定义 someData
    }
  },
}
</script>
<style></style>
