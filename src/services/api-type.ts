import { AxiosRequestConfig } from 'axios'
import { API_ERROR_TYPE } from './api-error-constant'

export type HttpClientConfig = Pick<AxiosRequestConfig, 'timeout' | 'headers'>

export interface PagingRequest<T> {
  filters?: T
  page?: number | null
  pageSize?: number
  sort?: string
}

export interface ApiErrorData {
  type: typeof API_ERROR_TYPE
  code?: string
  status?: number
  message: string
  serverMessage?: string
}

interface Sort {
  /** 정렬 처리 여부 */
  sorted: boolean
  /** 정렬 미처리 여부 */
  unsorted: boolean
  /** 정렬 정보 비어있는지 여부 */
  empty: boolean
}

export interface Page<T> {
  content?: T[]
  /** 총 목록 갯수 */
  totalElements: number
  /** 마지막 페이지 여부 */
  last: boolean
  /** 조회 페이지 */
  number: number
  /** 페이지 당 출력 갯수 */
  size: number
  /** 조회된 목록 갯수 */
  numberOfElements: number
  /** 첫번째 페이지 여부 */
  first: boolean
  /** 비어 있는지 여부 */
  empty: boolean
  /** 정렬 정보 */
  sort: Sort
}
