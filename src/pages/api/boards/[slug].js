import axios from 'axios'

import { API_URL } from '../../../constants/api'

export default async (req, res) => {
  const { 
    query: { 
      slug 
    } 
  } = req
  const { data } = await axios.get(`${API_URL}/boards/${slug}`)

  res.end(JSON.stringify(data))
}