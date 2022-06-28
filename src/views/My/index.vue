<template>
  <div>
    <!-- 登录 -->
    <div class="header header-login" v-if="user && user.token">
      <!-- 头像 -->
      <div class="avatar">
        <div class="left">
          <van-image
            round
            width="1.76rem"
            height="1.76rem"
            src="https://img01.yzcdn.cn/vant/cat.jpeg"
          />
          <span>{{ userInfo.name }}</span>
        </div>
        <div class="button">编辑资料</div>
      </div>
      <ul class="list">
        <li>
          <p>{{ userInfo.art_count }}</p>
          <p>头条</p>
        </li>
        <li>
          <p>{{userInfo.fans_count }}</p>
          <p>关注</p>
        </li>
        <li>
          <p>{{ userInfo.follow_count }}</p>
          <p>粉丝</p>
        </li>
        <li>
          <p>{{ userInfo.like_count }}</p>
          <p>获赞</p>
        </li>
      </ul>
    </div>
    <!-- 未登录 -->
    <div class="header header-nologin" v-else>
      <div class="inner" @click="$router.push('/login')">
        <img src="@/assets/mobile.png" alt="" />
        <p><span>登录</span> / <span>注册</span></p>
      </div>
    </div>

    <!-- 收藏、历史 -->
    <van-grid :column-num="2">
      <van-grid-item icon="photo-o" text="收藏">
        <template #icon>
          <i claSS="toutiao toutiao-shoucang"></i>
        </template>
      </van-grid-item>
      <van-grid-item icon="photo-o" text="历史">
        <template #icon>
          <i claSS="toutiao toutiao-lishi"></i>
        </template>
      </van-grid-item>
    </van-grid>
    <!--  -->
    <van-cell-group>
      <van-cell title="消息通知" is-link />
      <van-cell title="小智同学" is-link />
    </van-cell-group>

    <van-button
      type="default"
      block
      class="logout"
      v-if="user && user.token"
      @click="logout"
    >
      退出登录</van-button
    >
  </div>
</template>

<script>
import { getUserInfo } from '@/api/user'
import { mapState } from 'vuex'
export default {
  async created () {
    if (this.user && this.user.token) {
      try {
        const res = await getUserInfo()
        console.log(res)
        this.userInfo = res.data.data
      } catch (err) {
        console.log(err)
      }
    }
  },
  data () {
    return {
      userInfo: {}
    }
  },
  methods: {
    async logout () {
      try {
        await this.$dialog.confirm({ message: 'Are you sure to logout' })
        this.$store.commit('setUser', {})
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.header {
  width: 750px;
  height: 401px;
  opacity: 0.7;
  background: rgb(50, 150, 250, 0.7) url("@/assets/banner.png");
  background-size: cover;
}
.header-nologin {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  vertical-align: middle;
  img {
    width: 132px;
    height: 132px;
  }
  P {
    font-size: 28px;
    font-weight: normal;
    letter-spacing: 1px;
    color: #ffffff;
    padding: 0;
    margin: 0;
  }
}
.header-login {
  padding-top: 116px;
  .avatar {
    margin-bottom: 55px;
    padding-left: 32px;
    padding-right: 33px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .button {
      width: 116px;
      height: 33px;
      background-color: #ffffff;
      border-radius: 16px;
      line-height: 32px;
      text-align: center;
      font-size: 20px;
      font-weight: 400;
      color: #666666;
    }
    .left {
      display: flex;
      align-items: center;
      span {
        margin-left: 22px;
        height: 29px;
        font-size: 30px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 1px;
        color: #ffffff;
      }
    }
  }
  .list {
    display: flex;
    li {
      flex: 1;
      text-align: center;
      p {
        color: #ffffff;
        font-weight: 400;
        &:nth-child(1) {
          font-size: 36px;
        }
        &:nth-child(2) {
          font-size: 23px;
        }
      }
    }
  }
}
.toutiao {
  font-size: 45px;
}
.van-grid-item {
  &:nth-child(1) {
    color: #eb5253;
  }
  &:nth-child(2) {
    color: #ff9d1d;
  }
}
/deep/.van-grid-item__text {
  font-size: 28px;
}
.van-cell-group {
  margin: 9px 0;
}
.logout {
  color: #eb5253;
  height: 100px;
}
</style>
