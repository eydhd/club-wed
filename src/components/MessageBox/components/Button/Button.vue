<template>
  <button class="btn confirm">{{ data }}</button>
</template>
<style>
.btn {
  padding: 6px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
  border: 1px solid #ddd;
}
.btn.confirm {
  background-color: #409eff;
  color: #fff;
  border-color: #409eff;
}

.btn.confirm:hover {
  background-color: #66b1ff;
}
</style>
<script>
export default {
  props: ["data"],
  data() {
    return {
      show: false, // 定义 show 变量并初始化为 false
    };
  },
};
</script>
