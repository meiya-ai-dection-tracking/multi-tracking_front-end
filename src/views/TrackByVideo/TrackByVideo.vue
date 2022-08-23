<template>
  <div class="container">
    <Menu></Menu>
    <div class="title">
      <span>视频跟</span>踪
    </div>
    <div class="content">
      <div class="before-tracking" v-if="!isTracking">
        <div class="content-left">
          <div class="before-upload" v-if="!isUpload">
            <el-upload
              action="#"
              drag
              class="uploader"
              list-type="picture"
              :auto-upload="false"
              :show-file-list="false"
              :on-change="imgPreview">
              <div class="uploader-icon">
                <i class="el-icon-upload2"></i>
              </div>
              <div class="uploader-text">请将视频拖到此处或点击上传</div>
            </el-upload>
          </div>
          <div class="after-upload" v-else>
            <video :src="beforeTrackImgUrl" controls="controls" class="upload-img"/>
          </div>
        </div>
        <div class="content-right">
          <el-steps :active="active" align-center class="steps">
            <el-step title="上传跟踪视频"></el-step>
            <el-step title="选择跟踪类型"></el-step>
            <el-step title="选择跟踪模型"></el-step>
            <el-step title="开始跟踪"></el-step>
          </el-steps>
          <el-card v-if="active === 1" shadow="always" class="card">
            <div slot="header" class="clearfix">
              <span><b>上传跟踪视频</b></span>
            </div>
            <div v-if="!isUpload" class="step1_before_upload">
              <div class="loading-icon">
                <i class="el-icon-loading"></i>
              </div>
              <p>未检测到视频上传，请先在 <b>左侧拖拽框</b> 中上传视频</p>
            </div>
            <div v-else class="step1_after_upload">
              <el-button class="del-icon" @click="del">
                <i class="el-icon-delete"></i>
              </el-button>
              <div class="img-info-item">
                {{ '文件名: ' + this.beforeTrackImg.name }}
              </div>
              <div class="img-info-item">
                {{ '类型: ' + this.beforeTrackImg.raw.type }}
              </div>
              <div class="img-info-item">
                {{ '状态: ' + this.beforeTrackImg.status }}
              </div>
              <div class="img-info-step1_2">
                请确认跟踪视频信息无误后，点击 <b>下一步</b> 继续操作
              </div>
              <el-button type="primary" round class="img-button" @click="active++">下一步</el-button>
            </div>
          </el-card>
          <el-card v-if="active === 2" shadow="always" class="card">
            <div slot="header" class="clearfix">
              <span>选择跟踪类型</span>
            </div>
            <el-button class="del-icon" @click="del">
              <i class="el-icon-delete"></i>
            </el-button>
            <el-form class="type-form">
              <el-form-item label="跟踪类型:">
                <el-select v-model="chosenType"
                           placeholder="请选择需要跟踪的类型"
                           multiple
                           :multiple-limit="3">
                  <el-option-group
                    v-for="group in trackTypeList"
                    :key="group.label"
                    :label="group.label">
                    <el-option
                      v-for="item in group.options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-option-group>
                </el-select>
                <p>* 请至少选择一种跟踪类型，最多选择三种跟踪类型</p>
              </el-form-item>
            </el-form>
            <div class="img-tip-step2">
              请选择跟踪类型后，点击 <b>下一步</b> 继续操作
            </div>
            <el-button type="primary" round class="img-button" @click="active--">上一步</el-button>
            <el-button type="primary" round class="img-button" @click="step2Next">下一步</el-button>
          </el-card>
          <el-card v-if="active === 3" shadow="always" class="card">
            <div slot="header" class="clearfix">
              <span>选择跟踪模型</span>
            </div>
            <el-button class="del-icon" @click="del">
              <i class="el-icon-delete"></i>
            </el-button>
            <el-form class="type-form">
              <el-form-item label="跟踪模型:">
                <el-radio-group v-model="trackModel">
                  <el-radio-button :label="0">StrongSORT</el-radio-button>
                  <el-radio-button :label="1">ByteTrack</el-radio-button>
                </el-radio-group>
                <p>* 目前仅支持StrongSORT与ByteTrack两种模型的跟踪</p>
              </el-form-item>
            </el-form>
            <div class="img-tip-step2">
              请选择跟踪模型后，点击 <b>下一步</b> 继续操作
            </div>
            <el-button type="primary" round class="img-button" @click="active--">上一步</el-button>
            <el-button type="primary" round class="img-button" @click="step2Next">下一步</el-button>
          </el-card>
          <el-card v-if="active === 4" shadow="always" class="card">
            <div slot="header" class="clearfix">
              <span>开始跟踪</span>
            </div>
            <el-button class="del-icon" @click="del">
              <i class="el-icon-delete"></i>
            </el-button>
            <div class="step3">
              <div class="img-info-item">
                {{ '文件名: ' + this.beforeTrackImg.name }}
              </div>
              <div class="img-info-item">
                {{ '类型: ' + this.beforeTrackImg.raw.type }}
              </div>
              <div class="img-info-item">
                {{ '跟踪模型: ' + (this.trackModel === 0 ? 'StrongSORT' : 'ByteTrack') }}
              </div>
              <div class="img-info-item">
                {{ '跟踪类型: ' + this.chosenType }}
              </div>
            </div>
            <div class="img-info-step3">
              请确认跟踪视频信息无误后，点击 <b>开始跟踪</b> 进行跟踪
            </div>
            <el-button type="primary" round class="img-button" @click="active--">上一步</el-button>
            <el-button type="primary" round class="img-button" @click="uploadImg">开始跟踪</el-button>
          </el-card>
        </div>
      </div>
      <div class="after-tracking" v-else>
        <div class="content-left">
          <div class="before-success-tracking" v-if="!successTrack">
            <i class="el-icon-loading" v-if="trackStatue === 1"></i>
            <i class="el-icon-picture-outline" v-if="trackStatue === 2"></i>
          </div>
          <div class="after-success-tracking" v-else>
            <video :src="afterTrackImgUrl" controls="controls" class="upload-img"/>
          </div>
        </div>
        <div class="content-right">
          <el-card shadow="always" class="card">
            <div slot="header" class="clearfix">
              <el-tag class="tag" v-if="trackStatue === 0" type="success">跟踪成功</el-tag>
              <el-tag class="tag" v-if="trackStatue === 1">跟踪中</el-tag>
              <el-tag class="tag" v-if="trackStatue === 2" type="danger">跟踪失败</el-tag>
            </div>
            <div class="before-success-tracking" v-if="!successTrack">
              <div class="tracking" v-if="trackStatue === 1">
                <div>
                  <el-progress class="progress" type="circle" :percentage="trackingPercentage"/>
                </div>
                <el-button type="primary" round class="cancel-btn" @click="cancelTrack">取消跟踪</el-button>
              </div>
              <div class="track-error" v-if="trackStatue === 2">
                <div>
                  <el-progress class="progress" type="circle" :percentage="trackingPercentage" status="exception"/>
                </div>
                <el-button type="primary" round class="cancel-btn" @click="tryAgain">重新跟踪</el-button>
              </div>
            </div>
            <div class="after-success-tracking" v-else>
              <div class="img-info-item">
                {{ '文件名: ' + this.afterTrackImg.name }}
              </div>
              <div class="img-info-item">
                {{ '类型: ' + this.afterTrackImg.type }}
              </div>
              <div class="img-info-item">
                {{ '文件大小: ' + this.trackFileSize }}
              </div>
              <div class="img-info-item">
                {{ '跟踪类型: ' + this.chosenType }}
              </div>
              <el-button type="primary" round class="img-info-finish" @click="retrain">重新跟踪</el-button>
              <el-button type="primary" round class="img-info-finish" @click="downloadImg">下载视频</el-button>
            </div>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Menu from '../../components/Menu'
