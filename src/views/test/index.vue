<template>
    <div>
        <!-- 使用组件 -->
        <com-a>
            <div slot="conter" slot-scope="scope">内容一{{scope.msg}}</div>
            <div slot="foot">底部一</div>
        </com-a>
        <hr>
        <com-a></com-a>
        <my-bread>测试组件</my-bread>
    </div>
</template>

<script>
import ComA from './com-a'
export default {
  components: { ComA }
}
</script>

<style lang="less" scoped>
</style>
