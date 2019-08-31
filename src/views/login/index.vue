<template>
    <div class = 'container' ref='box'><!--添加ref属性     在页面渲染完毕后才拿到dom对象-->
        <el-card class="my-card">
            <img src="../../assets/images/logo_index.png" alt="">

            <el-form ref="loginForm" :model="loginForm"  :rules="loginRules" status-icon>

                <el-form-item prop="mobile">
                    <el-input v-model="loginForm.mobile" placeholder="请输入手机号码"></el-input>
                </el-form-item>

                <el-form-item prop="code">
                    <el-input v-model="loginForm.code" placeholder="请输入验证码" style="width:238px;margin-right:10px"></el-input>
                     <el-button>发送验证码</el-button>
                </el-form-item>
                <el-form-item>
                    <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
                </el-form-item>
                <el-form-item>
                    <el-button @click='login()' type="primary" style="width:100%">登录</el-button>
                </el-form-item>
            </el-form>
        </el-card>

    </div>

</template>

<script>
import store from '@/store'
export default {
  // 这个生命周期就是等页面加载完毕了，然后使用ref就能拿到整个div dom元素
  mounted () {
    const box = this.$refs.box
    // $refs的意思，是当前组件使用过ref属性的元素集合（对象）
    // ref='value'，这个属性值value是一个对象，就是集合了所有的属性值
    console.log(box)// 这获取的是dom元素
    const loginForm = this.$refs.loginForm
    console.log(loginForm)// 这获取的是vue组件实例对象，可以调用里面的方法
  },
  data () {
    const checkMobile = (rule, value, callback) => {
      // 自定义校验逻辑
      // 是否是合法的手机号：第一位只能是1，第二位是3-9，剩下9位随意
      // 用正则
      if (!/^1[3-9]\d{9}$/.test(value)) {
        return callback(new Error('手机号不合法'))
      }
      callback()
    }
    return {
      // 表单数据对象
      loginForm: {
        mobile: '',
        code: ''

      },
      // 表单校验规则对象
      loginRules: {
        mobile: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { validator: checkMobile, tirgger: 'change' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '验证码长度为6位数', tirgger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      this.$refs.loginForm.validate(async (valid) => {
        // if (valid) {
        //   this.$http.post('http://ttapi.research.itcast.cn/mp/v1_0/authorizations', this.loginForm)
        //     .then(res => {
        //       // 登录成功时保存用户信息
        //       // res是响应对象， res.data响应工作  res.data.data就是数据
        //       // 用户信息 res.data.data
        //       // 封装一个 store 文件，共同调用
        //       store.setUser(res.data.data)
        //       this.$router.push('/')
        //     })
        //     .catch(() => {
        //       this.$message.error('手机号或验证码错误')
        //     })
        // }//这是用promise做的，现在用ansync做
        // 登录成功后，获取用户信息数据
        try {
          const { data: { data } } = await this.$http.post('authorizations', this.loginForm)
          store.setUser(data)
          this.$router.push('/')
        } catch (e) {
          this.$message.error('手机号或验证码错误')
        }
      })
    }

  }
}
</script>

<style lang="less" scoped>
    .container {
        background:url(../../assets/images/login_bg.jpg);
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        .my-card {
            width: 400px;
            height: 350px;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
            img {
                width: 200px;
                display: block;
                margin:20px auto;

            }
        }
    }
</style>
