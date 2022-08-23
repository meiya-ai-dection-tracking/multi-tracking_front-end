<template>
  <div class="container">
    <div class="logo">
      <img src="../assets/meiyalogo.png" alt="">
    </div>
    <div class="title">
      <span>多目标检测与跟</span>踪
    </div>
    <div class="content">
      <p>基于YoloV7 Tiny + ByteTrack/StrongSORT的多目标检测和跟踪系统</p>
      <p>基于Vue + Flask开发的前后端交互系统</p>
    </div>
    <div class="button">
      <el-button type="info" round @click="startTracking">
        <span>点击进</span>入
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {}
  },
  methods: {
    startTracking () {
      this.$router.push({path: '/Tracking'})
    }
  }
}
</script>

<style scoped>
.container {
  background: url("../assets/home_page_bg.jpg") no-repeat center;
}

.logo {
  margin-left: 3%;
  padding-top: 3%;
  width: 8%;
}

.logo img {
  width: 100%;
}

.title {
  margin-top: 6%;
  font-size: 7vw;
  color: #cfcece;
}

.title span {
  letter-spacing: 2vw;
}

.content {
  margin-top: 3%;
  color: #c8c8c8;
  font-size: 1.5vw;
}

.button {
  margin-top: 8%;
}

.button span {
  letter-spacing: 0.8vw;
}

.button button {
  width: 20%;
  font-size: 1.1vw;
  line-height: 4vh;
  border: 1px solid white;
  border-radius: 8px;
  color: white;
  background: none;
}

.button button:hover {
  border: none;
  background-color: rgba(255, 255, 255, 0.3);
  color: #3b3939;
}
</style>
