import type z from 'zod'
import { request } from '.'
import { getTeacherInfoRequestSchema, getTeacherInfoResponseSchema } from '../validators'

export function getTeacherInfo(params: z.infer<typeof getTeacherInfoRequestSchema>) {
  return request({
    method: 'POST',
    url: '/reading/get-teacher',
    data: params,
    dataValidator: getTeacherInfoRequestSchema,
    responseValidator: getTeacherInfoResponseSchema,
  })
}
