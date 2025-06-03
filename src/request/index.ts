import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import type { Ref } from 'vue'
import type z from 'zod'
import axios from 'axios'
import { ref } from 'vue'
import * as bankApis from './bank'
import * as classApis from './class'
import * as homeworkApis from './homework'
import * as teacherApis from './teacher'

// 业务请求封装
export const api = {
  // 教师相关接口
  ...teacherApis,
  // 班级管理接口
  ...classApis,
  // 作业管理接口
  ...homeworkApis,
  // 题库管理接口
  ...bankApis,
} as const

// 基础配置
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'
const DEFAULT_TIMEOUT = 10000
const getToken = () => localStorage.getItem('token')

// 通用响应数据格式
interface ApiResponse<T = any> {
  code: number | string
  msg: string
  data: T
}

// 请求状态
interface RequestState<T> {
  loading: Ref<boolean>
  data: Ref<T | null>
  error: Ref<string | null>
}

// 创建axios实例
function createAxiosInstance(): AxiosInstance {
  const instance = axios.create({
    baseURL: BASE_URL,
    timeout: DEFAULT_TIMEOUT,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  // 请求拦截器 - 自动token装配
  instance.interceptors.request.use(
    (config) => {
      // 从localStorage获取token
      const token = getToken()
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    },
  )

  // 响应拦截器 - 全局错误拦截和数据格式验证
  instance.interceptors.response.use(
    (response: AxiosResponse<ApiResponse>) => {
      const { data } = response

      // 验证响应数据格式
      if (typeof data !== 'object' || data === null) {
        throw new Error('响应数据格式错误')
      }

      // 检查业务状态码
      if (data.code !== 200 && data.code !== '200') {
        // 特殊处理认证失败
        if (data.code === 401 || data.code === '401') {
          localStorage.removeItem('token')
          window.location.href = '/login'
        }
        throw new Error(data.msg || '请求失败')
      }

      return response
    },
    (error) => {
      // 网络错误处理
      let errorMessage = '网络请求失败'

      if (error.response) {
        const status = error.response.status
        switch (status) {
          case 400:
            errorMessage = '请求参数错误'
            break
          case 401:
            errorMessage = '未授权，请重新登录'
            localStorage.removeItem('token')
            window.location.href = '/login'
            break
          case 403:
            errorMessage = '拒绝访问'
            break
          case 404:
            errorMessage = '请求地址不存在'
            break
          case 500:
            errorMessage = '服务器内部错误'
            break
          default:
            errorMessage = `请求失败 (${status})`
        }
      }
      else if (error.request) {
        errorMessage = '网络连接失败'
      }

      return Promise.reject(new Error(errorMessage))
    },
  )

  return instance
}

// 创建axios客户端
const httpClient = createAxiosInstance()

// 基础请求方法
export async function request<T extends z.ZodSchema>(config: AxiosRequestConfig & { responseValidator?: T, dataValidator?: z.ZodSchema, paramsValidator?: z.ZodSchema }): Promise<z.infer<T>> {
  try {
    if (config.dataValidator) {
      const result = config.dataValidator.safeParse(config.data)
      if (!result.success) {
        throw new Error(`请求${config.url}的body数据格式错误:${result.error.message}`)
      }
    }
    if (config.paramsValidator) {
      const result = config.paramsValidator.safeParse(config.params)
      if (!result.success) {
        throw new Error(`请求${config.url}的params数据格式错误:${result.error.message}`)
      }
    }
    const response = await httpClient.request<ApiResponse<z.infer<T>>>(config)
    if (!config.responseValidator) {
      return response.data.data
    }
    const result = config.responseValidator.safeParse(response.data.data)
    if (!result.success) {
      throw new Error(`请求${config.url}的响应数据格式错误:${result.error.message}`)
    }
    return result
  }
  catch (error) {
    throw error instanceof Error ? error : new Error('未知错误')
  }
}

// 响应Hook封装 - 方便请求状态管理
export function useRequest<T = any>(requestFn: () => Promise<T>, options: {
  immediate?: boolean
  onSuccess?: (data: T) => void
  onError?: (error: Error) => void
} = {}): RequestState<T> & {
  execute: () => Promise<void>
  refresh: () => Promise<void>
} {
  const loading = ref(false)
  const data = ref<T | null>(null) as Ref<T | null>
  const error = ref<string | null>(null)

  const execute = async () => {
    try {
      loading.value = true
      error.value = null

      const result = await requestFn()
      data.value = result

      options.onSuccess?.(result)
    }
    catch (err) {
      const errorMessage = err instanceof Error ? err.message : '请求失败'
      error.value = errorMessage
      options.onError?.(err instanceof Error ? err : new Error(errorMessage))
    }
    finally {
      loading.value = false
    }
  }

  // 首次立即执行
  if (options.immediate !== false) {
    execute()
  }

  return {
    loading,
    data,
    error,
    execute,
    refresh: execute,
  }
}

// 分页Hook封装
export function usePagination<T = any>(requestFn: (page: number, pageSize: number, ...args: any[]) => Promise<{
  total: number
  list: T[]
}>, options: {
  pageSize?: number
  immediate?: boolean
} = {}) {
  const loading = ref(false)
  const data = ref<T[]>([])
  const error = ref<string | null>(null)
  const page = ref(1)
  const pageSize = ref(options.pageSize || 10)
  const total = ref(0)

  const execute = async (...args: any[]) => {
    try {
      loading.value = true
      error.value = null

      const result = await requestFn(page.value, pageSize.value, ...args)
      data.value = result.list
      total.value = result.total
    }
    catch (err) {
      const errorMessage = err instanceof Error ? err.message : '请求失败'
      error.value = errorMessage
    }
    finally {
      loading.value = false
    }
  }

  const changePage = (newPage: number) => {
    page.value = newPage
    execute()
  }

  const changePageSize = (newPageSize: number) => {
    pageSize.value = newPageSize
    page.value = 1
    execute()
  }

  // 首次立即执行
  if (options.immediate !== false) {
    execute()
  }

  return {
    loading,
    data,
    error,
    page,
    pageSize,
    total,
    execute,
    changePage,
    changePageSize,
    refresh: () => execute(),
  }
}
