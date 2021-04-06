import { request } from './rest'
import hmacSHA256 from 'crypto-js/hmac-sha256'
import { getExpires, apiKey, apiSecret } from './rest'

export async function createNewOrder(params) {
  try {
    const postBody = JSON.stringify(params)
    const expires = getExpires()
    const signature = hmacSHA256('POST/api/v1/order' + expires + postBody, apiSecret)
    const headers = {
      'api-expires': expires,
      'api-key': apiKey,
      'api-signature': signature,
    }

    const requestOptions = {
      headers,
      url: '/order',
      method: 'POST',
      data: params,
    }
    const { data } = await request(requestOptions)
    return data
  } catch (err) {
    console.log('createOrder', err)
    alert(err?.response?.data?.error.message)
  }
}
