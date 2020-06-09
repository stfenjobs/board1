import axios from 'axios'

import { API_URL } from '../../../constants/api'

export default async (_, res) => {
  const { data } = await axios.get(`${API_URL}/boards`)

  res.end(JSON.stringify(data))
}