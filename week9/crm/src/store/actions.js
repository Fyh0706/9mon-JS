import { getDpList, getUserList, getJobList } from '@/api/index.js'
export function changeDpList({ commit }) {
  getDpList().then(data => {
    if (data.code == 0) {
      commit('changeDpList', data)
    }
  })
}
export function changeUserList({ commit }, option = {}) {
  //调用ajax请求
  getUserList(option).then(data => {
    if (data.code == 0) {
      commit('changUserList', data)
    }
  })
}
export function changeJobList({ commit }) {
  getJobList().then(data => {
    if (data.code == 0) {
      commit('changeJobList', data)

    }
  })
}
