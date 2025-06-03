import { z } from 'zod'

export const getTeacherInfoRequestSchema = z.object({})

export const getTeacherInfoResponseSchema = z.object({
  teacher_id: z.string(),
  name: z.string(),
  title: z.string(),
  avatar: z.string(),
})
