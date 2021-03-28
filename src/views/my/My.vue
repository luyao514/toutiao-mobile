<template>
  <div class="my-container">
    <!-- 已登录区域 -->
    <div v-if="user" class="header">
      <!-- 头像区域 -->
      <div class="base-info">
        <div class="left">
          <van-image :src="userInfo.photo" fit="cover" round class="avatar" />
          <span class="name">{{ userInfo.name }}</span>
        </div>
        <div class="right">
          <van-button type="info" round size="mini" plain hairline
            >编辑资料</van-button
          >
        </div>
      </div>
      <!-- 粉丝等区域 -->
      <div class="data-stats">
        <div class="data-item">
          <span class="count">{{ userInfo.art_count }}</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.follow_count }}</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.fans_count }}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.like_count }}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>
    <!-- 未登录区域 -->
    <div v-else class="header not-login">
      <div class="login-btn">
        <img class="mobile-img" src="~@/assets/mobile.png" />
        <span class="text" @click="$router.push('/login')">登录 / 注册</span>
      </div>
    </div>
    <!-- 共有区域 -->
    <!-- 宫格区域 -->
    <van-grid class="grid-nav mb9" :column-num="2" clickable>
      <van-grid-item class="grid-item">
        <template #default>
          <i class="toutiao toutiao-shoucang"></i>
          <span class="text">收藏</span>
        </template>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <template #default>
          <i class="toutiao toutiao-lishi"></i>
          <span class="text">历史</span>
        </template>
      </van-grid-item>
    </van-grid>
    <!-- 单元区域 -->
    <div class="cell">
      <van-cell title="消息通知" is-link />
      <van-cell title="小智同学" class="mb9" is-link />
      <van-cell
        v-if="user"
        center
        title="退出登录"
        clickable
        class="logout-cell"
        @click="logOut"
      />
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user.js'
export default {
  name: 'My',
  components: {},
  data() {
    return {
      userInfo: {}
    }
  },
  created() {
    // 用户登录了，则请求加载用户信息数据
    if (this.user) {
      this.getUserInfo()
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    logOut() {
      // 弹出确认框
      this.$dialog
        .confirm({
          title: '确认退出登录吗'
        })
        .then(() => {
          // 确认退出，清除vuex和localstorage中的token，巧妙利用mutations中的setToken方法同时请清除
          this.$store.commit('setToken', null)
          //   通知退出登录成功的消息
          this.$notify({ type: 'success', message: '退出登录成功' })
        })
        .catch(() => {
          // 通知取消退出登录的消息
          this.$notify({ type: 'primary', message: '取消' })
        })
    },
    async getUserInfo() {
      try {
        // 调用接口，获取用户数据
        const {
          data: { data }
        } = await getUserInfo()
        this.$toast('获取用户信息成功')
        this.userInfo = data
        console.log(data)
      } catch (err) {
        this.$toast('获取用户信息失败，请稍后重试')
      }
    }
  },
  mounted() {}
}
</script>

<style lang="less" scoped>
.header {
  position: relative;
  height: 361px;
  background: url('~@/assets/banner.png');
  background-size: cover;
}
.not-login {
  .login-btn {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .mobile-img {
      width: 132px;
      height: 132px;
      margin-bottom: 15px;
    }
    .text {
      font-size: 28px;
      color: #fff;
    }
  }
}
.base-info {
  height: 231px;
  //   background-color: pink;
  padding: 76px 32px 23px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  .left {
    display: flex;
    align-items: center;
    .avatar {
      width: 132px;
      height: 132px;
      margin-right: 23px;
      border: 4px solid #fff;
    }
    .name {
      color: #fff;
      font-size: 30px;
    }
  }
}
.data-stats {
  display: flex;
  //   background-color: #f00;
  .data-item {
    flex: 1;
    height: 130px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #fff;
    .count {
      font-size: 36px;
    }
    .text {
      font-size: 23px;
    }
  }
}
.grid-nav {
  .grid-item {
    height: 141px;
    i.toutiao {
      font-size: 45px;
    }
    .toutiao-shoucang {
      color: #eb5253;
    }
    .toutiao-lishi {
      color: #ff9d1d;
    }
    span.text {
      font-size: 28px;
    }
  }
}
.cell {
  .logout-cell {
    text-align: center;
    color: #d86262;
  }
}
.mb9 {
  margin-bottom: 9px;
}
</style>
