<template>
  <div class="wp-box">
    <!-- 壁纸 -->
    <img :src="wm.imgUri" />
    <!-- 遮罩 -->
    <div class="mask"></div>
  </div>
</template>

<script>
export default {
  beforeCreate() {
    // 图片要么为本地存储图片,如果本地没有就加载默认图片
    this.$wm.imgUri = this.$wm.imgUri || require("../assets/wallpaper.jpg");
  },
  data() {
    return {
      // 不能响应this.$wm.imgUri
      // 因为图片变化了,指针imgUri地址不变,只不过指向了不同堆空间,所以无法响应其变化
      wm: this.$wm,
    };
  },
};
</script>

<style lang="less" scoped>
// 盒子宽高和布局
.wp-box {
  position: fixed;
  width: 100vw;
  height: 100vh;

  // 壁纸
  img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  // 遮罩
  .mask {
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: radial-gradient(
        rgba(0, 0, 0, 0) 0,
        rgba(0, 0, 0, 0.1) 100%
      ),
      radial-gradient(rgba(0, 0, 0, 0) 33%, rgba(0, 0, 0, 1) 166%);
  }
}
</style>