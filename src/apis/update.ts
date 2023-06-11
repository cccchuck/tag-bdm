import { request } from '../utils/request'

const update = async (id: string, attribute: string, value: string) => {
  return await request.POST<null>('/update', { id, attribute, value })
}

export default update
