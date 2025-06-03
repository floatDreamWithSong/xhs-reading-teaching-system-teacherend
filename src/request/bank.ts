import type z from 'zod'
import { getDatabaseInfoRequestSchema, getDatabaseInfoResponseSchema } from '@/validators'

import { request } from '.'

// 查询题库信息
export function getDatabaseInfo(params: z.infer<typeof getDatabaseInfoRequestSchema>) {
  return request({
    method: 'POST',
    url: '/reading/database/get-database-info',
    data: params,
    dataValidator: getDatabaseInfoRequestSchema,
    responseValidator: getDatabaseInfoResponseSchema,
  })
}
