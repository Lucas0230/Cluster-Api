// Gerenciador

import os from 'os';
import cluster from 'cluster';

// Cria as cópias e redireciona
const runPrimaryProcess = () => {

    const processesCount = os.cpus().length * 2;
    console.log(`Primary ${process.pid} is running`)
    console.log(`Forkinng Server with ${processesCount} process`);
    // Fork = criar novas cópias da aplicação

    for (let index = 0; index < processesCount; index++) cluster.fork();


    cluster.on('exit', (worker, code, signal) => {
        // code 0 significa que o processo finalizou por conta do os;
        if (code != 0 && !worker.exitedAfterDisconnect) {
            console.log(`Worker ${worker.process.pid} died... scheduling another one!`);
            // cria outra aplicação
            cluster.fork();
        }
    })
}

// Executam os códigos
const runWorkerProcess = async () => {
    await import('./server.js');
}

cluster.isPrimary ? runPrimaryProcess() : runWorkerProcess();


