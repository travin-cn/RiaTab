<template>
  <div class="pg-menu">
    <div class="top">
      <!-- 名称输入框 -->
      <input type="text" class="name" placeholder="名称" v-model="app.name" />
      <!-- 地址输入框 -->
      <input
        type="text"
        class="site"
        placeholder="网站地址"
        v-model="app.link"
      />
      <!-- 添加按钮 -->
      <div class="btn-add" @click="addapp">
        <img src="../assets/plus.png" style="width:20px" />
      </div>
    </div>

    <ul class="middle">
      <li v-for="item in pm.list" :key="item.id">
        <span>{{ item.name }}</span>
        <span>{{ item.link }}</span>

        <!-- 删除按钮 -->
        <div class="btn-delete" @click="removeapp(item.id)">
          <img src="../assets/trash.png" style="width:16px" />
        </div>
      </li>
    </ul>

    <!-- 底栏提示信息 -->
    <div class="bottom">
      <span>{{ tips }}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      app: {
        name: "",
        link: "",
      },
      pm: this.$pm,
      tips: "",
    };
  },
  methods: {
    // 添加搜索引擎
    addapp() {
      this.$pm.add(this.app);
      this.tips = `添加成功:一共有${this.$pm.list.length}条数据`;
    },

    // 删除搜索引擎
    removeapp(id) {
      this.$pm.remove(id);
      this.tips = `删除成功:一共有${this.$pm.list.length}条数据`;
    },
  },
  mounted() {
    this.tips = `一共有${this.$pm.list.length}条数据`;
  },
};
</script>

<style lang="less" scoped>
.pg-menu {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .top {
    height: 50px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    input {
      font-size: 12px;
      height: 28px;
      padding: 0 10px;
      color: black;
      background: none;
      outline: none;
      border: 1px solid #184e77;
      letter-spacing: normal;
      transition: all 0.2s;

      &:focus {
        background-color: white;
      }
    }
    .name {
      width: 50px;
    }
    .site {
      width: 120px;
    }
    .btn-add {
      height: 30px;
      width: 30px;
      background-color: #9d4edd;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.3s;
      &:hover {
        background-color: #012a4a;
      }
    }
  }

  .middle {
    flex: 1;
    overflow: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 16px 0;
    &::-webkit-scrollbar {
      width: 6px;
    }
    &::-webkit-scrollbar-thumb {
      /*滚动条里面小方块*/
      border-radius: 3px;
      background: #535353;
    }
    &::-webkit-scrollbar-track {
      /*滚动条里面轨道*/
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      border-radius: 5px;
    }

    li {
      width: 70%;
      height: 30px;
      flex: none;
      border-radius: 30px;
      display: flex;
      align-items: center;
      padding: 5px 20px;
      position: relative;
      overflow: hidden;
      margin-bottom: 10px;
      background: #ced4da;
      cursor: pointer;

      &:hover {
        background: #ced4da;
        box-shadow: 5px 5px 12px #5a5a5a, -5px -5px 12px #ffffff;
      }
      span {
        letter-spacing: normal;
        margin-right: 20px;
        color: #3d5a80;
        font-size: 12px;
        white-space: nowrap;
        text-overflow: ellipsis;
        &:nth-of-type(1) {
          font-weight: bold;
        }
      }

      .btn-delete {
        position: absolute;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background-color: #2b2d42;
        right: -30px;
        transition: all 0.4s;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      &:hover .btn-delete {
        right: 10px;
      }
    }
  }

  .bottom {
    height: 46px;
    border-radius: 5px;
    background-color: #495057;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      font-weight: bold;
      letter-spacing: 4px;
      cursor: context-menu;
    }
  }
}
</style>