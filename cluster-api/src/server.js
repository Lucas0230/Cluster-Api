import express from 'express';

// Id do processo 
const processId = process.pid;

const server = express();

// Rota de teste
server.get('/users', (req, res) => {
    res.status(200).json({
        users: [{
            name: 'Lucas',
            email: 'lucas@gmail.com'
        }]
    })
})

server.listen(4000, () => {
    console.log(`Server started in process ${processId}`);
})

// Aguardar as conexões serem encerradas para encerrar o programa
process.on('SIGTERM', () => {
    console.log(`Server ending ${new Date().toISOString()}`)
    server.close(() => { process.exit() })
})

// Simulação de erro aleatório
setTimeout(() => {
    process.exit(1);
}, Math.random() * 1e4)