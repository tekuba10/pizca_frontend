import type { ApiErrorResponse } from '../types/api'

export class ApiError extends Error {
  readonly status: number
  readonly errors: ApiErrorResponse['errors']

  constructor(
    status: number,
    message: string,
    errors: ApiErrorResponse['errors'] = {},
  ) {
    super(message)

    this.name = 'ApiError'
    this.status = status
    this.errors = errors
  }

  get code(): string | undefined {
    const code = this.errors.code

    return typeof code === 'string' ? code : undefined
  }
}
