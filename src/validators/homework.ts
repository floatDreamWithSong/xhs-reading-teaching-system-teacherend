import { z } from "zod";

export const getLatestHomeworkRequestSchema = z.object({
  limit: z.number(),
})

export const getLatestHomeworkResponseSchema = z.object({
  total: z.number(),
  list: z.array(z.object({
    homeworkId: z.string(),
    title: z.string(),
    className: z.string(),
    grade: z.string(),
    createTime: z.string(),
    deadline: z.string(),
    status: z.boolean(),
    studentCount: z.number(),
    completedCount: z.number(),
    uncompletedCount: z.number(),
  }))
})

export const getAllHomeworkRequestSchema = z.object({
  classId: z.string(),
  status: z.string(),
  searchWords: z.string(),
  page: z.number(),
  pageSize: z.number(),
})

export const getAllHomeworkResponseSchema = z.object({
  total: z.number(),
  page: z.number(),
  pageSize: z.number(),
  list: z.array(z.object({
    title: z.string(),
    className: z.string(),
    createTime: z.string(),
    deadline: z.string(),
    studentCount: z.number(),
    completedCount: z.number(),
  }))
})