<template>
  <Tuo :data="someData" />
  <Return />
  <Returns></Returns>
</template>
<script>
export default {
  data() {
    return {
      msg: 'Welcome to the About Page',
      someData: '文章', // 定义 someData
    }
  },
}
</script>
