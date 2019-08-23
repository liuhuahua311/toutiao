<template>
    <div class = 'container'>
        <el-card class="my-card">
            <img src="../../assets/images/logo_index.png" alt="">
            <el-form :model="loginForm" >
                <el-form-item>
                    <el-input v-model="loginForm.mobile" placeholder="请输入手机号码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="loginForm.code" placeholder="请输入验证码" style="width:238px;margin-right:10px"></el-input>
                     <el-button>发送验证码</el-button>
                </el-form-item>
                <el-form-item>
                    <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" style="width:100%">登录</el-button>
                </el-form-item>
            </el-form>
        </el-card>

    </div>

</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        mobile: '',
        code: ''

      }
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
