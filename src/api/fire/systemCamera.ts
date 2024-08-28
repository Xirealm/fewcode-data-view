import request from '@/utils/request';

/**
 * 边缘盒子系统摄像头api接口集合
 */
export function useBoxSystemCameraApi() {
  return {
    // 分页获取边缘盒子系统摄像头
    getPageList(data: object) {
      return request({
        url: '/system/boxSystemCamera/getPageList',
        method: 'post',
        data: data
      })
    },
    // 查询边缘盒子系统摄像头详细
    getBoxSystemCameraById(id: number) {
      return request({
        url: '/system/boxSystemCamera/' + id,
        method: 'get'
      })
    },
    // 新增边缘盒子系统摄像头
    createBoxSystemCamera(data: object) {
      return request({
        url: '/system/boxSystemCamera/createBoxSystemCamera',
        method: 'post',
        data: data
      })
    },
    // 修改边缘盒子系统摄像头
    updateBoxSystemCamera(data: object) {
      return request({
        url: '/system/boxSystemCamera/updateBoxSystemCamera',
        method: 'post',
        data: data
      })
    },
    // 删除边缘盒子系统摄像头
    deleteBoxSystemCamera(id: number) {
      return request({
        url: '/system/boxSystemCamera/' + id,
        method: 'delete'
      })
    },
  }
}