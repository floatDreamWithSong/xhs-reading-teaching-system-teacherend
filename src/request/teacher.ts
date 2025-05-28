import { request } from '.'

export const getTeacherInfo = (params: {}) =>
  request<{
    teacher_id: string
    name: string
    title: string
    avatar: string
  }>({
    method: 'POST',
    url: '/reading/get-teacher',
    data: params,
  })
