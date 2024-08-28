import request from '@/utils/request';

/**
 * 企业信息api接口集合
 */
export function useEnterpriseInfoApi() {
  return {
    // 分页获取企业信息
    getPageList(data: object) {
      return request({
        url: '/system/enterpriseInfo/getPageList',
        method: 'post',
        data: data
      })
    },
    // 查询企业信息详细
    getEnterpriseInfoById(id: number) {
      return request({
        url: '/system/enterpriseInfo/' + id,
        method: 'get'
      })
    },
    // 新增企业信息
    createEnterpriseInfo(data: object) {
      return request({
        url: '/system/enterpriseInfo/createEnterpriseInfo',
        method: 'post',
        data: data
      })
    },
    // 修改企业信息
    updateEnterpriseInfo(data: object) {
      return request({
        url: '/system/enterpriseInfo/updateEnterpriseInfo',
        method: 'post',
        data: data
      })
    },
    // 删除企业信息
    deleteEnterpriseInfo(id: number) {
      return request({
        url: '/system/enterpriseInfo/' + id,
        method: 'delete'
      })
    },
  }
}