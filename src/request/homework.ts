import { request } from "."

// 获取最新作业列表
export const getLatestHomework = (params: {
  limit: number
}) =>
  request({
    method: 'POST',
    url: '/reading/list-latest-homework',
    data: params,
  })

// 获取所有作业列表
export const getAllHomework = (params: {
  classId: string
  status: string
  searchWords: string
  page: number
  pageSize: number
}) =>
  request({
    method: 'POST',
    url: '/reading/homework/get-homework',
    data: params,
  })
