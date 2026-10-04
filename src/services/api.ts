import type {
  ApiErrorResponse,
  ApiSuccessResponse,
} from '../types/api'

import { ApiError } from './ApiError'

const API_URL = import.meta.env.VITE_API_URL
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID

if (!API_URL) {
  throw new Error('VITE_API_URL no está configurada.')
}

if (!CLIENT_ID) {
  throw new Error('VITE_CLIENT_ID no está configurada.')
}

type RequestOptions = RequestInit & {
  token?: string
}

export async function apiRequest<T>(
  endpoint: string,
  options: RequestOptions = {},
): Promise<ApiSuccessResponse<T>> {
  const { token, headers, ...requestOptions } = options

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...requestOptions,
    headers: {
      'Content-Type': 'application/json',
      'X-Client-Id': CLIENT_ID,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
  })

  const body = await response.json() as
    | ApiSuccessResponse<T>
    | ApiErrorResponse

  if (!response.ok || body.success === false) {
    const errorBody = body as ApiErrorResponse

    throw new ApiError(
      response.status,
      errorBody.message ?? 'Ha ocurrido un error.',
      errorBody.errors ?? {},
    )
  }

  return body as ApiSuccessResponse<T>
}
