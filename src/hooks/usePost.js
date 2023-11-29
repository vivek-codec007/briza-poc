import { useMutation } from 'react-query'
import { determineInstance } from 'utils/helper'

const post = async ({
  url,
  payload,
  type,
}) => {
  const instance = determineInstance(type)
  console.log('instance --->', instance)
  let headers = {
    Authorization: 'ApiKey sk-a77c55ac0e8ed06c1bdb76884c8a3e5e9752048bd609f113b9eaeece522915af994da48fd9637f0d',
    'Content-Type': 'application/json',
    'Accept': '*/*',
    'Accept-Encoding': 'gzip, deflate, br',
    'Connection': 'keep-alive'
  }
  const { data } = await instance
    .post(url, payload, { headers })
    .then((res) => {
      return res
    })
    .catch((e) => {
      console.dir(e, { depth: null })
      throw e
    })
  return data
}

const usePost = () => useMutation(post)

export default usePost
