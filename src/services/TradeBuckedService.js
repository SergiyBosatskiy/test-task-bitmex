import { request } from './rest'
import { socket } from './webSockets'

export async function getTradeBucketed(symbol) {
  try {
    const params = {
      binSize: '1m',
      partial: false,
      count: 100,
      reverse: true,
      symbol
    }
    const { data } = await request.get('/trade/bucketed', { params })
    return data
  } catch (err) {
    console.log('getBucketedTrade error', err)
  }
}

let callbacks = []

export function updateTradeBucketed() {
  const listener = event => {
    const data = JSON.parse(event.data)
    if (data.action === 'insert') {
      callbacks.forEach(c => c(data.data))
    }
  }
  return {
    subscribe(symbol, cb) {
      const message = JSON.stringify({
        op: 'subscribe',
        args: 'tradeBin1m:' + symbol,
      })
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(message)
      } else {
        socket.addEventListener('open', () => {
          socket.send(message)
        }, { once: true })
      }
      callbacks.push(cb)
      socket.addEventListener('message', listener)
    },
    unsubscribe(symbol, cb) {
      const message = JSON.stringify({
        op: 'unsubscribe',
        args: 'tradeBin1m:' + symbol,
      })
      socket.send(message)
      socket.removeEventListener('message', listener)
      callbacks = callbacks.filter(c => c !== cb)
    }
  }
}
