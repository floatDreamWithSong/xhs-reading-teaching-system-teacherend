import type { z } from 'zod'
import { request } from '.'
import { getAllHomeworkRequestSchema, getAllHomeworkResponseSchema, getLatestHomeworkRequestSchema, getLatestHomeworkResponseSchema } from '../validators'
// 获取最新作业列表
export function getLatestHomework(params: z.infer<typeof getLatestHomeworkRequestSchema>) {
  return request({
    method: 'POST',
    url: '/reading/list-latest-homework',
    data: params,
    dataValidator: getLatestHomeworkRequestSchema,
    responseValidator: getLatestHomeworkResponseSchema,
  })
}

// 获取所有作业列表
export function getAllHomework(params: z.infer<typeof getAllHomeworkRequestSchema>) {
  return request({
    method: 'POST',
    url: '/reading/homework/get-homework',
    data: params,
    dataValidator: getAllHomeworkRequestSchema,
    responseValidator: getAllHomeworkResponseSchema,
  })
}
