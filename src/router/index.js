import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Tracking from '../views/Tracking'
import TrackByImg from '../views/TrackByImg/TrackByImg'
import TrackByVideo from '../views/TrackByVideo/TrackByVideo'
import RealtimeTracking from '../views/RealtimeTracking/RealtimeTracking'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Tracking',
    name: 'Tracking',
    component: Tracking
  },
  {
    path: '/TrackByImg',
    name: 'TrackByImg',
    component: TrackByImg
  },
  {
    path: '/TrackByVideo',
    name: 'TrackByVideo',
    component: TrackByVideo
  },
  {
    path: '/RealtimeTracking',
    name: 'RealtimeTracking',
    component: RealtimeTracking
  }
]

const router = new VueRouter({
  routes
})

export default router
