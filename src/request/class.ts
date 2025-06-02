import { createClassRequestSchema, createClassResponseSchema, getClassListRequestSchema, getClassListResponseSchema } from "@/validators"
import { request } from "."
import type z from "zod"

// 查询班级信息
export const getClassList = (params: z.infer<typeof getClassListRequestSchema>) =>
  request({
    method: 'POST',
    url: '/reading/class/get-class',
    data: params,
    dataValidator: getClassListRequestSchema,
    responseValidator: getClassListResponseSchema,
  })

// 创建班级
export const createClass = (params: z.infer<typeof createClassRequestSchema>) =>
  request({
    method: 'POST',
    url: '/reading/class/set-class',
    data: params,
    dataValidator: createClassRequestSchema,
    responseValidator: createClassResponseSchema,
  })
