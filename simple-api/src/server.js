import http from 'http';

const processId = process.pid;

const server = http.createServer((req, res) => {
    for (let index = 0; index < 1e7; index++);
    res.end(`handled by pid ${processId}`)
})

server.listen(4000).once('listening', () => {
    console.log(`Server started in process ${processId}`);
})

// Aguardar as conexões serem encerradas para encerrar o programa
process.on('SIGTERM', () => {
    console.log(`Server ending ${new Date().toISOString()}`)
    server.close(() => { process.exit() })
})