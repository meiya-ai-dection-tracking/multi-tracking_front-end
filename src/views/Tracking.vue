<template>
  <div class="container">
    <div class="logo">
      <img src="../assets/meiyalogo.png" alt=""/>
    </div>
    <div class="title">
      <span>请选择您想要检测的类</span>型
    </div>
    <div class="content">
      <el-button class="button" type="info" round @click="trackByImg">
        <div class="btn-icon">
          <i class="el-icon-camera"></i>
        </div>
        <div class="btn-title">
          <span>图像检</span>测
        </div>
        <div class="btn-content">
          <p>可上传本地文件中的图像进行检测</p>
          <p>支持jpg, png, jpeg等图像格式</p>
        </div>
      </el-button>
      <el-button class="button" type="info" round @click="trackByVideo">
        <div class="btn-icon">
          <i class="el-icon-video-camera"></i>
        </div>
        <div class="btn-title">
          <span>视频跟</span>踪
        </div>
        <div class="btn-content">
          <p>可上传本地文件中的视频进行跟踪</p>
          <p>支持mp4, mov等视频格式</p>
        </div>
      </el-button>
      <el-button class="button" type="info" round @click="realtimeTrack">
        <div class="btn-icon">
          <i class="el-icon-odometer"></i>
        </div>
        <div class="btn-title">
          <span>实时跟</span>踪
        </div>
        <div class="btn-content">
          <p>通过设备的摄像头进行实时跟踪</p>
          <p>目前仅支持单类别检测</p>
        </div>
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tracking',
  data () {
    return {}
  },
  methods: {
    // 图片检测
    trackByImg () {
      this.$router.push({path: '/TrackByImg'})
    },
    // 视频检测
    trackByVideo () {
      this.$router.push({path: '/TrackByVideo'})
    },
    // 实时检测
    realtimeTrack () {
      this.$router.push({path: '/RealtimeTracking'})
    }
  }
}
</script>

<style scoped>
.container {
  background: url("../assets/tracking_page_bg.jpg") no-repeat center;
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
  margin-top: 1%;
  font-size: 3vw;
  color: #cfcece;
}

.title span {
  letter-spacing: 1vw;
}

.content {
  margin-top: 3%;
}

.content button {
  position: relative;
  width: 20%;
  margin: 5% 1%;
  height: 40vh;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.55);
  transition: all 0.4s;
  text-align: center;
}

.content button:hover {
  width: 25%;
  height: 50vh;
  margin: 0 1%;
  transition: all 0.4s;
}

.content .btn-icon {
  width: 100%;
  position: absolute;
  top: 15%;
  left: 0;
  height: 10%;
  font-size: 4.5vh;
}

.content .btn-title {
  width: 100%;
  position: absolute;
  top: 40%;
  left: 0;
  height: 15%;
  font-size: 3.5vh;
}

.content .btn-title span {
  letter-spacing: .5vw;
}

.content .btn-content {
  width: 100%;
  position: absolute;
  top: 55%;
  left: 0;
  font-size: 2vh;
}

.content .btn-content p{
  margin-top: 5%;
}
</style>
