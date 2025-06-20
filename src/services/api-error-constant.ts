export const API_ERROR_TYPE = 'API_ERROR' as const

export const HTTP_ERROR_CODE = {
  408: { code: '요청 시간 초과', message: '요청 시간을 초과했습니다.' },
} as const

export const AXIOS_ERROR_CODE = {
  ERR_NETWORK: { code: '통신 에러', message: '서버가 응답하지 않습니다.' },
  ECONNABORTED: {
    code: '요청 시간 초과',
    message: '요청 시간을 초과했습니다.',
  },
} as const

export const DEFAULT_ERROR = {
  code: 'UNKNOWN',
  message: '알 수 없는 오류가 발생했습니다.',
} as const
