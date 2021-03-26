<template>
  <div class="login-container">
    <van-nav-bar class="page-nav-bar" title="登录" />
    <van-form @submit="onSubmit" ref="loginForm">
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="userFormRules.mobile"
        type="number"
        maxlength="11"
      >
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field
        v-model="user.code"
        name="code"
        placeholder="请输入验证码"
        type="number"
        maxlength="6"
        :rules="userFormRules.code"
      >
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <template #button>
          <van-count-down
            v-if="isCountDownShow"
            :time="time"
            format="ss s"
            @finish="finish"
          />
          <van-button
            round
            size="small"
            type="default"
            class="send-sms-btn"
            @click="sendSms"
            native-type="button"
            v-else
          >
            发送验证码
          </van-button>
        </template>
      </van-field>
      <div style="margin: 16px;" class="login-btn-wrap">
        <van-button block type="info" native-type="submit" class="login-btn"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>
<script>
import { login, getCodeSms } from '@/api/user'
export default {
  name: 'loginIndex',
  components: {},
  data() {
    return {
      user: {
        mobile: '',
        code: ''
      },
      userFormRules: {
        mobile: [
          {
            required: true,
            message: '手机号不能为空！'
          },
          {
            patterns: /^1[3|5|7|8]\d{9}$/,
            message: '手机号格式错误!'
          }
        ],
        code: [
          {
            required: true,
            message: '验证码不能为空！'
          },
          {
            pattern: /^\d{6}$/,
            message: '验证码格式错误!'
          }
        ]
      },
      time: 60 * 1000,
      isCountDownShow: false
    }
  },
  created() {},
  computed: {},
  methods: {
    // 表单提交
    async onSubmit() {
      // 1.获取表单数据
      const user = this.user
      // 2.验证表单数据
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true, // 禁用背景点击
        duration: 0 // 展示时长(ms)，值为 0 时，toast 不会消失
      })
      // 3.提交表单请求登录
      try {
        const { data } = await login(user)
        // 4.根据响应结果处理后续操作
        this.$toast.success('登录成功')
        this.$store.commit('setToken', data.data)
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail('手机号或验证码错误')
        } else {
          this.$toast.fail('登录失败，请稍后重试')
        }
      }
    },
    // 发送验证码
    async sendSms() {
      try {
        // 1.验证手机号是否正确
        await this.$refs.loginForm.validate('mobile')
      } catch (err) {
        return console.log(err)
      }
      // 2.显示倒计时效果
      this.isCountDownShow = true
      // 3.请求发送验证码
      try {
        const res = await getCodeSms(this.user.mobile)
        console.log(res)
        this.$toast.success('发送验证码成功！')
      } catch (err) {
        this.isCountDownShow = false
        if (err.response.status === 404) {
          this.$toast.fail('手机号不正确！')
        } else if (err.response.status === 429) {
          this.$toast.fail('发送太频繁，请稍后重试！')
        } else {
          this.$toast.fail('发送验证失败，请稍后重试！')
        }
      }
    },
    // 倒计时结束
    finish() {
      this.isCountDownShow = false
    }
  },
  mounted() {}
}
</script>

<style lang="less" scoped>
.toutiao {
  font-size: 37px;
}
.send-sms-btn {
  // width: 152px;
  height: 46px;
  line-height: 46px;
  background-color: #ededed;
  font-size: 22px;
  color: #666;
}
.login-btn-wrap {
  padding: 53px 33px;
  .login-btn {
    background-color: #6db4fb;
    border: none;
  }
}
</style>
