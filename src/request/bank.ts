import { request } from "."

// 查询题库信息
export const getDatabaseInfo = (params: {
  type: string
  difficulty: number
  searchWords: string
  page: number
  pageSize: number
}) =>
  request({
    method: 'POST',
    url: '/reading/database/get-database-info',
    data: params,
  })
