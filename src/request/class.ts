import { request } from "."

// 查询班级信息
export const getClassList = (params: {
  grade: string
  searchWords: string
  page: number
  pageSize: number
}) =>
  request<{
    total: number
    page: string
    pageSize: string
    list: Array<{
      className: string
      grade: string
      studentCount: number
    }>
  }>({
    method: 'POST',
    url: '/reading/class/get-class',
    data: params,
  })

// 创建班级
export const createClass = (params: {
  school: string
  stage: string
  grade: string
  className: string
  studentCount: string
  enableMiniApp: boolean
  enableAssitant: boolean
}) =>
  request({
    method: 'POST',
    url: '/reading/class/set-class',
    data: params,
  })
