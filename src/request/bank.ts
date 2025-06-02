import { getDatabaseInfoResponseSchema } from "@/validators"
import { getDatabaseInfoRequestSchema } from "@/validators"
import { request } from "."
import type z from "zod"

// 查询题库信息
export const getDatabaseInfo = (params: z.infer<typeof getDatabaseInfoRequestSchema>) =>
  request({
    method: 'POST',
    url: '/reading/database/get-database-info',
    data: params,
    dataValidator: getDatabaseInfoRequestSchema,
    responseValidator: getDatabaseInfoResponseSchema,
  })
