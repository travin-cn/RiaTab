<template>
  <div class="menu-box">
    <div class="nav">
      <ul class="nav-btn">
        <!-- 壁纸页 -->
        <li class="active" id="wp">
          <img src="../assets/image.png" style="width: 16px" />
          <h4>壁纸</h4>
        </li>

        <!-- 搜索引擎页 -->
        <li id="se">
          <img src="../assets/chrome.png" style="width: 16px" />
          <h4>搜索</h4>
        </li>

        <!-- 应用页 -->
        <li id="pg">
          <img src="../assets/app.png" style="width: 16px" />
          <h4>应用</h4>
        </li>
      </ul>
    </div>

    <!-- 内容区 -->
    <div class="content">
      <router-view></router-view>
    </div>

    <!-- 关闭按钮 -->
    <div class="btn-close" @click="closeMenu">
      <img src="../assets/close.png" />
    </div>

    <!-- 全屏遮罩 -->
    <div class="mask"></div>
  </div>
</template>

<script>
import $ from "jquery";

export default {
  methods: {
    // 关闭设置菜单
    closeMenu() {
      this.$emit("closeMenu");
    },
    // 切换路由
    switchRouter(selector, router) {
      $(selector).click(() => {
        if (this.$route.path !== router) {
          this.$router.replace(router);
        }
      });
    },
  },
  mounted() {
    // #region 路由操作
    // 鼠标点击导航按钮的样式切换
    $(".nav-btn li").click(function () {
      $(".nav-btn li").removeClass("active");
      $(this).addClass("active");
    });

    //切换路由
    this.switchRouter(".nav-btn li#wp", "/wpMenu");
    this.switchRouter(".nav-btn li#se", "/seMenu");
    this.switchRouter(".nav-btn li#pg", "/pgMenu");
  },
  //#endregion
};
</script>

<style lang="less" scoped>
// 整个盒子的布局
.menu-box {
  position: relative;
  width: 320px;
  height: 400px;
  z-index: 999;

  // 顶部
  .nav {
    width: 100%;
    height: 40px;
    padding: 5px 0;
    border-radius: 10px 10px 0 0;
    background-color: #1e6091;
    box-shadow: 0px 5px 12px rgba(17, 17, 26, 1);

    // 顶部导航布局
    .nav-btn {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;

      // 顶部导航按钮
      li {
        margin: 0 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: relative;
        transition: all 0.3s;
        // 选中样式
        &:hover,
        &.active {
          transform: scale(1.1);
          h4 {
            color: #ffb703;
            font-weight: bold;
          }
        }
      }
    }
  }

  // 根据路由显示不同内容
  .content {
    height: calc(100% - 40px);
    border-radius: 0 0 10px 10px;
    padding: 10px;
    background-color: #f5f3f4;
    z-index: -1;
  }

  .btn-close {
    width: 30px;
    height: 30px;
    position: absolute;
    background-color: #212121;
    border-radius: 50%;

    // 图标剧中
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    right: -50px;
    top: 15px;
    transition: all 0.3s;
    &:hover {
      transform: scale(1.2);
    }
  }
  // 全屏遮罩
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(3px);
    z-index: -99;
  }
}
</style>