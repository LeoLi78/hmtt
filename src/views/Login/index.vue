<template>
  <div>
    <van-nav-bar title="登录" @click-left="$router.back()">
      <template #left>
        <van-icon name="cross" />
      </template>
    </van-nav-bar>

    <van-form @submit="onSubmit" ref="form">
      <van-field
        v-model.trim="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="[
          { required: true, message: '请输入手机号' },
          { pattern: /^(?:(?:\+|00)86)?1\d{10}$/, message: '不符合手机的格式' },
        ]"
      >
        <template #left-icon>
          <i class="toutiao toutiao-shouji"></i>
        </template>
      </van-field>

      <van-field
        v-model.trim="code"
        type="password"
        name="code"
        placeholder="验证码"
        :rules="[
          { required: true, message: '请填写验证码' },
          { pattern: /^\d{6}$/, message: '不符合验证码的格式' },
        ]"
      >
        <!-- <template #left-icon>
          <i class="toutiao toutiao-yanzhengma"></i>
        </template> -->
        <MyIcon name="yanzhengma" slot="left-icon"></MyIcon>
        <template #button>
          <van-count-down
            v-if="isCountDownShow"
            :time="time"
            format="ss s"
            @finish="isCountDownShow = false"
          />
          <van-button
            size="small"
            round
            class="yzm"
            native-type="button"
            v-else
            @click="onSendSms"
            >发送验证码</van-button
          >
        </template>
      </van-field>

      <div style="margin: 16px">
        <van-button block native-type="submit" class="login-btn"
          >提交</van-button
        >
      </div>
    </van-form>
    <p class="tiaokuan">隐私条款</p>
  </div>
</template>

<script>
// import MyIcon from '@/components/MyIcon.vue'
import { getSmsCode, login } from '@/api/user'
export default {
  created () { },
  data () {
    return {
      mobile: '15879667447', // 手机号
      code: '246810', // 短信验证码
      time: 5 * 1000,
      isCountDownShow: false
    }
  },
  methods: {
    async onSubmit (values) {
      // console.log('submit', values)
      try {
        const res = await login(values)
        console.log(res)
        this.$store.commit('setUser', res.data.data)
        this.$router.push({ name: 'my' })
      } catch (err) {
        console.log(err)
      }
    },
    async onSendSms () {
      try {
        await this.$refs.form.validate('mobile')
        // console.log('检验成功')
        this.isCountDownShow = true
        try {
          await getSmsCode(this.mobile)
          this.$toast.success('发送成功')
        } catch (err) {
          this.$toast.fail('发送失败，请重试')
        }
      } catch (err) {
        console.log('校验失败')
        console.log(err)
        this.$toast.fail('手机号格式不正确')
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {
    // MyIcon
  }
}
</script>

<style scoped lang='less'>
.toutiao {
  font-size: 37px;
}
.yzm {
  width: 152px;
  height: 46px;
  line-height: 46px;
  background-color: #ededed;
  font-size: 22px;
  color: #666;
  .van-button__text {
    zoom: 0.95;
  }
}
.login-btn {
  width: 694px;
  height: 88px;
  background-color: #6db4fb;
  border-radius: 10px;
  font-size: 30px;
  color: #fff;
}
.van-count-down {
  position: fixed;
  right: 30px;
}
.yzm {
  position: fixed;
  right: 30px;
}
.tiaokuan {
  width: 100%o;
  height: 25px;
  font-family: MicrosoftYaHei;
  font-size: 25px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 36px;
  letter-spacing: 1px;
  color: #666666;
  text-align: center;
  position: fixed;
  bottom: 54px;
}
</style>
