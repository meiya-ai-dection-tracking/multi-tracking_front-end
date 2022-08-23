import axios from 'axios'
import {SERVER_ADDRESS} from '../static/js/global'

export const trackByImg = (data) => {
  return axios({
    method: 'post',
    url: `${SERVER_ADDRESS}/trackByImg`,
    responseType: 'blob',
    data: data
  })
}

export const trackByVideo = (data) => {
  return axios({
    method: 'post',
    url: `${SERVER_ADDRESS}/trackByVideo`,
    responseType: 'blob',
    data: data
  })
}

export const cancelTrack = () => {
  return axios({
    method: 'get',
    url: `${SERVER_ADDRESS}/cancelTrack`
  })
}

export const realtimeTrackType = (data) => {
  return axios({
    method: 'post',
    url: `${SERVER_ADDRESS}/realtimeTrackType`,
    data: data
  })
}

// export const pursuitTracking = () => {
//   return axios({
//     method: 'get',
//     url: SERVER_ADDRESS + '/pursuitTracking'
//   })
// }
