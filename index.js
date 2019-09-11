const http = require('http')

const app = http((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'})
    res.end('Hello world')
})

const port = 3001 
app.listen(port)

console.log(`DIMU Portfoliosaitti is LIVE portissa ${port}`)
