const { createServer } = require('http')
const { get } = require('https')
const { readFile } = require('fs')

const server = createServer()

server.on('request', ({ url }, res) => {
    const path = url.slice(-1) === '/' 
    ? url.slice(1).concat('index.html') 
    : url.slice(1)

    console.log('Request received for:', path)

    readFile(path, (err, buff) => {
        if (err) {
            res.statusCode = 404
            return res.end('not found\n')
        }
        res.end(buff)
    })
})

server.listen(3000)
