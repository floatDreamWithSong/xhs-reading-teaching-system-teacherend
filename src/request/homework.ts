import type { z } from "zod"
import { request } from "."
import { getLatestHomeworkRequestSchema, getLatestHomeworkResponseSchema, getAllHomeworkRequestSchema, getAllHomeworkResponseSchema } from "../validators"
// 获取最新作业列表
export const getLatestHomework = (params: z.infer<typeof getLatestHomeworkRequestSchema>) =>
  request({
    method: 'POST',
    url: '/reading/list-latest-homework',
    data: params,
    dataValidator: getLatestHomeworkRequestSchema,
    responseValidator: getLatestHomeworkResponseSchema,
  })

// 获取所有作业列表
export const getAllHomework = (params: z.infer<typeof getAllHomeworkRequestSchema>) =>
  request({
    method: 'POST',
    url: '/reading/homework/get-homework',
    data: params,
    dataValidator: getAllHomeworkRequestSchema,
    responseValidator: getAllHomeworkResponseSchema
  })
