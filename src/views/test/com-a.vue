<template>
    <div>
        <!-- 组件内部 -->
        <div>header</div>
        <div><slot name="conter" :msg="message" list='数组'>默认内容</slot></div>
        <div><slot name="foot">底部内容</slot></div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      message: '这是组件内部数据com-a'
    }
  }
}
</script>

<style lang="less" scoped>
</style>
