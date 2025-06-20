import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  CreateAxiosDefaults,
} from 'axios'
import { ApiErrorData, HttpClientConfig } from './api-type'
import {
  API_ERROR_TYPE,
  AXIOS_ERROR_CODE,
  DEFAULT_ERROR,
  HTTP_ERROR_CODE,
} from './api-error-constant'
import * as process from 'process'

const transformError = (error: unknown): ApiErrorData => {
  const errorData = error as AxiosError
  const response = errorData?.response as AxiosResponse<
    string | { error: string; path: string; status: number }
  >

  let errorType: { code?: string; message: string }
  if (response?.status && response.status in HTTP_ERROR_CODE) {
    errorType = HTTP_ERROR_CODE[response.status as keyof typeof HTTP_ERROR_CODE]
  } else if (errorData?.code && errorData.code in AXIOS_ERROR_CODE) {
    errorType =
      AXIOS_ERROR_CODE[errorData.code as keyof typeof AXIOS_ERROR_CODE]
  } else if (response?.data) {
    // 에러코드 커스텀하게 추가 시 code 변경
    errorType = { code: 'SERVER', message: DEFAULT_ERROR.message }
  } else {
    errorType = DEFAULT_ERROR
  }

  return {
    ...errorType,
    type: API_ERROR_TYPE,
    status: response?.status,
    serverMessage:
      response?.data && typeof response.data === 'string'
        ? response?.data
        : undefined,
  }
}

export function createHttpClient(config: CreateAxiosDefaults) {
  const client = axios.create(config)
  // client.interceptors.request.use(
  //   (config) => {
  //     const accessToken = localStorage.getItem('accessToken')
  //     if (accessToken) {
  //       config.headers.Authorization = `Bearer ${accessToken}`
  //     }
  //     return config
  //   },
  //   (error: AxiosError) => {
  //     console.error('API Request failed. Error:', error)
  //     return Promise.reject(transformError(error))
  //   }
  // )
  //
  // client.interceptors.response.use(
  //   (response) => {
  //     return response
  //   },
  //   async (error: AxiosError) => {
  //     console.error('API call failed. Error:', error)
  //
  //     const { config } = error
  //
  //     switch (error?.response?.status) {
  //       case 401:
  //         if (config?.url === '/login' || config?.url === '/refresh-token') {
  //           return Promise.reject(transformError(error))
  //         }
  //         if (config) {
  //           const accessToken = await getAccessTokenByRefreshToken()
  //           if (accessToken) {
  //             config.headers.Authorization = `Bearer ${accessToken}`
  //             return axios(config)
  //           } else {
  //             // todo 로그아웃
  //             return Promise.reject(transformError(error))
  //           }
  //         }
  //         // todo 로그아웃
  //         return new Promise(() => {})
  //       case 403:
  //         // todo 로그아웃
  //         return new Promise(() => {})
  //       default:
  //         return Promise.reject(transformError(error))
  //     }
  //   }
  // )

  return {
    async post<T, D = any>({
      path,
      data,
      config,
    }: {
      path: string
      data?: D
      config?: HttpClientConfig
    }): Promise<AxiosResponse<T>> {
      return await client.post<T>(path, data, config as AxiosRequestConfig)
    },
    async postForm<T, D = any>({
      path,
      data,
      config,
    }: {
      path: string
      data?: D
      config?: HttpClientConfig
    }): Promise<AxiosResponse<T>> {
      return await client.postForm<T>(path, data, config as AxiosRequestConfig)
    },
    async put<T, D = any>({
      path,
      data,
      config,
    }: {
      path: string
      data?: D
      config?: HttpClientConfig
    }): Promise<AxiosResponse<T>> {
      return await client.put<T>(path, data, config as AxiosRequestConfig)
    },
    async putForm<T, D = any>({
      path,
      data,
      config,
    }: {
      path: string
      data?: D
      config?: HttpClientConfig
    }): Promise<AxiosResponse<T>> {
      return await client.putForm<T>(path, data, config as AxiosRequestConfig)
    },
    async delete<T, D = any>({
      path,
      data,
      config,
    }: {
      path: string
      data?: D
      config?: HttpClientConfig
    }): Promise<AxiosResponse<T>> {
      const axiosConfig = {
        ...config,
        params: data,
      } as AxiosRequestConfig<D>
      return await client.delete<T>(path, axiosConfig)
    },
    async get<T, D = any>({
      path,
      data,
      config,
    }: {
      path: string
      data?: D
      config?: HttpClientConfig
    }): Promise<AxiosResponse<T>> {
      const axiosConfig = {
        ...config,
        params: data,
      } as AxiosRequestConfig<D>
      return await client.get<T>(path, axiosConfig)
    },
  }
}

export const httpClient = createHttpClient({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10 * 1000,
  withCredentials: true,
})

// export const getAccessTokenByRefreshToken = async (): Promise<string> => {
//   return await httpClient
//     .post<SignInResponse>({
//       path: '/refresh-token',
//     })
//     .then((response) => {
//       const { accessToken } = response.data
//       localStorage.setItem('accessToken', accessToken)
//       return accessToken
//     })
//     .catch((error) => {
//       // todo 로그아웃
//       return ''
//     })
// }
