<template>
  <div>
    <el-menu
      :default-active="$route.path"
      class="el-menu-demo"
      mode="horizontal"
      router>
      <img class="logo" src="../assets/meiyalogo.png" alt=""/>
      <el-menu-item v-for="page in pages"
                    :key="page.index"
                    :index="page.index">
        {{ page.name }}
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'Menu',
  data () {
    return {
      pages: [
        {name: '返回', index: '/'},
        {name: '实时跟踪', index: '/RealtimeTracking'},
        {name: '视频跟踪', index: '/TrackByVideo'},
        {name: '图像检测', index: '/TrackByImg'}
      ]
    }
  }
}
</script>

<style scoped>
.logo {
  float: left;
  margin: 2% 3%;
  height: 9vh;
}

.el-menu {
  border-bottom: none !important;
  background-color: rgba(0,0,0,0);
  margin-right: 3%;
}

.el-menu--horizontal > .el-menu-item {
  margin: 2% 0;
  text-align: center;
  float: right;
  line-height: 9vh;
  display: inline-block;
  font-size: 1.1vw;
  color: #dddddd;
  border-bottom: none;
}

.el-menu--horizontal > .el-menu-item:hover {
  background-color: rgba(0,0,0,0);
  color: #323030;
}

.el-menu--horizontal > .el-menu-item.is-active {
  border-bottom: none;
  color: #323030;
}
</style>
