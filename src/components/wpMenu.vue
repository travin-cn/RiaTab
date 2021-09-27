<template>
  <div class="wp-menu">
    <!-- 顶部上传框 -->
    <div class="top">
      <div class="upload-box" @click="upload">
        <input type="file" ref="inputFile" v-show="false" />
        <img src="../assets/image-add.png" />
        <h4>上传本地图片</h4>
        <img :src="imgSrc" ref="preview" class="preview" />
      </div>
    </div>
    <!-- 底部提交按钮 -->
    <div class="bottom">
      <div class="btn-submit" @click="submit">提交</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgSrc: "",
    };
  },
  methods: {
    upload() {
      let inputFile = this.$refs.inputFile;
      let preview = this.$refs.preview;
      inputFile.click();
      inputFile.onchange = () => {
        this.$wm.convertImg(inputFile.files[0]).then((res) => {
          preview.style.display = "block";
          this.imgSrc = res;
        });
      };
    },
    submit() {
      // 存储图片到本地,并且让管理器加载
      if (this.imgSrc) {
        this.$wm.save(this.imgSrc);
        this.$wm.load();
      }
    },
  },
  mounted() {
    // 隐藏未加载时的未显示图标
    this.$refs.preview.onerror = function () {
      this.style.display = "none";
    };
  },
};
</script>

<style lang="less" scoped>
.wp-menu {
  width: 100%;
  height: 100%;
  .top {
    height: 70%;
    display: flex;
    justify-content: center;
    align-items: center;
    .upload-box {
      width: 240px;
      height: 150px;
      overflow: hidden;
      // 子项布局
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      cursor: pointer;
      transition: all 0.3s;
      position: relative;
      // 拟态
      border-radius: 21px;
      background: #eee;
      box-shadow: 5px 5px 10px #bababa, -5px -5px 10px #ffffff;
      h4 {
        color: #457b9d;
        font-weight: bold;
      }

      &:hover {
        border-radius: 21px;
        background: #eee;
        box-shadow: 24px 24px 48px #949494, -24px -24px 48px #ffffff;
      }

      .preview {
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
  .bottom {
    height: 30%;
    display: flex;
    justify-content: center;
    align-items: center;

    .btn-submit {
      height: 32px;
      width: 80px;
      background: #ced4da;
      color: #023047;
      font-weight: bold;
      text-align: center;
      line-height: 32px;
      border-radius: 15px;
      cursor: pointer;
      transition: all 0.4s;
      box-shadow: 5px 5px 12px #d0d0d0, -5px -5px 12px #f0f0f0;

      &:hover {
        box-shadow: 5px 5px 12px #5a5a5a, -5px -5px 12px #ffffff;
      }
    }
  }
}
</style>