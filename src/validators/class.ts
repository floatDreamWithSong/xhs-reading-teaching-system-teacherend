import z from "zod";

export const getClassListResponseSchema = z.object({
  total: z.number(),
  page: z.string(),
  pageSize: z.number(),
  list: z.array(z.object({
    id: z.number(),
    name: z.string(),
    grade: z.string(),
    studentCount: z.number(),
  })),
})

export const getClassListRequestSchema = z.object({
  grade: z.string(),
  searchWords: z.string(),
  page: z.number(),
  pageSize: z.number(),
})

export const createClassRequestSchema = z.object({
  school: z.string(),
  stage: z.string(),
  grade: z.string(),
  className: z.string(),
  studentCount: z.string(),
  enableMiniApp: z.boolean(),
  enableAssitant: z.boolean(),
})

export const createClassResponseSchema = z.object({})
