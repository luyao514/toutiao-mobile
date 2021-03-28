<template>
  <div class="layout-container">
    <!-- layout子路由占位符 -->
    <router-view></router-view>
    <!-- route属性，给tabbar开启路由模式，使用to属性即可实现路由跳转 -->
    <!-- 但是不开启路由模式，tabbar栏的切换，不会根据路径进行变化，这样并不友好，所以还是选择开启route -->
    <van-tabbar route class="layout-tabbar" active-color="#2980b9">
      <van-tabbar-item to="/">
        <template #icon>
          <i class="toutiao toutiao-shouye"></i>
        </template>
        <span>首页</span>
      </van-tabbar-item>
      <van-tabbar-item to="/questionAnswer">
        <template #icon>
          <i class="toutiao toutiao-wenda"></i>
        </template>
        <span>问答</span>
      </van-tabbar-item>
      <van-tabbar-item to="/video">
        <template #icon>
          <i class="toutiao toutiao-shipin"></i>
        </template>
        <span>视频</span>
      </van-tabbar-item>
      <van-tabbar-item to="/my">
        <template #icon>
          <i class="toutiao toutiao-wode"></i>
        </template>
        <span>{{ $store.state.user ? '我的' : '未登录' }}</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  name: 'LayoutIndex',
  components: {},
  data() {
    return {}
  },
  created() {},
  computed: {},
  methods: {},
  mounted() {}
}
</script>

<style lang="less" scoped>
.layout-container {
  .layout-tabbar {
    i.toutiao {
      font-size: 40px;
    }
    span {
      font-size: 20px;
    }
  }
}
</style>
