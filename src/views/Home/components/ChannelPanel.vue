<template>
  <div>
    <div class="channel-container">
      <div class="title">
        <h3>我的频道</h3>
        <van-button
          plain
          type="danger"
          round
          size="small"
          @click="del = !del"
          >{{ del ? "完成" : "编辑" }}</van-button
        >
      </div>
      <van-row>
        <van-col span="6" v-for="(item, index) in channels" :key="item.id">
          <div
            class="inner"
            :style="{ color: active === index ? 'red' : '' }"
            @click="onClick(index)"
          >
            {{ item.name }}
            <van-icon name="close" v-if="index !== 0 && del" />
          </div>
        </van-col>
      </van-row>
    </div>
    <div class="channel-container">
      <div class="title">
        <h3>推荐频道</h3>
      </div>
      <van-row>
        <van-col span="6" v-for="item in recommendChannels" :key="item.id">
          <div class="inner van-ellipsis" @click="addChannel(item.id)">
            {{ "+" + item.name }}
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import { getAllArticleList, saveChannels } from '@/api/home'
import { setItem } from '@/utils/storage'
const CHANNELS = 'CHANNELS'
export default {
  name: 'ChannelPanel',
  props: {
    channels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      require: true
    }
  },
  created () {
    this.getAllArticleList()
  },
  data () {
    return {
      del: false,
      recommendChannels: []
    }
  },
  methods: {
    async getAllArticleList () {
      try {
        const res = await getAllArticleList()
        console.log(res)
        this.recommendChannels = res.data.data.channels.filter(item => this.channels.every(item1 => item1.id !== item.id))
      } catch (err) {
        console.log(err)
      }
    },
    addChannel (id) {
      const index = this.recommendChannels.findIndex(item => item.id === id)
      this.channels.push(this.recommendChannels[index])
      this.recommendChannels.splice(index, 1)
    },
    onClick (index) {
      if (this.del) {
        if (index === 0) return // 推荐不能删除
        // 点击删除
        this.recommendChannels.push(this.channels[index])
        this.channels.splice(index, 1)
        if (index < this.active) {
          this.$emit('del-event', this.active - 1)
        }
      } else {
        this.$emit('change-active', index)
      }
    }
  },
  computed: {},
  watch: {
    channels: {
      async handler (newV) {
        if (this.$store.state.user && this.$store.state.user.token) {
          console.log(1)
          const arr = []
          newV.forEach((item, index) => {
            arr.push({ id: item.id, seq: index })
          })
          console.log(arr)
          try {
            const res = await saveChannels(arr)
            console.log(res)
          } catch (err) {
            console.log(err)
          }
        } else {
          setItem(CHANNELS, newV)
        }
      },
      deep: true // 深度监听
    }
  },
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.channel-container {
  margin-left: 20px;
  // padding-right: 20px;
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 48px;
    margin-top: 20px;
    padding-right: 20px;
    h3 {
      font-size: 32px;
      font-weight: 400;
      color: #333;
    }
    .van-button {
      width: 104;
      height: 48px;
      border-radius: 20px;
    }
  }
  .inner {
    width: 160px;
    height: 86px;
    background-color: #f4f5f6;
    border-radius: 6px;
    font-size: 28px;
    font-weight: 400;
    line-height: 86px;
    color: #222222;
    text-align: center;
    margin-bottom: 29px;
    position: relative;
    .van-icon-close {
      position: absolute;
      right: 0;
      top: 0;
      transform: translate(35%, -35%);
      color: red;
    }
  }
}
</style>
