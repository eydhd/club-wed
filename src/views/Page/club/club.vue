<template>
  <Return />
  <Tuo :data="someData" />
  <returns />
</template>
<script>
import Return from '@/components/return/return.vue'
import Tuo from '@/components/tuo/tuo.vue'
import returns from '@/components/return/returns.vue'
export default {
  data() {
    return {
      someData: '俱乐部',
    }
  },
}
</script>
<style></style>
