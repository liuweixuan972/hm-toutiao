<template>
  <div class="container">
    <el-card>
      <img src="../../assets/timg.jpg" alt />
      <el-form :model="loginform" :rules="rules" status-icon ref="ruleForm">
        <!-- el-form-item 表单容器  label="活动名称" 指定说明文字 -->
        <el-form-item prop="mobile">
          <!-- 表单元素 -->
          <el-input
            v-model="loginform.mobile"
            placeholder="请输入手机号"
            style="display:block;margin-top:10px"
          ></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input
            v-model="loginform.code"
            placeholder="请输入验证码"
            style="width:240px;margin-right:8px;margin-top:10px"
          ></el-input>
          <el-button>发送验证码</el-button>
        </el-form-item>

        <el-form-item>
          <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    var checkMobile = (rule, value, callback) => {
      if (/^1[3-9]\d{9}$/.test(value)) {
        callback()
      } else {
        callback(new Error('手机号格式不正确'))
      }
    }
    return {
      loginform: {
        mobile: '',
        code: ''
      },
      rules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '验证码是六位', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      this.$refs['ruleForm'].validate(valid => {
        if (valid) {
          // 校验成功  进行登录（发请求）
          this.$http
            .post('authorizations', this.loginform)
            .then(res => {
              this.$router.push('/')
            })
            .catch(() => {
              this.$message.error('手机号或验证码错误')
            })
        }
      })
    }
  }
}
</script>

<style lang='less'>
.container {
  width: 100%;
  height: 100%;
  background-color: aqua;
  position: absolute;
  left: 0;
  top: 0;
  background: url(../../assets/IMG_20190120_161209.jpg) no-repeat center / cover;
  .el-card {
    width: 400px;
    height: 370px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    opacity: 0.6;
    img {
      width: 200px;
      display: block;
      margin: 0 auto;
    }
  }
}
</style>
