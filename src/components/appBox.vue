<template>
  <div class="app-box" @mousewheel="turnPage($event, 640)">
    <!-- 以nav的左边距来控制翻页 -->
    <div ref="nav" class="nav"></div>

    <!-- 应用列表 -->
    <ul class="page-box" v-for="(page, index) in pm.pages" :key="index">
      <!-- 整体 -->
      <li
        class="app"
        v-for="app in page"
        :key="app.id"
        @contextmenu.prevent="toDelete"
        @click.stop="access(app.link)"
        :class="{ active: deleteMode }"
      >
        <!-- 文字 -->
        <span>{{ app.name }}</span>

        <!-- 删除按钮 -->
        <div class="btn-delete" @click.stop.prevent="removeApp(app.id)">
          <img src="../assets/close.png" style="width:16px">
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  data() {
    return {
      pm: this.$pm,
      deleteMode: false,
    };
  },

  methods: {
    // 翻页
    turnPage(e, width) {
      this.$refs.nav.style.marginLeft = this.$pm.turnPage(e, width);
    },

    // 删除应用
    removeApp(id) {
      this.$pm.remove(id);
    },

    //切换到删除模式
    toDelete() {
      this.deleteMode = true;
      $("body").click(() => {
        if (this.deleteMode) {
          this.deleteMode = false;
        }
      });
    },

    // 访问应用的链接
    access(link) {
      // 在非删除状态才可以访问
      if (!this.deleteMode) {
        window.open(link);
      }
    },
    updateLayout() {
      // grid布局
      $(".page-box").css(
        "gridTemplateColumns",
        `repeat(${this.$pm.layout.cols},1fr)`
      );
      $(".page-box").css(
        "gridTemplateRows",
        `repeat(${this.$pm.layout.rows},1fr)`
      );
    },
  },

  mounted() {
    this.updateLayout();
  },

  updated() {
    this.updateLayout();
  },
};
</script>

<style lang="less" scoped>
.app-box {
  position: absolute;
  width: 640px;
  height: 300px;
  top: 320px;
  display: flex;
  overflow: hidden;

  // 驱动翻页
  .nav {
    transition: all 0.3s;
  }

  // 页面
  .page-box {
    width: 100%;
    height: 100%;
    flex: none;
    box-sizing: border-box;
    display: grid;
    align-items: center;
    justify-items: center;
  }

  // 应用
  .app {
    // 宽高布局
    height: 50px;
    width: 50px;
    border-radius: 50%;
    background-color: #284b63;
    // 文字居中
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    transition: all 0.3s;
    cursor: pointer;
    border-radius: 50%;
    background: #fcfcfc;
    box-shadow: 10px 10px 20px #5a5a5a, -4px -4px 10px #ffffff;
    // app标题
    & span {
      font-size: 13px;
      font-weight: bold;
      color: #14213d;
    }
    &:hover {
      transform: scale(1.1);
    }

    &.active {
      animation: rotate 0.5s infinite ease;
      @keyframes rotate {
        0% {
          transform: rotateZ(0deg);
        }
        25% {
          transform: rotateZ(-10deg);
        }
        50% {
          transform: rotateZ(0deg);
        }
        75% {
          transform: rotateZ(10deg);
        }
        100% {
          transform: rotateZ(0deg);
        }
      }
    }
  }

  // 删除按钮
  .app .btn-delete {
    height: 18px;
    width: 18px;
    border-radius: 50%;
    background-color: #ef233c;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    right: 0;
    transition: all 0.2s;
    cursor: pointer;
    opacity: 0.8;
    display: none;
  }
  .app.active .btn-delete {
    display: flex;
    &:hover {
      transform: scale(1.3);
    }
  }
}
</style>