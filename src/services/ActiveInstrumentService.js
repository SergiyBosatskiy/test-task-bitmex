import { request} from './rest'
import { socket } from './webSockets'

export async function getActiveInstrument() {
  try {
    const { data } = await request.get('/instrument/active')
    return data.map(({ symbol, lastPrice }) => ({ symbol, lastPrice }))
  } catch (err) {
    console.error('service error', err)
  }
}

let callbacks = []

export function updateActiveInstrument() {
  const listener = event => {
    const data = JSON.parse(event.data)
    if (data.action === 'update') {
      callbacks.forEach(c => c(data.data))
    }
  }
  return {
    subscribe(cb) {
      const message = JSON.stringify({
        op: 'subscribe',
        args: 'instrument',
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
    unsubscribe(cb) {
      socket.removeEventListener('message', listener)
      callbacks = callbacks.filter(c => c !== cb)
    }
  }
}
