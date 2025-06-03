import type z from 'zod'
import { createClassRequestSchema, createClassResponseSchema, getClassListRequestSchema, getClassListResponseSchema } from '@/validators'
import { request } from '.'

// 查询班级信息
export function getClassList(params: z.infer<typeof getClassListRequestSchema>) {
  return request({
    method: 'POST',
    url: '/reading/class/get-class',
    data: params,
    dataValidator: getClassListRequestSchema,
    responseValidator: getClassListResponseSchema,
  })
}

// 创建班级
export function createClass(params: z.infer<typeof createClassRequestSchema>) {
  return request({
    method: 'POST',
    url: '/reading/class/set-class',
    data: params,
    dataValidator: createClassRequestSchema,
    responseValidator: createClassResponseSchema,
  })
}
