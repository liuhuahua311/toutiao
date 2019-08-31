<template>
    <div>
        son  <button @click = 'sendmsg'>发送数据</button>
    </div>
</template>

<script>
export default {
  data () {
    return {
      msg: '子组件数据'
    }
  },
  methods: {
    sendmsg () {
      this.$emit('input', this.msg)
    }
  }
}

</script>

<style lang="less" scoped>
</style>
