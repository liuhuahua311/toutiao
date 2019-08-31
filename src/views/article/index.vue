<template>
  <div>
    <!-- 卡片 -->
    <el-card>
      <div slot="header">
        <!-- 使用封装的面包屑组件 -->
        <my-bread>内容管理</my-bread>
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
          <!-- 使用频道组件 v-model==== :value @input,所以说v-model相当于绑定了自定义事件-->
          <my-channel v-model="reqParams.channel_id"></my-channel>

        </el-form-item>

        <el-form-item label="日期：">
          <el-date-picker
            v-model="dateArr"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="changeDate"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="search">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 筛选结果 -->
    <el-card>
      <div slot="header">根据筛选条件共查询到 {{total}} 条结果：</div>
      <!-- 表格 -->
      <el-table :data="articles">
        <!-- 封面 cover.images[0] 默认第一张，这样不行，因为它取出的是字符串，图片的地址 -->
        <!-- prop作用是把字段背后的值渲染在列的位置 -->
        <!-- 需要提图片，而不是地址，所以需要往组件里插入额外的内容，所以要用插槽 -->
        <!-- 使用插槽，并且渲染图片需要数据，所以是用作用域插槽 -->
        <el-table-column label="封面">
          <template slot-scope="scope">
            <el-image
              :src="scope.row.cover.images[0]"
              style="width:160px;height:100px;border:1px solid #ddd"
              fit="cover"
            >
              <div slot="error" class="image-slot">
                <img src="../../assets/images/error.gif" width="160" height="100" alt />
              </div>
            </el-image>
          </template>
        </el-table-column>
        <!-- scope代表每一个列数据 -->

        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status===0" type="info">草稿</el-tag>
            <el-tag v-if="scope.row.status===1">待审核</el-tag>
            <el-tag v-if="scope.row.status===2" type="success">审核通过</el-tag>
            <el-tag v-if="scope.row.status===3" type="warning">审核失败</el-tag>
            <el-tag v-if="scope.row.status===4" type="danger">已删除</el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="pubdate" label="发布时间"></el-table-column>

        <el-table-column label="操作" width="120px">
          <template slot-scope="scope">
            <el-button @click = "$router.push('/publish?id='+scope.row.id)" type="primary" icon="el-icon-edit" circle plain></el-button>
            <el-button
              type="danger"
              @click="delArticle(scope.row.id)"
              icon="el-icon-delete"
              circle
              plain
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        class="pager"
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="reqParams.per_page"
        :current-page="reqParams.page"
        @current-change="changePager"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  created () {
    // 页面一加载就渲染，所以调用getChannelOptions方法
    // this.getChannelOptions() 使用封装组件获取了
    this.getArticles()
  },
  methods: {
    delArticle (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          // 发送删除请求，看文档
          // get 获取数据 post 添加数据 delete 删除属性  put 完整修改数据 patch局部修改数据
          await this.$http.delete(`articles/${id}`)
          this.$message.success('删除成功')
          this.getArticles()
        })
        .catch(() => {
          // 点击取消不需要做什么
        })
    },
    changeDate (valueArr) {
      if (valueArr) {
        this.reqParams.begin_pubdate = valueArr[0]
        this.reqParams.end_pubdate = valueArr[1]
      } else {
        this.reqParams.begin_pubdate = null
        this.reqParams.end_pubdate = null
      }
    },

    // 筛选搜索
    search () {
      // 根据新的筛选条件，去筛选数据 ，所以拿数据就可以了
      // 点击了筛选，就应该把页面重置到1
      this.reqParams.page = 1
      // 为单选项设置clearable清空功能，但清空之后的值是''而不是null所以需要设置为null
      // if (this.reqParams.channel_id === '') {
      //   this.reqParams.channel_id = null
      // }//在提交数据前判断，就是在my-channel中写
      this.getArticles()
    },
    changePager (newPage) {
      this.reqParams.page = newPage // 将点击的新页码赋值给默认页码
      this.getArticles() // 重新获取数据
    },

    async getArticles () {
      // post请求传参 post(url,数据)
      // get请求传参  get(url,{params:数据})
      const {
        data: { data }
      } = await this.$http.get('articles', { params: this.reqParams })
      this.articles = data.results // results是文档中规定的文章列表
      this.total = data.total_count // total_count是获取获取总条数，data里的
    }
  },
  data () {
    return {
      reqParams: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null,
        page: 1,
        per_page: 20
      },
      // 绑定日期数据  格式数组 [起始日期，结束日期]
      dateArr: [],
      // 假设的表格数据
      articles: [],
      total: 0
    }
  }
}
</script>

<style lang="less" scoped>
.el-card {
  margin-bottom: 20px;
}
.pager {
  text-align: center;
  margin-top: 20px;
}
</style>
