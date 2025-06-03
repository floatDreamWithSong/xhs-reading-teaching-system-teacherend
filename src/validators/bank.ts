import { z } from 'zod'

export const getDatabaseInfoRequestSchema = z.object({
  type: z.string(),
  difficulty: z.number(),
  searchWords: z.string(),
  page: z.number(),
  pageSize: z.number(),
})

export const getDatabaseInfoResponseSchema = z.object({
  total: z.number(),
  page: z.number(),
  pageSize: z.number(),
  list: z.array(z.object({
    type: z.string(),
    name: z.string(),
    createTime: z.string(),
    difficulty: z.number(),
    count: z.number(),
  })),
})
