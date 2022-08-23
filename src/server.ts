import net from 'net'
import type { IRequest, IResponse, handler } from '../types/http-server'

class RequestData implements IRequest {
  headers: Record<string, string> = {}
  httpVersion!: string
  method!: string
  url!: string

  constructor(data: string) {
    const rawRequest = data.split('\r\n')
    const [method, url, httpVersion] = rawRequest[0].split(' ')

    this.method = method
    this.url = url
    this.httpVersion = httpVersion

    const rawHeaders = rawRequest.slice(1, -2)

    rawHeaders.forEach((value) => {
      const [header, ...headerValue] = value.split(':')
      this.headers[header] = headerValue.join('')
    })
  }
}

class ResponseData implements IResponse {
  statusCode!: number
  statusMessage!: string
  socket!: net.Socket
  body!: string
  version!: string
  headers: Record<string, string> = {}
  private statusMessageMap: Record<number, string> = {
    200: 'OK',
    400: 'Bad Request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not Found',
    500: 'Internal Server Error',
    503: 'Server Unavailable',
  }

  constructor(version: string, socket: net.Socket) {
    this.version = version
    this.socket = socket
  }

  end(data: string): this {
    const buffer = this.buildResponseBody(data)
    // console.log(buffer);
    this.socket.write(buffer)
    this.socket.end()
    return this
  }

  setHeader(name: string, value: string): this {
    this.headers[name] = value
    return this
  }

  writeHead(code: number, headers: Record<string, string>): this {
    this.statusCode = code
    this.statusMessage = this.statusMessageMap[code] ?? 'Bad Request'
    Object.entries(headers).forEach(([header, headerValue]) => {
      this.setHeader(header, headerValue)
    })
    return this
  }

  private buildResponseBody(data: string): string {
    const statusLine = [this.version, this.statusCode, this.statusMessage].join(' ')
    this.body = [
      statusLine,
      Object.entries(this.headers).map(([header, headerValue]) => {
        return `${header}: ${headerValue}`
      }).join('\r\n'),
      '',
      data,
    ].join('\r\n')
    return this.body
  }
}

export function createServer(handle?: handler) {
  function closeConnection(socket: net.Socket) {
    socket.on('end', () => {
      // eslint-disable-next-line no-console
      console.log('close connection')
    })
  }

  function handleError(socket: net.Socket) {
    socket.on('error', (err) => {
      // eslint-disable-next-line no-console
      console.log(err)
    })
  }

  function handleSocket(socket: net.Socket) {
    socket.on('data', (data) => {
      const res = data.toString()
      const requestData = new RequestData(res)
      const responseData = new ResponseData(requestData.httpVersion, socket)
      handle?.(requestData, responseData)
    })
  }

  return net.createServer((socket) => {
    closeConnection(socket)
    handleError(socket)
    handleSocket(socket)
  })
}
