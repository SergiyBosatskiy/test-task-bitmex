import { request } from './rest'
import hmacSHA256 from 'crypto-js/hmac-sha256'
import { getExpires, apiKey, apiSecret } from './rest'

export async function getHistoryOrder() {
  try {
    const expires = getExpires()
    const signature = hmacSHA256('GET/api/v1/order' + expires, apiSecret)
    const headers = {
      'api-expires': expires,
      'api-key': apiKey,
      'api-signature': signature,
    }

    const requestOptions = {
      headers: headers,
      url: '/order',
      method: 'GET',
    }
    const { data } = await request(requestOptions)
    return data.reverse()
  } catch (err) {
    console.log('getHistoryOrder', err)
  }
}
