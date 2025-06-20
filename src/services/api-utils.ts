import { AxiosResponse } from 'axios'
import { ApiErrorData } from './api-type'
import { API_ERROR_TYPE } from './api-error-constant'

export const extractResponseData = <T = any>(response: AxiosResponse<T>): T => {
  return response.data
}

export const isApiErrorData = (error: unknown): error is ApiErrorData => {
  return (
    typeof error === 'object' &&
    error !== null &&
    (error as ApiErrorData).type === API_ERROR_TYPE
  )
}

export const getErrorMessage = (error: ApiErrorData): string => {
  return error.serverMessage ?? error.message
}
