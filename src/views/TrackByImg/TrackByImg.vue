<template>
  <div class="container">
    <Menu></Menu>
    <div class="title">
      <span>图像检</span>测
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
              <div class="uploader-text">请将图像拖到此处或点击上传</div>
            </el-upload>
          </div>
          <div class="after-upload" v-else>
            <img :src="beforeTrackImgUrl" alt="" class="upload-img"/>
            <span class="actions">
              <!-- 放大 -->
              <span class="item">
               <i class="el-icon-zoom-in" @click="beforeImgDialogVisible = true"></i>
              </span>
              <!-- 删除 -->
              <span class="item">
                <i class="el-icon-delete" @click="del"></i>
              </span>
            </span>
          </div>
        </div>
        <div class="content-right">
          <el-steps :active="active" align-center class="steps">
            <el-step title="上传检测图片"></el-step>
            <el-step title="选择检测类型"></el-step>
            <el-step title="开始检测"></el-step>
          </el-steps>
          <el-card v-if="active === 1" shadow="always" class="card">
            <div slot="header" class="clearfix">
              <span><b>上传检测图片</b></span>
            </div>
            <div v-if="!isUpload" class="step1_before_upload">
              <div class="loading-icon">
                <i class="el-icon-loading"></i>
              </div>
              <p>未检测到图像上传，请先在 <b>左侧拖拽框</b> 中上传图像</p>
            </div>
            <div v-else class="step1_after_upload">
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
                请确认检测图像信息无误后，点击 <b>下一步</b> 继续操作
              </div>
              <el-button type="primary" round class="img-button" @click="active++">下一步</el-button>
            </div>
          </el-card>
          <el-card v-if="active === 2" shadow="always" class="card">
            <div slot="header" class="clearfix">
              <span>选择检测类型</span>
            </div>
            <el-form class="type-form">
              <el-form-item label="检测类型:">
                <el-select v-model="chosenType"
                           placeholder="请选择需要检测的类型"
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
                <p>* 请至少选择一种检测类型，最多选择三种检测类型</p>
              </el-form-item>
            </el-form>
            <div class="img-tip-step2">
              请选择检测类型后，点击 <b>下一步</b> 继续操作
            </div>
            <el-button type="primary" round class="img-button" @click="active--">上一步</el-button>
            <el-button type="primary" round class="img-button" @click="step2Next">下一步</el-button>
          </el-card>
          <el-card v-if="active === 3" shadow="always" class="card step3">
            <div slot="header" class="clearfix">
              <span>开始检测</span>
            </div>
            <div class="step3">
              <div class="img-info-item">
                {{ '文件名: ' + this.beforeTrackImg.name }}
              </div>
              <div class="img-info-item">
                {{ '类型: ' + this.beforeTrackImg.raw.type }}
              </div>
              <div class="img-info-item">
                {{ '状态: ' + this.beforeTrackImg.status }}
              </div>
              <div class="img-info-item">
                {{ '检测类型: ' + this.chosenType }}
              </div>
            </div>
            <div class="img-info-step3">
              请确认检测图像信息无误后，点击 <b>开始检测</b> 进行检测
            </div>
            <el-button type="primary" round class="img-button" @click="active--">上一步</el-button>
            <el-button type="primary" round class="img-button" @click="uploadImg">开始检测</el-button>
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
            <img :src="afterTrackImgUrl" alt="" class="upload-img"/>
            <span class="actions">
              <!-- 放大 -->
              <span class="item">
                <i class="el-icon-zoom-in" @click="afterImgDialogVisible = true"></i>
              </span>
          </span>
          </div>
        </div>
        <div class="content-right">
          <el-card shadow="always" class="card">
            <div slot="header" class="clearfix">
              <el-tag class="tag" v-if="trackStatue === 0" type="success">检测成功</el-tag>
              <el-tag class="tag" v-if="trackStatue === 1">检测中</el-tag>
              <el-tag class="tag" v-if="trackStatue === 2" type="danger">检测失败</el-tag>
            </div>
            <div class="before-success-tracking" v-if="!successTrack">
              <div class="tracking" v-if="trackStatue === 1">
                <div>
                  <el-progress class="progress" type="circle" :percentage="trackingPercentage"/>
                </div>
                <el-button type="primary" round class="cancel-btn" @click="cancelTrack">取消检测</el-button>
              </div>
              <div class="track-error" v-if="trackStatue === 2">
                <div>
                  <el-progress class="progress" type="circle" :percentage="trackingPercentage" status="exception"/>
                </div>
                <el-button type="primary" round class="cancel-btn" @click="tryAgain">重新检测</el-button>
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
                {{ '检测类型: ' + this.chosenType }}
              </div>
              <el-button type="primary" round class="img-info-finish" @click="retrain">重新检测</el-button>
              <el-button type="primary" round class="img-info-finish" @click="downloadImg">下载图像</el-button>
            </div>
          </el-card>
        </div>
      </div>
    </div>
    <!-- 图片显示对话框 -->
    <el-dialog :visible.sync="beforeImgDialogVisible" :modal-append-to-body="false" top="5vh" :show-close="false"
               class="dialog">
      <img :src="beforeTrackImgUrl" alt="" class="dialog-img"/>
    </el-dialog>
    <el-dialog :visible.sync="afterImgDialogVisible" :modal-append-to-body="false" top="5vh">
      <img :src="afterTrackImgUrl" alt="" class="dialog-img"/>
    </el-dialog>
    <!--    <el-carousel v-if="personList !== []" :interval="4000" type="card" height="200px">-->
    <!--      <el-carousel-item v-for="item in personList" :key="item.id">-->
    <!--        <el-image :src="item.img" width="'100%" alt=""></el-image>-->
    <!--      </el-carousel-item>-->
    <!--    </el-carousel>-->
  </div>
