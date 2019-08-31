<template>
  <div>
      i'm you father {{famsg}}
      <hr>
      <son @input = 'fn'></son>
      </div>
</template>

<script>
import Son from './com-son'
export default {
  components: { Son },
  data () {
    return {
      famsg: ''
    }
  },
  methods: {
    fn (data) {
      this.famsg = data
    }
  }

}
</script>

<style lang="less" scoped>
</style>
