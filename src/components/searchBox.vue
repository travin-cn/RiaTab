<template>
  <div class="search-box">
    <!-- 搜索引擎 -->
    <div class="engine-box">
      <!-- 选中的搜索引擎 -->
      <div class="selected">{{ em.selected.name }}</div>
      <!-- 搜素引擎列表 -->
      <ul class="engineList">
        <li
          v-for="item in em.list"
          :key="item.id"
          @click="selectEngine(item.id)"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>

    <!-- 搜索输入框 -->
    <div class="input-box">
      <!-- 输入框 -->
      <input type="text" v-model="keyword" @keydown.13.prevent="search" />
      <!-- 搜索图标 -->
      <a class="icon-box" :href="seLink" target="blank" ref="seBtn">
        <img src="../assets/circle.png" style="width:20px">
      </a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      em: this.$em,
      keyword: "",
    };
  },

  computed: {
    // 最终进行搜索的地址
    seLink() {
      return this.$em.selected.link + `${this.keyword}`;
    },
  },

  methods: {
    // 选中搜索引擎
    selectEngine(id) {
      this.$em.setSelected(id);
    },
    // 进入到目标地址
    search() {
      this.$refs.seBtn.click();
    },
  },
};
</script>

<style lang="less" scoped>
// 盒子
.search-box {
  // 宽高和布局
  position: absolute;
  // 确保下拉菜单不会被遮住
  z-index: 9;
  top: 200px;
  width: 520px;
  height: 50px;
  transition: all 0.3s;
  cursor: pointer;
  // 子项布局
  display: flex;
  border-radius: 25px;
  transition: all 0.3s;
  box-shadow: 0px 4px 10px rgba(17, 17, 26, 1),
    0px -1px 6px rgba(255, 255, 255, 1), 0px 16px 30px rgba(17, 17, 26, 0.1);

  .engine-box {
    width: 100px;
    position: relative;
    // 选中的样式
    .selected {
      border-radius: 25px 0 0 25px;
      width: 100%;
      height: 100%;
      color: #a1c181;
      background-color: #233d4d;
      // 文字居中
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: bold;
    }

    // #region 搜索引擎列表
    .engineList {
      position: absolute;
      right: 0;
      padding: 0;
      background-color: #233d4d;
      transition: all 0.3s;
      overflow: hidden;
      opacity: 0;

      li {
        height: 0;
        width: 76px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 12px;
        transition: all 0.3s;
        &:hover {
          background-color: #a1c181;
        }
      }
    }

    &:hover .engineList {
      padding: 12px 0;
      opacity: 1;
    }
    &:hover .engineList li {
      height: 30px;
    }
    // #endregion
  }

  // 输入框
  .input-box {
    height: 100%;
    flex: 1;
    border-radius: 0 25px 25px 0;
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    background-color: rgba(255, 255, 255, 0.3);
    overflow: hidden;
    position: relative;
    display: flex;
    align-items: center;
    input {
      width: 400px;
      padding-left: 20px;
      display: block;
      outline: none;
      background: none;
      border: none;
      height: 100%;
      font-weight: bold;
      transition: all 0.3s;
      color: #3d5a80;
      &:focus {
        background-color: #edf6f9;
      }
    }
  }

  // 搜索图标
  .input-box .icon-box {
    position: absolute;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    right: 16px;
    border-radius: 50%;
    background: #014f86;
    box-shadow: 2px 2px 5px #000814;
    transition: all 0.3s;
    &:hover {
      background-color: #97a97c;
      box-shadow: 2px 2px 3px #000814, -1px -1px 3px #97a97c;
    }
  }
}
</style>