import {trackByVideo} from '../../api/api'
import {trackTypeList} from '../../static/js/trackTypeList'

export default {
  name: 'TrackByImg',
  components: {
    Menu
  },
  data () {
    return {
      active: 1,
      isUpload: false, // false
      beforeTrackImg: '', // 上传图片File
      afterTrackImg: '', // 跟踪结果图片File
      beforeTrackImgUrl: '', // 上传图片url
      afterTrackImgUrl: '', // 跟踪结果图片url
      isTracking: false, // 是否开始跟踪
      successTrack: false, // false
      trackStatue: 1, // 跟踪状态（0：成功，1：跟踪中，2：失败）
      chosenType: [], // 跟踪类型
      trackTypeList: trackTypeList,
      trackFileSize: '',
      trackModel: 0, // 跟踪模型（0：StrongSORT，1：ByteTrack）
      // personList: [], //轨迹追踪所需参数
      trackingPercentage: 0, // 跟踪进度
      stopProgress: false // 终止进度条
    }
  },
  methods: {
    // 图片缩略图
    imgPreview (file) {
      console.log(file)
      if (file.raw.type.split('/')[0] === 'video') {
        this.beforeTrackImg = file
        this.beforeTrackImgUrl = URL.createObjectURL(file.raw)
        this.isUpload = true
      } else {
        this.$message({
          type: 'warning',
          message: '请上传正确的视频格式'
        })
      }
    },
    // 删除图片
    del () {
      this.$confirm('此操作将删除该视频, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.beforeTrackImgUrl = ''
        this.isUpload = false
        this.active = 1
        this.$message({
          type: 'success',
          message: '删除成功'
        })
      })
    },
    // 上传图片
    uploadImg () {
      this.isTracking = true
      this.trackStatue = 1
      this.trackingPercentage = 0
      if (this.beforeTrackImgUrl === '') {
        this.$message.error('请先上传视频或检查视频是否上传成功')
        return
      }
      let formData = new FormData()
      // let fileType = this.beforeTrackImg.raw.type.split('/')[0]
      let suffix = this.beforeTrackImg.raw.name.split('.')
      formData.append('file', this.beforeTrackImg.raw)
      formData.append('trackType', this.chosenType)
      formData.append('model', this.trackModel)
      formData.append('suffix', suffix[suffix.length - 1])
      console.log('开始跟踪')
      if (this.trackModel === 0) {
        this.refreshProgress(Math.round((this.beforeTrackImg.raw.size / 133904) * 10))
      } else if (this.trackModel === 1) {
        this.refreshProgress(Math.round(this.beforeTrackImg.raw.size / 340000) * 10)
      }
      // this.refreshProgress(1000)
      trackByVideo(formData).then(res => {
        this.trackingPercentage = 100
        console.log(res)
        this.afterTrackImgUrl = window.URL.createObjectURL(res.data)
        this.afterTrackImg = new File([res.data], 'result', {type: res.data.type})
        this.trackFileSize = this.convertFileSize(this.afterTrackImg.size)
        console.log(this.afterTrackImg)
        this.successTrack = true
        this.trackStatue = 0
        this.$message({
          message: '跟踪成功',
          type: 'success'
        })
      }).catch(err => {
        this.trackStatue = 2
        this.stopProgress = true
        this.$message.error(err)
      })
    },
    // 下载图片
    downloadImg () {
      let a = document.createElement('a')
      a.setAttribute('href', this.afterTrackImgUrl)
      a.setAttribute('download', 'result')
      a.click()
    },
    // 重新跟踪
    retrain () {
      this.$confirm('重新跟踪将清空本次跟踪结果, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.isUpload = false
        this.isTracking = false
        this.successTrack = false
        this.beforeTrackImgUrl = ''
        this.afterTrackImgUrl = ''
        this.active = 1
        this.$message({
          type: 'success',
          message: '操作成功'
        })
      })
    },
    // 再试一次
    tryAgain () {
      this.isTracking = false
      this.successTrack = false
      this.active = 4
    },
    // 文件大小类型换算
    convertFileSize (size) {
      if (size / 1024 > 1) {
        size /= 1024
        if (size / 1024 > 1) {
          size /= 1024
          if (size / 1024 > 1) {
            size /= 1024
            return size.toFixed(2) + ' GB'
          }
          return size.toFixed(2) + ' MB'
        }
        return size.toFixed(2) + ' KB'
      }
      return size.toFixed(2) + ' B'
    },
    // 判断跟踪类型是否为空
    step2Next () {
      if (this.chosenType.length === 0) {
        this.$message({
          message: '请至少选择一个跟踪对象',
          type: 'warning'
        })
      } else {
        this.active++
      }
    },
    // 进度条更新
    refreshProgress (timeout) {
      let interval = setInterval(() => {
        this.trackingPercentage++
        if (this.trackingPercentage >= 99 || this.stopProgress) {
          this.stopProgress = false
          clearInterval(interval)
        }
      }, timeout)
    },
    // 取消跟踪
    cancelTrack () {
      this.$confirm('确认取消跟踪?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$socket.emit('cancelTrack', true)
        this.isTracking = false
        this.active = 4
      })
    }
  }
}
</script>

