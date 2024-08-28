import request from '@/utils/request';

/**
 * 盒子系统配置api接口集合
 */
export function useBoxSystemConfigurationApi() {
  return {
    // 分页获取盒子系统配置
    getPageList(data: object) {
      return request({
        url: '/system/boxSystemConfiguration/getPageList',
        method: 'post',
        data: data
      })
    },
    // 查询盒子系统配置详细
    getBoxSystemConfigurationById(id: number) {
      return request({
        url: '/system/boxSystemConfiguration/' + id,
        method: 'get'
      })
    },
    // 新增盒子系统配置
    createBoxSystemConfiguration(data: object) {
      return request({
        url: '/system/boxSystemConfiguration/createBoxSystemConfiguration',
        method: 'post',
        data: data
      })
    },
    // 修改盒子系统配置
    updateBoxSystemConfiguration(data: object) {
      return request({
        url: '/system/boxSystemConfiguration/updateBoxSystemConfiguration',
        method: 'post',
        data: data
      })
    },
    // 删除盒子系统配置
    deleteBoxSystemConfiguration(id: number) {
      return request({
        url: '/system/boxSystemConfiguration/' + id,
        method: 'delete'
      })
    },
  }
}