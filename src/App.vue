<template>
  <div id="app">
    <!-- 壁纸 -->
    <wallpaper />

    <!-- 设置菜单 -->
    <transition>
      <Menu @closeMenu="closeMenu" v-if="isOpen"></Menu>
    </transition>

    <!-- 打开设置菜单按钮 -->
    <div class="btn-menu" @click="openMenu">
      <img src="./assets/cog.png">
    </div>

    <!-- 搜索框 -->
    <search-box></search-box>

    <!-- 应用面板 -->
    <app-box></app-box>
  </div>
</template>


<script>
// 导入组件
import Menu from "./components/menu.vue";
import Wallpaper from "./components/wallpaper.vue";
import SearchBox from "./components/searchBox.vue";
import AppBox from "./components/appBox.vue";

export default {
  components: {
    Menu,
    Wallpaper,
    SearchBox,
    AppBox,
  },

  data() {
    return {
      // 在v-if中控制设置菜单的显隐
      isOpen: false,
    };
  },

  beforeCreate() {
    // 在渲染之前先创建号管理器
    // 壁纸管理器
    this.createWM("wallpaper");
    // 搜索引擎管理器
    this.createEM("engines");
    // 页面应用管理器
    this.createPM("apps", 5, 3);
  },

  methods: {
    //#region 设置菜单的打开与关闭
    // 关闭设置菜单
    closeMenu() {
      this.isOpen = false;
      this.$router.replace("/");
    },
    // 打开设置菜单
    openMenu() {
      this.isOpen = true;
      this.$router.replace("/wpMenu");
    },
    //#endregion
  },
};
</script>


<style lang="less">
// 统一初始化样式
@import url("./init.css");

// 子项布局
#app {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}

// 菜单按钮
.btn-menu {
  // 宽高与位置
  position: absolute;
  width: 30px;
  height: 30px;
  right: 50px;
  top: 50px;
  cursor: pointer;
  border-radius: 50%;
  transition: all 0.3s;
  // 图标居中
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    transform: scale(1.2);
  }
}

// #region 菜单显隐过渡动画
.v-enter-active,
.v-leave-active {
  transition: all 0.3s;
}

.v-enter,
.v-leave-to {
  opacity: 0;
}

.v-enter-to,
.v-leave {
  opacity: 1;
}
// #endregion
</style>