</template>

<script>
import Menu from '../../components/Menu'
import {trackByImg} from '../../api/api'
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
      afterTrackImg: '', // 检测结果图片File
      beforeTrackImgUrl: '', // 上传图片url
      afterTrackImgUrl: '', // 检测结果图片url
      isTracking: false, // 是否开始检测
      beforeImgDialogVisible: false,
      afterImgDialogVisible: false,
      successTrack: false, // false
      trackStatue: 1, // 检测状态（0：成功，1：检测中，2：失败）
      chosenType: [], // 检测类型
      trackTypeList: trackTypeList,
      trackFileSize: '',
      // personList: [], //轨迹追踪所需参数
      trackingPercentage: 0, // 检测进度
      stopProgress: false // 终止进度条
    }
  },
  beforeDestroy () {
    if (this.$store.state.cancelAxios.cancelAxios !== null) {
      this.$store.state.cancelAxios.cancelAxios()
      this.$store.dispatch('delReqUrl', true)
    }
  },
  methods: {
    // 图片缩略图
    imgPreview (file) {
      console.log(file)
      if (file.raw.type.split('/')[0] === 'image') {
        this.beforeTrackImg = file
        this.beforeTrackImgUrl = URL.createObjectURL(file.raw)
        this.isUpload = true
      } else {
        this.$message({
          type: 'warning',
          message: '请上传正确的图像格式'
        })
      }
    },
    // 删除图片
    del () {
      this.$confirm('此操作将删除该图像, 是否继续?', '提示', {
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
        this.$message.error('请先上传图片或检查图片是否上传成功')
        return
      }
      let formData = new FormData()
      // let fileType = this.beforeTrackImg.raw.type.split('/')[0]
      let suffix = this.beforeTrackImg.raw.name.split('.')
      formData.append('file', this.beforeTrackImg.raw)
      formData.append('trackType', this.chosenType)
      // formData.append('fileType', fileType)
      formData.append('suffix', suffix[suffix.length - 1])
      console.log('开始检测')
      this.refreshProgress(300)
      trackByImg(formData).then(res => {
        this.trackingPercentage = 100
        console.log(res)
        // this.list = res.data.list
        // for (let person in this.list) {
        //   console.log("key: " + person)
        //   this.list[person] = new Blob([this.list[person]], {type: 'image/jpg'})
        //   this.l = window.URL.createObjectURL(this.list[person])
        //   console.log(this.list[person])
        // }
        // console.log(this.l)
        this.afterTrackImgUrl = window.URL.createObjectURL(res.data)
        this.afterTrackImg = new File([res.data], 'result', {type: res.data.type})
        this.trackFileSize = this.convertFileSize(this.afterTrackImg.size)
        console.log(this.afterTrackImg)
        this.successTrack = true
        this.trackStatue = 0
        this.$message({
          message: '检测成功',
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
    // 重新检测
    retrain () {
      this.$confirm('重新检测将清空本次检测结果, 是否继续?', '提示', {
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
      this.active = 3
    },
    // 轨迹追踪
    // pursuitTracking () {
    //   pursuitTracking().then(res => {
    //     console.log(res)
    //     const persons = res.data
    //     for (let person in persons) {
    //       this.personList.push({
    //         id: person,
    //         img: window.URL.createObjectURL(new Blob([persons[person]], {type: 'image/jpg'}))
    //       })
    //     }
    //     console.log(this.personList)
    //   })
    // },
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
    // 判断检测类型是否为空
    step2Next () {
      if (this.chosenType.length === 0) {
        this.$message({
          message: '请至少选择一个检测对象',
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
    // 取消检测
    cancelTrack () {
      this.$confirm('确认取消检测?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.isTracking = false
        this.active = 3
        this.$store.state.cancelAxios.cancelAxios()
        this.$store.dispatch('delReqUrl', true)
      })
    }
  }
}
</script>

<style scoped>
@import "../../static/css/mediaTracking.css";

.container {
  background: url("../../assets/track_image_bg.jpg") no-repeat center;
}

.dialog-img {
  max-width: 80vw;
  max-height: 80vh;
  object-fit: contain;
  border-radius: 25px;
}

.actions {
  position: absolute;
  border-radius: 25px;
  width: 100%;
  height: 100%;
  line-height: 50vh;
  left: 0;
  top: 0;
  cursor: default;
  text-align: center;
  color: #fff;
  opacity: 0;
  font-size: 40px;
  background-color: rgba(0, 0, 0, .5);
  transition: opacity .3s;
}

.actions:hover {
  opacity: 1;
}

.actions:hover span {
  display: inline-block;
}

.actions span {
  display: none;
  margin: 0 10%;
  cursor: pointer;
  font-size: 6vh;
}
</style>
