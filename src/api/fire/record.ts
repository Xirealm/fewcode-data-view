import request from '@/utils/request';

/**
 * 【请填写功能名称】api接口集合
 */
export function useInspectionRecordApi() {
  return {
    // 分页获取【请填写功能名称】
    getPageList(data: object) {
      return request({
        url: '/system/inspectionRecord/getPageList',
        method: 'post',
        data: data
      })
    },
    // 查询【请填写功能名称】详细
    getInspectionRecordById(id: number) {
      return request({
        url: '/system/inspectionRecord/' + id,
        method: 'get'
      })
    },
    // 新增【请填写功能名称】
    createInspectionRecord(data: object) {
      return request({
        url: '/system/inspectionRecord/createInspectionRecord',
        method: 'post',
        data: data
      })
    },
    // 修改【请填写功能名称】
    updateInspectionRecord(data: object) {
      return request({
        url: '/system/inspectionRecord/updateInspectionRecord',
        method: 'post',
        data: data
      })
    },
    // 删除【请填写功能名称】
    deleteInspectionRecord(id: number) {
      return request({
        url: '/system/inspectionRecord/' + id,
        method: 'delete'
      })
    },
  }
}