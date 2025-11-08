<script>
import Daohanglan from '@/components/daohanglan/daohanglan.vue'
import Returns from '@/components/return/returns.vue'
import Search from '@/components/Search/Search.vue'
import Tuo from '@/components/tuo/tuo.vue'
export default defineComponent({
  setup() {
    // 定义符合要求的按钮数据
    const navButtons = ref([
      { value: 'home', text: '首页', path: '/' },
      { value: 'article', text: '文章', path: '/about' },
      { value: 'club', text: '俱乐部', path: '/club' },
      { value: 'comment', text: '评论区', path: '/Comment' },
      { value: 'about', text: '关于', path: '/concerning' },
      { value: 'AI-help', text: 'AI-聊天室', path: '/AI-help' },
    ])

    return {
      navButtons,
    }
  },
})
</script>
<template>
  <Tuo />
  <daohanglan :buttons="navButtons" />
  <Search />
  <returns />
</template>
<style>
* {
  margin: 0px;
  padding: 0px;
}
body {
  background: #0c192c;
}
</style>
