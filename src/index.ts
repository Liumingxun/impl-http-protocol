import {createServer} from './server'

const PORT = 2333

createServer((request, response) => {
  if (request.url.startsWith('/date')) {
      response.writeHead(200, {
        'Content-Type': 'application/json'
      })
      response.end(JSON.stringify({
        date: new Date().toLocaleString()
      }))
    } else {
      response.writeHead(404, {
        'Content-Type': 'text/html;charset=utf-8'
      })
      response.end(`
      <h2 style="text-align: center; ">Not Found</h2>
      `)
    }
  }
).listen(PORT, '0.0.0.0', () => {
  console.log(`running on ${PORT}`)
})
