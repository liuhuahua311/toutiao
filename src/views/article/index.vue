<template>
  <div>
    <!-- 卡片 -->
    <el-card>
      <div slot="header">
        <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>粉丝管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <!-- 表单 -->
      <el-form label-width="80px" size="small ">
        <!-- 单选按钮 -->
        <el-form-item label="状态：">
          <el-radio-group v-model="reqParams.status">
            <!-- v-model双向绑定.当选第一项的时候，v-model的值会变成0 -->
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="频道：">
          <el-select v-model="reqParams.channel_id" placeholder="请选择">
            <el-option
              v-for="item in channelOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="日期：">
          <el-date-picker
            v-model="dateArr"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>

        <el-form-item>
          <el-button type="primary">筛选</el-button>
        </el-form-item>

      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      reqParams: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null
      },
      channelOptions: [
        // 数据后面从后端来，先假设一些数据
        { id: 100, name: 'c++' }
      ],
      // 绑定日期数据  格式数组 [起始日期，结束日期]
      dateArr: []
    }
  }
}
</script>

<style lang="less" scoped>
</style>
