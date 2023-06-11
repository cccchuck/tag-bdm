export type ClientResponse<T> = {
  success: boolean
  data?: ServerResponse<T> | T | null
  error?: unknown | null
}

export type ServerResponse<T> = {
  code: number
  message: string
  data: T
}

export interface Inscription {
  id: string
  meta: {
    name: string
    attributes: {
      trait_type: string
      value: string
    }[]
  }
}
