import net from 'net'

const PORT = 2333

const tcpServer = net.createServer((socket) => {
  socket.write('HTTP/1.1 200 OK\r\n Content-Type: text/plain\r\n\r\nHello Http')
  socket.pipe(socket)
  socket.end()
})

tcpServer.listen(PORT, () => {
  console.log(`tcp server running at ${PORT}`)
})