<style scoped>
.container {
  background: url("../../assets/track_video_bg.jpg") no-repeat center;
}

.title {
  font-size: 3vw;
  color: #cfcece;
}

.title span {
  letter-spacing: 1vw;
}

.content {
  margin: 1.5% auto;
  width: 85vw;
  background-color: rgba(255, 255, 255, .7);
  border-radius: 25px;
  padding: 2.5%;
}

.before-tracking, .after-tracking {
  display: flex;
}

.content-left {
  width: 45.3vw;
  height: 60vh;
  border-radius: 25px;
  background-color: rgba(62, 61, 61, 0.2);
}

.content-right {
  margin-left: 2%;
  width: 48.2vw;
  position: relative;
}

.uploader >>> .el-upload-dragger {
  width: 45.3vw;
  height: 60vh;
  border-radius: 25px;
  border: none;
  background-color: rgba(255, 255, 255, 0);
}

.uploader .uploader-icon {
  margin-top: 18%;
  font-size: 15vh;
  color: #181818;
  transition: all .8s;
}

.uploader:hover .uploader-icon {
  font-size: 20vh;
  transition: all .8s;
}

.uploader .uploader-text {
  margin-top: 4%;
  font-size: 4vh;
  color: #181818;
}

.content-left .after-upload, .content-left .after-success-tracking {
  height: 100%;
  width: 100%;
  position: relative;
}

