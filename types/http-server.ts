import type {Server as tcpServer, Socket} from "net";

interface IRequest {
  headers: object
  httpVersion: string
  method: string
  url: string
}
interface IResponse {
  headers: object
  body: string
  version: string
  socket: Socket
  end: (data: string) => this
  setHeader: (name: string, value: any) => this
  writeHead: (code: number, header: Record<string, string>) => this
  statusCode: number
  statusMessage: string
}

type handler = (request: IRequest, response: IResponse) => void

export {
  IRequest, IResponse, handler,tcpServer
}
