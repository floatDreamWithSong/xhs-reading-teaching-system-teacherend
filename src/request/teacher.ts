import { request } from '.'
import { getTeacherInfoRequestSchema, getTeacherInfoResponseSchema } from '../validators'
import type z from 'zod'

export const getTeacherInfo = (params: z.infer<typeof getTeacherInfoRequestSchema>) =>
  request({
    method: 'POST',
    url: '/reading/get-teacher',
    data: params,
    dataValidator: getTeacherInfoRequestSchema,
    responseValidator: getTeacherInfoResponseSchema,
  })
