<template>
  <div class="home-container">
    <van-nav-bar class="page-nav-bar">
      <template #title>
        <van-button
          type="info"
          size="small"
          icon="search"
          class="search-btn"
          round
          >搜索</van-button
        >
      </template>
    </van-nav-bar>
    <van-tabs
      v-model="active"
      animated
      swipeable
      scrollspy
      color="#3498db"
      title-active-color="#333"
      title-inactive-color="#777"
      class="tab-channels"
    >
      <van-tab title="标签 1">内容 1</van-tab>
      <van-tab title="标签 2">内容 2</van-tab>
      <van-tab title="标签 3">内容 3</van-tab>
      <van-tab title="标签 4">内容 4</van-tab>
      <van-tab title="标签 5">内容 5</van-tab>
    </van-tabs>
  </div>
</template>
<script>
export default {
  name: 'Home',
  components: {},
  data() {
    return {
      active: 0
    }
  },
  created() {},
  computed: {},
  methods: {},
  mounted() {}
}
</script>

<style lang="less" scoped>
.home-container {
  .page-nav-bar {
    .search-btn {
      width: 555px;
      height: 64px;
      background-color: #5babfb;
      border: none;
      font-size: 28px;
      .van-icon {
        font-size: 32px;
      }
    }
    /deep/.van-nav-bar__title {
      max-width: unset;
    }
  }
  /deep/.tab-channels {
    .van-tabs__wrap {
      height: 82px;
    }
    .van-tab {
      border-right: 1px solid #edeff3;
      min-width: 200px;
    }
    .van-tabs__nav {
      padding-bottom: 0;
    }

    .van-tabs__line {
      bottom: 8px;
      width: 31px !important;
      height: 6px;
    }
  }
}
</style>
