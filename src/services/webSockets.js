/* eslint-disable */

const wssUrl = process.env.VUE_APP_WEBSOCKET_URL

export const socket = new WebSocket(wssUrl)
