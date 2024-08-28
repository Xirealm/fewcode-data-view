import request from '@/utils/request';

/**
 * 【请填写功能名称】api接口集合
 */
export function usePunchCardRecordApi() {
  return {
    // 分页获取【请填写功能名称】
    getPageList(data: object) {
      return request({
        url: '/system/punchCardRecord/getPageList',
        method: 'post',
        data: data
      })
    },
    // 查询【请填写功能名称】详细
    getPunchCardRecordById(id: number) {
      return request({
        url: '/system/punchCardRecord/' + id,
        method: 'get'
      })
    },
    // 新增【请填写功能名称】
    createPunchCardRecord(data: object) {
      return request({
        url: '/system/punchCardRecord/createPunchCardRecord',
        method: 'post',
        data: data
      })
    },
    // 修改【请填写功能名称】
    updatePunchCardRecord(data: object) {
      return request({
        url: '/system/punchCardRecord/updatePunchCardRecord',
        method: 'post',
        data: data
      })
    },
    // 删除【请填写功能名称】
    deletePunchCardRecord(id: number) {
      return request({
        url: '/system/punchCardRecord/' + id,
        method: 'delete'
      })
    },
  }
}