import { Inscription } from '../types'
import { request } from '../utils/request'

const query = async (id: string) => {
  return await request.POST<Inscription>('/query', { id })
}

export default query