.upload-img {
  height: 100%;
  width: 100%;
  border-radius: 25px;
  object-fit: contain;
}

.card .del-icon {
  position: absolute;
  background-color: rgba(0, 0, 0, 0);
  border: none;
  right: 1vh;
  top: 9vh;
  font-size: 4vh;
}

.before-tracking .content-right .card {
  position: absolute;
  width: 100%;
  bottom: 0;
  height: 49vh;
  border-radius: 25px;
  background-color: rgba(255, 255, 255, .6);
}

.content-right .card >>> .el-card__header {
  border-bottom: 2px solid #9d9d9d;
  font-size: 2.5vh;
}

.after-tracking .content-right .card {
  width: 100%;
  bottom: 0;
  height: 60vh;
  border-radius: 25px;
  background-color: rgba(255, 255, 255, .6);
}

.card .step1_before_upload .loading-icon {
  font-size: 5vh;
  margin-top: 10vh;
}

.card .step1_before_upload p {
  margin-top: 6vh;
  font-size: 2.3vh;
}

.card .type-form >>> .el-select .el-select-group__title {
  font-size: 1.5vh;
}

.card .type-form >>> .el-select .el-select-group__title {
  font-size: 1vh;
}

.card .step1_after_upload {
  font-size: 2.3vh;
}

.card .step1_after_upload .img-info-item {
  text-align: left;
  margin: 3vh 2vw;
}

.card .step1_after_upload .img-info-step1_2 {
  margin: 4vh 0;
}

.img-button {
  width: 40%;
  font-size: 2vh;
  line-height: 3vh;
}

.card .type-form {
  margin: 4vh 3vw;
}

.card .type-form p {
  margin: 2.5vh 0 1.5vh 0;
  font-size: 2vh;
}

.card .img-tip-step2 {
  margin: 4vh 0;
  font-size: 2.3vh;
}

.card .step3, .card .after-success-tracking {
  font-size: 2.3vh;
}

.card .step3 .img-info-item, .card .after-success-tracking .img-info-item {
  text-align: left;
  margin: 2vh 3vw;
}

.card .img-info-step3 {
  margin: 3vh 0;
  font-size: 2.3vh;
}

.after-tracking .content-left .before-success-tracking {
  font-size: 8vh;
  line-height: 60vh;
}

/*.after-tracking .content-right .before-success-tracking {*/
/*  !*font-size: 2.4vh;*!*/
/*}*/

.after-tracking .content-right .tag {
  width: 10vw;
  height: 5vh;
  line-height: 5vh;
  font-size: 2.5vh;
}

.after-tracking .content-right .progress {
  margin: 4% 0 2% 0;
}

.after-tracking .content-right .cancel-btn {
  margin: 2vh auto;
  width: 40%;
  font-size: 2vh;
  line-height: 3vh;
}

.after-tracking .content-right .after-success-tracking .img-info-finish {
  margin: 7vh 1vh;
  width: 14vw;
  font-size: 2.3vh;
}
</style>
